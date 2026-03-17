"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Users, Send, Trophy, Clock, Search, ChevronRight, Zap } from "lucide-react"

export function HostControls() {
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [broadcasting, setBroadcasting] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")

  useEffect(() => {
    fetchTeams()
  }, [])

  async function fetchTeams() {
    setLoading(true)
    const { data: teamsData, error: teamsError } = await supabase
      .from('teams')
      .select('*, team_members(*)')
      .order('created_at', { ascending: false })

    if (!teamsError) {
      setTeams(teamsData)
    }
    setLoading(false)
  }

  async function broadcastResults(team: any) {
    if (!confirm(`Broadcast final results to Team ${team.team_name}?`)) return

    setBroadcasting(true)
    setStatusMessage(`Broadcasting to ${team.team_name}...`)

    try {
      const emails = team.team_members.map((m: any) => m.email)
      
      // Call the Edge Function
      const { data, error } = await supabase.functions.invoke("send-results", {
        body: {
          emails,
          teamName: team.team_name,
          score: Math.floor(Math.random() * 25), // In real app, fetch from a scores table
          totalQuestions: 25
        }
      })

      if (error) throw error
      setStatusMessage(`SUCCESS: Broadcast complete for ${team.team_name}`)
      setTimeout(() => setStatusMessage(""), 3000)
    } catch (err) {
      console.error(err)
      setStatusMessage("ERROR: Broadcast failed")
    } finally {
      setBroadcasting(false)
    }
  }

  const filteredTeams = teams.filter(t => 
    t.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.branch.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Broadcast Status Bar */}
      {statusMessage && (
        <div className={`p-4 border-2 ${statusMessage.includes('SUCCESS') ? 'border-[#00f3ff] bg-[#00f3ff]/5' : 'border-[#ff4e4e] bg-[#ff4e4e]/5'} animate-fade-in`}>
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${statusMessage.includes('SUCCESS') ? 'text-[#00f3ff]' : 'text-[#ff4e4e]'}`}>
            &#62; {statusMessage}
          </p>
        </div>
      )}

      {/* Control Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar: Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="border border-white/10 bg-white/5 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
              <Users className="w-full h-full" />
            </div>
            <h3 className="text-[10px] font-black text-[#64748b] uppercase tracking-widest mb-4">Total Squads</h3>
            <p className="text-4xl font-black text-white">{teams.length}</p>
            <div className="mt-4 h-1 bg-white/10 w-full overflow-hidden">
              <div className="h-full bg-[#00f3ff] w-2/3" />
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 p-6">
            <h3 className="text-[10px] font-black text-[#64748b] uppercase tracking-widest mb-4">Quick Filters</h3>
            <div className="space-y-2">
              <input 
                type="text"
                placeholder="REGISTRY SEARCH..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/50 border border-white/10 p-3 text-xs font-mono uppercase focus:ring-1 focus:ring-[#00f3ff]/50 outline-none"
              />
            </div>
          </div>

          <div className="p-6 border border-[#bc13fe]/20 bg-[#bc13fe]/5">
            <div className="flex items-center gap-3 mb-4 text-[#bc13fe]">
              <Zap className="w-4 h-4" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Global Action</h3>
            </div>
            <button className="w-full py-3 bg-[#bc13fe] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#bc13fe]/80 transition-all opacity-50 cursor-not-allowed">
              Broadcast All Results
            </button>
            <p className="mt-3 text-[9px] text-[#64748b] leading-relaxed">
              * Global broadcast mode is currently locked until end of session.
            </p>
          </div>
        </div>

        {/* Main Content: Team List */}
        <div className="lg:col-span-3">
          <div className="border border-white/10 bg-black/40">
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-[#00f3ff]" />
                <h2 className="text-xs font-black uppercase tracking-widest">Team Registry Dashboard</h2>
              </div>
              <span className="text-[9px] font-mono text-white/20">SQL_STATUS: OPERATIONAL</span>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-20 text-center">
                  <div className="inline-block w-8 h-8 border-2 border-[#00f3ff] border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">Reading Database...</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-[10px] text-[#64748b] font-black uppercase tracking-widest">
                      <th className="px-6 py-4">Squad ID</th>
                      <th className="px-6 py-4">Designation</th>
                      <th className="px-6 py-4">Personnel</th>
                      <th className="px-6 py-4">Branch</th>
                      <th className="px-6 py-4 text-right">Synchronization</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredTeams.map((team) => (
                      <tr key={team.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-4 font-mono text-[10px] text-white/40">
                          {team.id.substring(0, 8)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-black uppercase tracking-tight text-white">{team.team_name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex -space-x-2">
                            {team.team_members.map((m: any, idx: number) => (
                              <div key={idx} className="w-6 h-6 rounded-full border border-black bg-white/10 flex items-center justify-center text-[8px] font-black text-[#00f3ff] uppercase" title={m.name}>
                                {m.name[0]}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-black text-[#bc13fe] uppercase tracking-widest border border-[#bc13fe]/20 px-2 py-1">
                            {team.branch}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => broadcastResults(team)}
                            disabled={broadcasting}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#00f3ff] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Send className="w-3 h-3" />
                            Broadcast
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
