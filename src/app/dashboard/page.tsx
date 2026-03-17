"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { LogOut, Terminal, ShieldCheck, Loader2, Network, Cpu, Database, ShieldAlert } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push("/login")
      } else {
        setUser(session.user)
      }
      setLoading(false)
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/login")
      } else {
        setUser(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-cyber-black font-mono">
        <Loader2 className="w-12 h-12 animate-spin text-cyber-blue mb-6" />
        <p className="text-cyber-blue font-bold uppercase tracking-[0.3em] animate-pulse text-xs">
          {">"} Authenticating Encrypted Session...
        </p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-cyber-black font-mono relative overflow-x-hidden">
      {/* Background FX */}
      <div className="fixed inset-0 cyber-grid z-0 opacity-20"></div>

      {/* Nav */}
      <nav className="relative z-40 bg-cyber-dark/80 backdrop-blur-md border-b border-cyber-blue/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 border border-cyber-blue flex items-center justify-center bg-cyber-blue/10 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-blue animate-scanline"></div>
                   <span className="text-white font-black text-xs group-hover:text-cyber-blue transition-colors text-glow">TQ</span>
                </div>
                <span className="font-black text-lg text-white tracking-widest group-hover:text-cyber-blue transition-colors">ARENA_CONTROL</span>
              </Link>
            </div>
            
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 border border-cyber-accent/50 text-xs font-bold uppercase tracking-widest text-cyber-accent hover:bg-cyber-accent hover:text-white transition-colors"
              >
                Sever Uplink <LogOut className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-30 max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        
        {/* User Status Header */}
        <div className="cyber-panel mb-8 p-1">
          <div className="bg-gradient-to-r from-cyber-dark to-cyber-black p-8 relative overflow-hidden">
            {/* Background glowing orb */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-cyber-blue/10 rounded-full blur-[80px]"></div>

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-full border-2 border-green-500/50 flex items-center justify-center bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                 <ShieldCheck className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-widest text-white uppercase text-glow">Welcome, Contestant</h1>
                <p className="text-xs text-cyber-blue/70 uppercase tracking-[0.2em] font-bold mt-1">Uplink Secured • Status: <span className="text-green-400">Green</span></p>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/60 border border-cyber-blue/30 relative z-10">
               <span className="text-slate-500 text-xs uppercase tracking-widest">ID_HASH:</span>
               <span className="text-cyber-purple font-bold text-sm tracking-wider break-all">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Dashboard Modules */}
        <div className="flex items-center gap-2 mb-6">
           <Terminal className="w-5 h-5 text-cyber-blue" />
           <h2 className="text-sm font-bold text-cyber-blue uppercase tracking-[0.3em]">Active Sub-Routines</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Module 1 */}
          <div className="cyber-panel p-6 group hover:border-cyber-blue hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all cursor-crosshair">
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 border border-cyber-blue/50 flex items-center justify-center bg-cyber-blue/10 group-hover:bg-cyber-blue/20 transition-colors">
                <Network className="w-5 h-5 text-cyber-blue" />
              </div>
              <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 animate-pulse rounded-full"></span> Active
              </span>
            </div>
            <h3 className="text-slate-500 text-xs uppercase tracking-widest mb-1">Active Quizzes</h3>
            <p className="text-2xl font-black text-white mb-6 group-hover:text-cyber-blue transition-colors">02_LIVE</p>
            
            <div className="w-full h-[2px] bg-cyber-dark relative overflow-hidden">
               <div className="absolute top-0 left-0 h-full w-[80%] bg-cyber-blue"></div>
            </div>
            <div className="mt-4 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
               <span className="text-cyber-blue/50 hover:text-cyber-blue transition-colors">{">"} Access_Academics</span>
               <span className="text-cyber-blue">80% Loaded</span>
            </div>
          </div>

          {/* Module 2 */}
          <div className="cyber-panel p-6 group hover:border-cyber-purple hover:shadow-[0_0_20px_rgba(188,19,254,0.2)] transition-all cursor-crosshair">
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 border border-cyber-purple/50 flex items-center justify-center bg-cyber-purple/10 group-hover:bg-cyber-purple/20 transition-colors">
                <Cpu className="w-5 h-5 text-cyber-purple" />
              </div>
              <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest flex items-center gap-1">
                 Pending Event
              </span>
            </div>
            <h3 className="text-slate-500 text-xs uppercase tracking-widest mb-1">Next Round</h3>
            <p className="text-xl font-black text-white mb-6 group-hover:text-cyber-purple transition-colors tracking-widest mt-1">LVL_02</p>
            
            <div className="w-full h-[2px] bg-cyber-dark relative overflow-hidden">
               <div className="absolute top-0 left-0 h-full w-[35%] bg-cyber-purple"></div>
            </div>
            <div className="mt-4 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
               <span className="text-cyber-purple/50 hover:text-cyber-purple transition-colors">{">"} View_Schedule</span>
               <span className="text-cyber-purple">T-Minus 2 Mo</span>
            </div>
          </div>

          {/* Module 3 */}
          <div className="cyber-panel p-6 group hover:border-cyber-accent hover:shadow-[0_0_20px_rgba(255,0,60,0.2)] transition-all cursor-crosshair">
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 border border-cyber-accent/50 flex items-center justify-center bg-cyber-accent/10 group-hover:bg-cyber-accent/20 transition-colors">
                <Database className="w-5 h-5 text-cyber-accent" />
              </div>
              <span className="text-[10px] text-cyber-accent font-bold uppercase tracking-widest flex items-center gap-1">
                 <ShieldAlert className="w-3 h-3" /> Action Reqd
              </span>
            </div>
            <h3 className="text-slate-500 text-xs uppercase tracking-widest mb-1">Pending Answers</h3>
            <p className="text-2xl font-black text-white mb-6 group-hover:text-cyber-accent transition-colors">07_QST</p>
            
            <div className="w-full h-[2px] bg-cyber-dark relative overflow-hidden">
               <div className="absolute top-0 left-0 h-full w-[90%] bg-cyber-accent"></div>
            </div>
            <div className="mt-4 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
               <span className="text-cyber-accent/50 hover:text-cyber-accent transition-colors">{">"} Clear_Queue</span>
               <span className="text-cyber-accent">Capacity Warning</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
