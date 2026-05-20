"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await axios.post(`${API_URL}/api/auth/register`, formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.msg || "Error en el registro");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0a0f] to-[#0a0a0f] z-0"></div>
      
      <motion.div 
        className="z-10 bg-[#11111a] border border-[#bc13fe] p-8 rounded-xl shadow-[0_0_20px_rgba(188,19,254,0.3)] w-full max-w-md relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#bc13fe] to-[#00f3ff]"></div>
        
        <h2 className="text-3xl font-bold text-center text-white mb-6">Registro de Agente</h2>
        
        {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Nombre de Usuario (Alias)</label>
            <input 
              type="text" 
              required
              className="w-full bg-[#0a0a0f] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-[#00f3ff] transition-colors"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Correo Encriptado</label>
            <input 
              type="email" 
              required
              className="w-full bg-[#0a0a0f] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-[#00f3ff] transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Clave de Acceso</label>
            <input 
              type="password" 
              required
              className="w-full bg-[#0a0a0f] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-[#00f3ff] transition-colors"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#bc13fe] hover:bg-[#a010d8] text-white font-bold py-3 rounded mt-4 transition-colors shadow-[0_0_10px_rgba(188,19,254,0.5)]"
          >
            Crear Identidad
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          ¿Ya tienes acceso? <Link href="/auth/login" className="text-[#00f3ff] hover:underline">Iniciar Sesión</Link>
        </p>
      </motion.div>
    </div>
  );
}
