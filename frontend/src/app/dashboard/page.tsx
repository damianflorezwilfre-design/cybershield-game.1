"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import { LEVELS } from "@/data/levels";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<'Principiante' | 'Medio'>('Principiante');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    
    // Cargar del localStorage primero para que no haya salto visual
    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(localUser);

    // Luego obtener los datos reales del backend
    const fetchStats = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await axios.get(`${API_URL}/api/game/stats`, {
          headers: { "x-auth-token": token }
        });
        const updatedUser = { 
            ...localUser, 
            xp: res.data.user.xp, 
            level: res.data.user.currentLevel 
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (err) {
        console.error("Error cargando stats", err);
      }
    };
    
    fetchStats();
  }, [router]);

  if (!user) return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center"><p className="text-[#00f3ff] glitch-effect" data-text="Cargando Sistema...">Cargando Sistema...</p></div>;

  const maxLevel = user.level || 1;

  // Filtrar niveles por dificultad
  const filteredLevels = LEVELS.filter(l => l.difficulty === difficultyFilter);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10" style={{
        backgroundImage: "linear-gradient(#bc13fe 1px, transparent 1px), linear-gradient(90deg, #bc13fe 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-10 border-b border-gray-800 pb-4 bg-[#0a0a0f] sticky top-0 z-20 pt-4">
          <div className="flex items-center gap-4">
            <img src="/logo-alcaldia.png" alt="Logo Alcaldía" className="h-12 w-auto object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
            <h1 className="text-3xl font-bold text-[#00f3ff] hidden sm:block">CyberShield Terminal</h1>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-right">
              <p className="font-bold">{user.username}</p>
              <p className="text-sm text-gray-400">Nivel {maxLevel} | {user.xp || 0} XP</p>
            </div>
            <button 
              onClick={() => { localStorage.clear(); router.push('/'); }}
              className="px-4 py-2 bg-red-900/50 text-red-400 border border-red-500 rounded hover:bg-red-900 transition"
            >
              Desconectar
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Status Panel */}
          <motion.div 
            className="bg-[#11111a] border border-gray-700 p-6 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] md:sticky md:top-32 self-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl text-gray-400 mb-4 uppercase tracking-widest border-b border-gray-800 pb-2">Estado del Agente</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Rango Actual</p>
                <p className="text-2xl font-bold text-[#bc13fe]">Especialista (Lvl {maxLevel})</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Progreso XP</p>
                <div className="w-full bg-gray-800 rounded-full h-4 mt-2">
                  <div className="bg-[#00f3ff] h-4 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, ((user.xp || 0) % 500) / 5)}%` }}></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Missions Panel */}
          <motion.div 
            className="md:col-span-2 bg-[#11111a] border border-[#00f3ff]/50 p-6 rounded-lg shadow-[0_0_15px_rgba(0,243,255,0.1)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-end mb-4 border-b border-gray-800 pb-2">
              <h2 className="text-xl text-[#00f3ff] uppercase tracking-widest">Expediente de Misiones</h2>
              <span className="text-gray-500 text-sm">{maxLevel} completadas</span>
            </div>

            {/* Pestañas de Dificultad */}
            <div className="flex gap-4 mb-6">
              <button 
                onClick={() => setDifficultyFilter('Principiante')}
                className={`px-6 py-2 rounded-lg font-bold transition-colors ${difficultyFilter === 'Principiante' ? 'bg-[#00f3ff] text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >
                Principiante (1-12)
              </button>
              <button 
                onClick={() => setDifficultyFilter('Medio')}
                className={`px-6 py-2 rounded-lg font-bold transition-colors ${difficultyFilter === 'Medio' ? 'bg-[#bc13fe] text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >
                Medio (13-25)
              </button>
            </div>
            
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {filteredLevels.map((levelData) => {
                const lvl = levelData.id;
                const isUnlocked = maxLevel >= lvl;
                
                const title = levelData ? levelData.title : "Operación Clasificada";
                const desc = levelData ? levelData.description : "Contenido en desarrollo por la Agencia.";
                
                return (
                  <div key={lvl} className={`bg-[#0a0a0f] border p-4 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all gap-4 ${isUnlocked ? 'border-gray-700 hover:border-[#bc13fe] group' : 'border-gray-800 opacity-50 cursor-not-allowed'}`}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${isUnlocked ? 'bg-[#bc13fe]/20 text-[#bc13fe]' : 'bg-gray-800 text-gray-500'}`}>NIVEL {lvl}</span>
                      </div>
                      <h3 className={`text-lg font-bold ${isUnlocked ? 'text-white group-hover:text-[#bc13fe]' : 'text-gray-500'}`}>{title}</h3>
                      <p className={`text-sm ${isUnlocked ? 'text-gray-400' : 'text-gray-600'}`}>{desc}</p>
                    </div>
                    {isUnlocked && levelData ? (
                      <Link href={`/level/${lvl}`}>
                        <button className="px-6 py-2 w-full sm:w-auto bg-[#bc13fe]/10 text-[#bc13fe] border border-[#bc13fe] rounded hover:bg-[#bc13fe] hover:text-white transition-all whitespace-nowrap">
                          Iniciar Misión
                        </button>
                      </Link>
                    ) : (
                      <button disabled className="px-6 py-2 w-full sm:w-auto bg-gray-900 text-gray-500 border border-gray-700 rounded whitespace-nowrap">
                        Bloqueado
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
