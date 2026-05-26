"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
// import { Canvas } from "@react-three/fiber"; // Se descomentará al instalar three
// import { Stars } from "@react-three/drei";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Inicializar audio ambiental (placeholder hasta que el usuario decida)
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }
  }, []);

  const playAudio = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(e => console.log("Auto-play prevented", e));
    }
  };

  return (
    <main 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0f]"
      onClick={playAudio}
    >
      {/* Background Audio Placeholder */}
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      {/* Three.js Background Placeholder */}
      <div className="absolute inset-0 z-0 opacity-40">
        {/* Aquí irá el Canvas de Three.js. Por ahora un gradiente radial */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0f] to-[#0a0a0f]"></div>
      </div>

      <div className="z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] glitch-effect"
            data-text="CyberQuiz Academy"
          >
            CyberQuiz Academy
          </h1>
        </motion.div>

        <motion.p 
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Aprende ciberseguridad a través de simulaciones inmersivas, detecta amenazas reales y conviértete en un experto en defensa digital.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link href="/auth/register">
            <button className="px-8 py-4 bg-transparent border-2 border-[#00f3ff] text-[#00f3ff] font-bold rounded-lg uppercase tracking-wider hover:bg-[#00f3ff] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,243,255,0.5)]">
              Iniciar Misión
            </button>
          </Link>
          <Link href="/auth/login">
            <button className="px-8 py-4 bg-transparent border-2 border-gray-600 text-gray-300 font-bold rounded-lg uppercase tracking-wider hover:border-gray-400 hover:text-white transition-all duration-300">
              Acceder al Sistema
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{
        backgroundImage: "linear-gradient(#00f3ff 1px, transparent 1px), linear-gradient(90deg, #00f3ff 1px, transparent 1px)",
        backgroundSize: "50px 50px",
        transform: "perspective(500px) rotateX(60deg) translateY(100px)",
      }}></div>
    </main>
  );
}
