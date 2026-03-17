"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { sendParticipationEmails } from "@/lib/send-confirmation"
import {
  Fingerprint, Terminal, Loader2, ArrowRight, ArrowLeft,
  ScanLine, ShieldAlert, Users, BookOpen, UserPlus, CheckCircle2, Mail
} from "lucide-react"
import Link from "next/link"

const BRANCHES = [
  "Computer Science & Engineering",
  "Artificial Intelligence & ML",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Other",
]

interface TeamMember {
  name: string
  email: string
}

export default function LoginPage() {
  const router = useRouter()

  // Multi-step state
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Step 1: Team Info
  const [teamName, setTeamName] = useState("")
  const [teamSize, setTeamSize] = useState(2)
  const [branch, setBranch] = useState("")

  // Step 2: Member details
  const [members, setMembers] = useState<TeamMember[]>([
    { name: "", email: "" },
    { name: "", email: "" },
  ])

  // Step 3: OTP
  const [otp, setOtp] = useState("")

  // Update members array when team size changes
  const handleTeamSizeChange = (size: number) => {
    setTeamSize(size)
    const newMembers = [...members]
    while (newMembers.length < size) {
      newMembers.push({ name: "", email: "" })
    }
    while (newMembers.length > size) {
      newMembers.pop()
    }
    setMembers(newMembers)
  }

  const updateMember = (index: number, field: "name" | "email", value: string) => {
    const updated = [...members]
    updated[index][field] = value
    setMembers(updated)
  }

  // Validate Step 1
  const isStep1Valid = teamName.trim() !== "" && branch !== ""

  // Validate Step 2
  const isStep2Valid = members.every(m => m.name.trim() !== "" && m.email.trim() !== "" && m.email.includes("@"))

  // Step 1 → Step 2
  const goToStep2 = () => {
    if (isStep1Valid) {
      setError("")
      setStep(2)
    }
  }

  // Step 2 → Step 3 (Send OTP to team lead)
  const handleSendOtp = async () => {
    setLoading(true)
    setError("")
    try {
      const leadEmail = members[0].email
      const { error } = await supabase.auth.signInWithOtp({
        email: leadEmail,
        options: { shouldCreateUser: true },
      })
      if (error) throw error
      setStep(3)
    } catch (err: any) {
      setError(err.message || "UPLINK_FAILED: Could not send OTP.")
    } finally {
      setLoading(false)
    }
  }

  // Step 3: Verify OTP → Save team → Redirect
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const leadEmail = members[0].email
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: leadEmail,
        token: otp,
        type: "email",
      })
      if (verifyError) throw verifyError

      // Save team to database
      const { data: teamData, error: teamError } = await supabase
        .from("teams")
        .insert({ team_name: teamName, team_size: teamSize, branch })
        .select()
        .single()

      if (teamError) throw teamError

      // Save members
      const memberRows = members.map(m => ({
        team_id: teamData.id,
        name: m.name,
        email: m.email,
      }))
      const { error: membersError } = await supabase
        .from("team_members")
        .insert(memberRows)

      if (membersError) throw membersError

      // Send participation confirmation emails to all members
      await sendParticipationEmails(teamName, branch, members)

      if (data.session) {
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "DECRYPTION_FAILED: Verification error.")
    } finally {
      setLoading(false)
    }
  }

  // Step indicator
  const steps = [
    { num: 1, label: "Team Info" },
    { num: 2, label: "Members" },
    { num: 3, label: "Verify" },
  ]

  return (
    <div className="min-h-screen bg-cyber-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-mono relative overflow-hidden">
      <div className="fixed inset-0 cyber-grid z-0 opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-blue/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10 flex flex-col items-center">
        <Link href="/" className="mb-6 flex flex-col items-center group">
          <div className="w-14 h-14 border-2 border-cyber-blue flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.4)] relative group-hover:scale-110 transition-transform">
            <div className="absolute inset-1 border border-cyber-blue/30 flex items-center justify-center bg-cyber-blue/10">
              <span className="text-white font-black text-xl group-hover:text-cyber-blue transition-colors text-glow">TQ</span>
            </div>
          </div>
        </Link>
        <h2 className="text-center text-2xl font-black text-white tracking-widest uppercase text-glow mb-2">
          Arena Registration
        </h2>

        {/* Step Progress Bar */}
        <div className="flex items-center gap-2 mt-4 mb-2">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <div className={`w-8 h-8 flex items-center justify-center border text-xs font-black transition-all ${
                step >= s.num
                  ? "border-cyber-blue bg-cyber-blue/20 text-cyber-blue shadow-[0_0_10px_rgba(0,243,255,0.3)]"
                  : "border-slate-700 text-slate-600"
              }`}>
                {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 h-[2px] transition-colors ${step > s.num ? "bg-cyber-blue" : "bg-slate-700"}`}></div>
              )}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-cyber-blue/60 uppercase tracking-[0.3em] font-bold">
          {steps.find(s => s.num === step)?.label}
        </p>
      </div>

      {/* Form Panel */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        <div className="cyber-panel p-8 sm:px-10">
          <div className="flex items-center gap-2 border-b border-cyber-blue/20 pb-4 mb-6 text-xs text-slate-500 uppercase tracking-widest">
            <Terminal className="w-4 h-4 text-cyber-blue" />
            <span className="animate-pulse">_sys/team_register.exe</span>
          </div>

          {error && (
            <div className="mb-6 bg-cyber-accent/10 border-l-4 border-cyber-accent p-4">
              <p className="text-xs text-cyber-accent font-bold uppercase tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 bg-cyber-accent animate-ping rounded-full inline-block"></span>
                {error}
              </p>
            </div>
          )}

          {/* ========= STEP 1: Team Info ========= */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-cyber-blue uppercase tracking-widest mb-2">
                  <Users className="w-3 h-3 inline mr-1" /> Team Name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  className="block w-full bg-black/50 text-white text-sm border border-cyber-blue/30 rounded-none h-12 px-4 focus:ring-0 focus:border-cyber-blue focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all placeholder:text-slate-600"
                  placeholder="e.g. Cyber Phantoms"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-cyber-blue uppercase tracking-widest mb-2">
                  <UserPlus className="w-3 h-3 inline mr-1" /> Team Size
                </label>
                <div className="flex gap-2">
                  {[2, 3, 4, 5].map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleTeamSizeChange(size)}
                      className={`flex-1 h-12 border text-sm font-black uppercase transition-all ${
                        teamSize === size
                          ? "border-cyber-blue bg-cyber-blue/20 text-cyber-blue shadow-[0_0_10px_rgba(0,243,255,0.3)]"
                          : "border-slate-700 text-slate-500 hover:border-slate-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cyber-blue uppercase tracking-widest mb-2">
                  <BookOpen className="w-3 h-3 inline mr-1" /> Branch / Department
                </label>
                <select
                  value={branch}
                  onChange={e => setBranch(e.target.value)}
                  className="block w-full bg-black/50 text-white text-sm border border-cyber-blue/30 rounded-none h-12 px-3 focus:ring-0 focus:border-cyber-blue focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all appearance-none"
                >
                  <option value="" className="bg-cyber-dark">Select Branch...</option>
                  {BRANCHES.map(b => (
                    <option key={b} value={b} className="bg-cyber-dark">{b}</option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={goToStep2}
                disabled={!isStep1Valid}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-cyber-blue text-xs font-black text-black bg-cyber-blue hover:bg-white hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] uppercase tracking-[0.2em] transition-all disabled:opacity-30 disabled:bg-cyber-dark disabled:text-slate-500 disabled:border-slate-700 mt-4"
              >
                Next: Add Members <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ========= STEP 2: Member Details ========= */}
          {step === 2 && (
            <div className="space-y-5">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center mb-2">
                Member #1 is the Team Lead. OTP will be sent to their email.
              </p>

              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {members.map((member, i) => (
                  <div key={i} className="border border-cyber-blue/20 bg-cyber-dark/50 p-4 relative">
                    <div className="absolute top-2 right-3 text-[9px] font-bold text-cyber-blue/50 uppercase tracking-widest">
                      {i === 0 ? "Team Lead" : `Member_${String(i + 1).padStart(2, "0")}`}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={e => updateMember(i, "name", e.target.value)}
                          className="block w-full bg-black/50 text-white text-xs border border-cyber-blue/20 rounded-none h-10 px-3 focus:ring-0 focus:border-cyber-blue transition-all placeholder:text-slate-700"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                          <Mail className="w-3 h-3 inline mr-1" /> Gmail
                        </label>
                        <input
                          type="email"
                          value={member.email}
                          onChange={e => updateMember(i, "email", e.target.value)}
                          className="block w-full bg-black/50 text-white text-xs border border-cyber-blue/20 rounded-none h-10 px-3 focus:ring-0 focus:border-cyber-blue transition-all placeholder:text-slate-700"
                          placeholder="john@gmail.com"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 flex justify-center items-center gap-2 py-3 border border-slate-700 text-xs font-bold text-slate-400 hover:text-white hover:border-slate-500 uppercase tracking-[0.15em] transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={!isStep2Valid || loading}
                  className="flex-[2] flex justify-center items-center gap-2 py-3 border border-cyber-blue text-xs font-black text-black bg-cyber-blue hover:bg-white hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] uppercase tracking-[0.15em] transition-all disabled:opacity-30 disabled:bg-cyber-dark disabled:text-slate-500 disabled:border-slate-700"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : (
                    <><ScanLine className="w-4 h-4" /> Send OTP to Lead</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ========= STEP 3: OTP Verification ========= */}
          {step === 3 && (
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              <div className="text-center">
                <Fingerprint className="w-10 h-10 text-cyber-purple mx-auto mb-4" />
                <p className="text-xs font-bold text-cyber-blue uppercase tracking-widest mb-1">
                  Decryption Key Sent To:
                </p>
                <p className="text-sm text-cyber-purple font-bold">{members[0].email}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-cyber-blue uppercase tracking-widest text-center mb-3">
                  Enter 6-Digit Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    className="block w-full text-center text-3xl tracking-[0.5em] font-black bg-black/50 text-cyber-blue border border-cyber-purple/50 rounded-none h-16 focus:ring-0 focus:border-cyber-purple focus:shadow-[0_0_20px_rgba(188,19,254,0.4)] transition-all placeholder:text-slate-800"
                    placeholder="------"
                    maxLength={6}
                  />
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber-purple"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyber-purple"></div>
                </div>
              </div>

              <div className="bg-cyber-dark/80 border border-cyber-blue/20 p-4 text-[10px] text-slate-500 uppercase tracking-widest">
                <p className="mb-1 text-cyber-blue font-bold">Registration Summary:</p>
                <p>Team: <span className="text-white">{teamName}</span> | Branch: <span className="text-white">{branch}</span></p>
                <p>Members: <span className="text-white">{members.map(m => m.name).join(", ")}</span></p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full flex justify-center py-4 px-4 border border-cyber-purple text-xs font-black text-black bg-cyber-purple hover:bg-white hover:shadow-[0_0_30px_rgba(188,19,254,0.6)] uppercase tracking-[0.2em] transition-all disabled:opacity-30 disabled:bg-cyber-dark disabled:text-slate-500 disabled:border-slate-700"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : "Verify & Register Team"}
              </button>

              <div className="text-center border-t border-cyber-blue/10 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-[10px] text-slate-500 hover:text-cyber-blue uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 w-full"
                >
                  <ArrowLeft className="w-3 h-3" /> Go Back & Edit Members
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
