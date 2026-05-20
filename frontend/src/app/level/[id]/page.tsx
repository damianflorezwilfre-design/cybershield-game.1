"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { LEVELS, LevelData } from "@/data/levels";

export default function DynamicLevel() {
  const params = useParams();
  const router = useRouter();
  const levelId = parseInt(params.id as string);
  const levelData = LEVELS.find(l => l.id === levelId);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  // States para Phishing
  const [currentEmail, setCurrentEmail] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  
  // States para Password
  const [password, setPassword] = useState("");
  
  // States para Quiz
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // States genéricos de feedback
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (!levelData) {
      router.push("/dashboard");
    }
  }, [levelData, router]);

  // Temporizador para Phishing
  useEffect(() => {
    if (levelData?.type !== 'phishing') return;
    if (feedback || gameOver) return;
    
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setFeedback("¡Tiempo agotado! Has tardado demasiado en analizar la amenaza.");
      setIsCorrect(false);
    }
  }, [timeLeft, feedback, gameOver, levelData]);

  if (!levelData) return null;

  const saveProgress = async (finalScore: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      await axios.post(`${API_URL}/api/game/progress`, 
        { levelId, score: finalScore, completed: true, timeSpent: 60 },
        { headers: { "x-auth-token": token } }
      );
    } catch (err) {
      console.error("Error saving progress", err);
    }
  };

  const handleGameOver = (finalScore: number) => {
    setScore(finalScore);
    setGameOver(true);
    saveProgress(finalScore);
  };

  // --- Lógica Phishing ---
  const handlePhishingChoice = (markedAsPhishing: boolean) => {
    const email = levelData.content.emails[currentEmail];
    if (markedAsPhishing === email.isPhishing) {
      setIsCorrect(true);
      setFeedback(`¡Correcto! ${email.explanation}`);
    } else {
      setIsCorrect(false);
      setFeedback(`¡Error! ${email.explanation}`);
    }
  };

  const nextPhishingEmail = () => {
    if (currentEmail < levelData.content.emails.length - 1) {
      setCurrentEmail(currentEmail + 1);
      setFeedback(null);
      setTimeLeft(30);
    } else {
      handleGameOver(levelData.xpReward);
    }
  };

  // --- Lógica Password ---
  const analyzePassword = () => {
    let pScore = 0;
    let comments = [];

    if (password.length >= 8) pScore += 25;
    else comments.push("Muy corta.");
    if (/[A-Z]/.test(password)) pScore += 25;
    else comments.push("Falta mayúscula.");
    if (/[0-9]/.test(password)) pScore += 25;
    else comments.push("Falta número.");
    if (/[^A-Za-z0-9]/.test(password)) pScore += 25;
    else comments.push("Falta símbolo especial.");

    if (pScore === 100) {
      setFeedback("¡Excelente! Has creado una contraseña inquebrantable.");
      setIsCorrect(true);
      setTimeout(() => handleGameOver(levelData.xpReward), 2000);
    } else {
      setFeedback(`Contraseña vulnerable (${pScore}% segura). Errores: ${comments.join(" ")}`);
      setIsCorrect(false);
    }
  };

  // --- Lógica Quiz ---
  const handleQuizChoice = (index: number) => {
    setSelectedOption(index);
    if (index === levelData.content.correctAnswer) {
      setIsCorrect(true);
      setFeedback(`¡Correcto! ${levelData.content.explanation}`);
    } else {
      setIsCorrect(false);
      setFeedback(`¡Incorrecto! ${levelData.content.explanation}`);
    }
  };

  const nextQuiz = () => {
    handleGameOver(isCorrect ? levelData.xpReward : Math.floor(levelData.xpReward / 2));
  };

  // --- Renders ---
  if (gameOver) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-6">
        <motion.div 
          className="bg-[#11111a] border border-[#00f3ff] p-8 rounded-xl shadow-[0_0_20px_rgba(0,243,255,0.3)] text-center max-w-lg w-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h1 className="text-4xl font-bold text-[#00f3ff] mb-4">Misión Completada</h1>
          <p className="text-xl mb-6">Puntuación Obtenida: <span className="text-[#bc13fe] font-bold">{score} XP</span></p>
          
          <Link href="/dashboard">
            <button className="w-full bg-[#00f3ff] hover:bg-[#00c2cc] text-black font-bold py-3 rounded transition-colors">
              Volver al Centro de Mando
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 relative">
      <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <span className="text-gray-500 hover:text-white cursor-pointer">&larr; Abortar Misión</span>
          </Link>
          <h1 className="text-xl font-bold text-[#bc13fe]">Nivel {levelId}: {levelData.title}</h1>
        </div>
        {levelData.type === 'phishing' && (
          <div className="text-right">
            <p className="text-sm text-gray-500">Tiempo</p>
            <p className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-[#00f3ff]'}`}>
              00:{timeLeft.toString().padStart(2, '0')}
            </p>
          </div>
        )}
      </header>

      <div className="max-w-4xl mx-auto mt-10">
        <p className="text-gray-400 mb-8 text-center text-lg">{levelData.description}</p>
        
        {/* Render Phishing */}
        {levelData.type === 'phishing' && (
          <div className="relative">
            <AnimatePresence mode="wait">
              {!feedback ? (
                <motion.div 
                  key={`email-${levelData.content.emails[currentEmail].id}`}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  className="bg-white text-black p-0 rounded-lg shadow-xl overflow-hidden"
                >
                  <div className="bg-gray-200 px-4 py-2 border-b flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-6">
                    <div className="border-b pb-4 mb-4">
                      <p className="text-sm text-gray-500">De: <span className="font-bold text-black">{levelData.content.emails[currentEmail].sender}</span></p>
                      <p className="text-sm text-gray-500 mt-1">Asunto: <span className="font-bold text-black">{levelData.content.emails[currentEmail].subject}</span></p>
                    </div>
                    <div className="min-h-[150px]">
                      <p className="whitespace-pre-wrap">{levelData.content.emails[currentEmail].content}</p>
                      <div className="mt-8 border border-blue-500 inline-block px-4 py-2 text-blue-600 rounded bg-blue-50 cursor-not-allowed group relative">
                        Click Aquí
                        <div className="absolute top-full left-0 mt-2 bg-gray-800 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 transition-opacity">
                          {levelData.content.emails[currentEmail].link}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="feedback"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`p-8 rounded-lg border-2 ${isCorrect ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'}`}
                >
                  <h2 className={`text-3xl font-bold mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? '¡Análisis Correcto!' : '¡Sistema Comprometido!'}
                  </h2>
                  <p className="text-lg text-gray-300 mb-8">{feedback}</p>
                  <button onClick={nextPhishingEmail} className="px-6 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition">
                    Siguiente
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {!feedback && (
              <div className="mt-10 flex justify-center gap-6">
                <button onClick={() => handlePhishingChoice(true)} className="px-8 py-4 bg-red-900/50 hover:bg-red-900 text-red-400 border border-red-500 rounded-lg font-bold uppercase transition-all">Reportar Phishing</button>
                <button onClick={() => handlePhishingChoice(false)} className="px-8 py-4 bg-green-900/50 hover:bg-green-900 text-green-400 border border-green-500 rounded-lg font-bold uppercase transition-all">Es Seguro</button>
              </div>
            )}
          </div>
        )}

        {/* Render Password */}
        {levelData.type === 'password' && (
          <motion.div className="bg-[#11111a] border border-gray-700 p-8 rounded-lg shadow-2xl" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <p className="text-gray-400 mb-6">{levelData.content.context}</p>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Escribe una contraseña segura..." className="w-full bg-[#0a0a0f] border border-gray-700 rounded p-4 text-xl text-center focus:border-[#bc13fe] focus:outline-none mb-6" />
            <button onClick={analyzePassword} className="w-full bg-[#bc13fe] hover:bg-[#a110db] text-white font-bold py-4 rounded transition-colors">Evaluar Seguridad</button>
            {feedback && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-6 p-4 rounded border ${isCorrect ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-red-900/20 border-red-500 text-red-400'}`}>
                {feedback}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Render Quiz */}
        {levelData.type === 'quiz' && (
          <motion.div className="bg-[#11111a] border border-gray-700 p-8 rounded-lg shadow-2xl" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-8 text-white">{levelData.content.question}</h2>
            {!feedback ? (
              <div className="space-y-4">
                {levelData.content.options.map((opt: string, idx: number) => (
                  <button key={idx} onClick={() => handleQuizChoice(idx)} className="w-full text-left p-4 rounded border border-gray-700 hover:border-[#00f3ff] hover:bg-[#00f3ff]/10 transition-all">
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded border ${isCorrect ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-red-900/20 border-red-500 text-red-400'}`}>
                <h3 className="text-xl font-bold mb-2">{isCorrect ? '¡Decisión Correcta!' : '¡Mala Decisión!'}</h3>
                <p className="mb-6 text-white">{feedback}</p>
                <button onClick={nextQuiz} className="px-6 py-3 bg-[#00f3ff] text-black font-bold rounded hover:bg-[#00c2cc] transition">
                  Finalizar Evaluación
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
}
