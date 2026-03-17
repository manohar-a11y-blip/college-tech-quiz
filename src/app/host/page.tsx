"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Shield, Lock, Terminal, Activity, Users, Zap, RefreshCw } from "lucide-react"
import { HostControls } from "@/components/host-controls"

export default function HostPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState("")

  // Simple passcode protection for the demo/contest
  // In a real app, this would use Supabase Auth with admin roles
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === "ARENA2026") {
      setIsAdmin(true)
      setError("")
    } else {
      setError("ACCESS_DENIED: INVALID_CREDENTIALS")
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#00f3ff] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        <div className="max-w-md w-full">
          <div className="mb-12 text-center">
            <div className="inline-block p-4 border-2 border-[#bc13fe] bg-[#bc13fe]/10 mb-6 relative">
              <Shield className="w-12 h-12 text-[#bc13fe]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#bc13fe]" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#bc13fe]" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-[0.2em] uppercase mb-2">Host Protocol</h1>
            <p className="text-[#64748b] text-xs tracking-widest uppercase font-bold">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#bc13fe]/5 blur-xl group-focus-within:bg-[#bc13fe]/10 transition-all" />
              <div className="relative border border-white/10 bg-black/60 p-6 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4 text-[#bc13fe]">
                  <Lock className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Encrypted Entry</span>
                </div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="ENTER ACCESS CODE"
                  className="w-full bg-white/5 border-none text-white font-mono text-center tracking-[0.5em] py-4 focus:ring-1 focus:ring-[#bc13fe]/50 placeholder:text-white/20 transition-all uppercase"
                />
                {error && (
                  <p className="mt-4 text-[#ff4e4e] text-[10px] font-black text-center tracking-widest animate-pulse">
                    {error}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black font-black uppercase tracking-[0.3em] py-4 hover:bg-[#bc13fe] hover:text-white transition-all active:scale-[0.98]"
            >
              Initialize Session
            </button>
          </form>
          
          <p className="mt-8 text-center text-white/20 text-[10px] font-mono tracking-widest">
            SYSTEM_VERSION: 1.0.4 // KERNEL: TECH_QUIZ_ARENA
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00f3ff] selection:text-black">
      {/* HUD Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-[#00f3ff] flex items-center justify-center font-black text-[#00f3ff] text-sm">TQ</div>
            <span className="font-black tracking-[0.3em] uppercase hidden md:inline">Arena Command</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-4 text-[#64748b]">
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-[#00f3ff]" />
              <span className="text-[10px] font-black uppercase tracking-widest">Systems: Nominal</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3 text-[#bc13fe]" />
              <span className="text-[10px] font-black uppercase tracking-widest">Network: Secure</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="p-2 border border-white/10 hover:border-[#00f3ff]/40 text-white/40 hover:text-[#00f3ff] transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsAdmin(false)}
            className="px-4 py-2 border border-[#ff4e4e]/20 text-[#ff4e4e] text-[10px] font-black uppercase tracking-widest hover:bg-[#ff4e4e]/10 transition-all"
          >
            Terminal Exit
          </button>
        </div>
      </header>

      <main className="p-6 md:p-12 max-w-7xl mx-auto">
        <HostControls />
      </main>
    </div>
  )
}
