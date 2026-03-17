import Link from "next/link"
import { ArrowRight, Terminal, Cpu, Database, Network, Fingerprint, ShieldAlert, Binary, Globe2 } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-cyber-black flex flex-col font-mono overflow-x-hidden relative">
      {/* Global Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-10">
        <div className="w-full h-2 bg-cyber-blue animate-scanline shadow-[0_0_10px_#00f3ff]"></div>
      </div>
      
      {/* Global Cyber Grid */}
      <div className="fixed inset-0 cyber-grid z-0 opacity-40"></div>

      {/* Dynamic Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-cyber-dark/80 backdrop-blur-md border-b border-cyber-blue/30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border-2 border-cyber-blue rounded-none flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.3)] relative">
                <div className="absolute inset-1 border border-cyber-blue/50 flex items-center justify-center bg-cyber-blue/10">
                  <Terminal className="w-6 h-6 text-cyber-blue" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl text-white tracking-widest leading-none text-glow">TQA<span className="text-cyber-blue">_SYS</span></span>
                <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-cyber-blue mt-1">Tech_Quiz_Arena_Node</span>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-10">
              <a href="#about" className="text-xs font-bold text-slate-400 hover:text-cyber-blue hover:text-glow transition-all uppercase tracking-[0.2em] flex items-center gap-2"><Binary className="w-3 h-3"/> About</a>
              <a href="#academics" className="text-xs font-bold text-slate-400 hover:text-cyber-blue hover:text-glow transition-all uppercase tracking-[0.2em] flex items-center gap-2"><Network className="w-3 h-3"/> Categories</a>
              <a href="#" className="text-xs font-bold text-slate-400 hover:text-cyber-blue hover:text-glow transition-all uppercase tracking-[0.2em] flex items-center gap-2"><Database className="w-3 h-3"/> Leaderboard</a>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/login" className="cyber-button hidden sm:flex items-center gap-2">
                <Fingerprint className="w-4 h-4" /> Enter Arena
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20 relative z-10">
        {/* Holographic Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            {/* Ambient cyber glows */}
            <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-cyber-purple/20 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-cyber-blue/10 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-3 px-5 py-1 mb-8 border border-cyber-blue/30 bg-cyber-dark/50 text-cyber-blue text-[10px] font-bold uppercase tracking-[0.3em] backdrop-blur-sm animate-pulse">
              <div className="w-2 h-2 bg-cyber-blue rounded-full animate-ping"></div>
              Arena Online // 150 Questions Loaded // 3 Difficulty Levels
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-widest mb-6 leading-[1.1] uppercase relative">
              <span className="absolute -left-12 top-0 text-cyber-blue/20 select-none">{"<"}</span>
              Enter The <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple text-glow">
                Quiz Arena
              </span>
              <span className="absolute -right-12 bottom-0 text-cyber-blue/20 select-none">{"/>"}</span>
            </h1>
            
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-slate-400 font-light mb-12 leading-relaxed">
              {">"} _CONNECTION ESTABLISHED. Initializing quiz protocols... <br/>
              {">"} Battle through Computer Science and AI challenges across Easy, Medium, and Hard difficulty nodes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <a href="#academics" className="border-2 border-white/20 hover:border-white/50 bg-white/5 text-white px-8 py-3 uppercase tracking-[0.2em] text-sm font-bold transition-all backdrop-blur-md">
                View Categories
              </a>
              <Link href="/login" className="bg-cyber-blue text-black px-8 py-3 uppercase tracking-[0.2em] text-sm font-black hover:bg-white hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] transition-all flex items-center justify-center group">
                Start Quiz <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* System Readout Stats */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20">
          <div className="cyber-panel p-1">
            <div className="bg-cyber-black/90 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-cyber-blue/20">
              <div className="text-center px-4 group">
                <p className="text-4xl font-black text-white mb-2 group-hover:text-cyber-blue transition-colors">150</p>
                <p className="text-[10px] font-bold text-cyber-blue/70 uppercase tracking-[0.3em] flex flex-col items-center gap-1">
                  <Database className="w-3 h-3"/> Total Questions
                </p>
              </div>
              <div className="text-center px-4 group">
                <p className="text-4xl font-black text-white mb-2 group-hover:text-cyber-purple transition-colors">02</p>
                <p className="text-[10px] font-bold text-cyber-blue/70 uppercase tracking-[0.3em] flex flex-col items-center gap-1">
                  <Cpu className="w-3 h-3"/> Quiz Domains
                </p>
              </div>
              <div className="text-center px-4 group">
                <p className="text-4xl font-black text-white mb-2 group-hover:text-cyber-blue transition-colors">03</p>
                <p className="text-[10px] font-bold text-cyber-blue/70 uppercase tracking-[0.3em] flex flex-col items-center gap-1">
                  <ShieldAlert className="w-3 h-3"/> Difficulty Tiers
                </p>
              </div>
              <div className="text-center px-4 group">
                <p className="text-4xl font-black text-white mb-2 group-hover:text-cyber-purple transition-colors">100%</p>
                <p className="text-[10px] font-bold text-cyber-blue/70 uppercase tracking-[0.3em] flex flex-col items-center gap-1">
                  <Network className="w-3 h-3"/> Arena Uptime
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About/Lore Section */}
        <section id="about" className="py-24 relative overflow-hidden border-y border-cyber-blue/20 bg-cyber-dark/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                  <span className="w-1.5 h-1.5 bg-cyber-blue animate-pulse"></span>
                  Protocol: Quiz_Engine // v3.0
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-widest mb-6 uppercase">
                  How The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-white text-glow">Arena Works</span>
                </h2>
                <div className="font-mono text-sm text-slate-400 space-y-4 border-l-2 border-cyber-blue/30 pl-6 py-2">
                  <p>
                    {">"} Register your team and authenticate via secure OTP uplink.
                  </p>
                  <p>
                    {">"} Choose your combat domain: Computer Science or Artificial Intelligence.
                  </p>
                  <p className="text-cyber-blue">
                    {">"} Battle through 3 difficulty tiers: Easy, Medium, Hard. 25 questions per round.
                  </p>
                  <p>
                    {">"} Host controls progression. Top scorers advance. Only the elite survive.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                
                <div className="cyber-panel p-6 mt-12 hover:-translate-y-2 transition-transform cursor-crosshair group">
                  <Globe2 className="w-8 h-8 text-cyber-purple mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-white mb-2 tracking-widest uppercase text-sm">Multiplayer</h3>
                  <p className="text-xs text-slate-500 font-mono">Teams compete head-to-head in real-time knowledge battles.</p>
                </div>
                
                <div className="cyber-panel p-6 bg-cyber-blue/5 border-cyber-blue/60 hover:-translate-y-2 transition-transform cursor-crosshair group">
                  <Cpu className="w-8 h-8 text-cyber-blue mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-white mb-2 tracking-widest uppercase text-sm">Adaptive AI</h3>
                  <p className="text-xs text-cyber-blue/60 font-mono">Questions scale with your team's progression through difficulty tiers.</p>
                </div>
                
                <div className="cyber-panel p-6 mt-[-20px] bg-cyber-purple/5 border-cyber-purple/40 hover:-translate-y-2 transition-transform cursor-crosshair group">
                  <Binary className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-white mb-2 tracking-widest uppercase text-sm">Live Scores</h3>
                  <p className="text-xs text-slate-500 font-mono">Real-time leaderboard tracking across all competing teams.</p>
                </div>
                
                <div className="cyber-panel p-6 hover:-translate-y-2 transition-transform cursor-crosshair group">
                  <Network className="w-8 h-8 text-cyber-blue mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-white mb-2 tracking-widest uppercase text-sm">Host Control</h3>
                  <p className="text-xs text-slate-500 font-mono">Administrators manage rounds, approve level-ups, and control the arena.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Academics Showcase */}
        <section id="academics" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col items-center mb-16 text-center">
               <div className="flex items-center gap-4 mb-4">
                 <div className="h-[1px] w-12 bg-cyber-blue/50"></div>
                 <h2 className="text-[10px] font-bold text-cyber-blue uppercase tracking-[0.4em]">Available Quiz Modules</h2>
                 <div className="h-[1px] w-12 bg-cyber-blue/50"></div>
               </div>
               <h3 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase text-glow">
                 Battle Categories
               </h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {/* Quiz Categories */}
               {[
                 { title: "Computer Science", code: "CSE_75Q", desc: "Data structures, algorithms, OS internals, networking protocols, and software architecture." },
                 { title: "Artificial Intelligence", code: "AI_75Q", desc: "Machine learning, neural networks, NLP, computer vision, and deep learning systems." },
                 { title: "Easy Mode", code: "LVL_01", desc: "Foundation-level questions to calibrate your knowledge base. 25 questions per round." },
                 { title: "Medium Mode", code: "LVL_02", desc: "Intermediate challenges that test applied understanding. Host approval required to advance." },
                 { title: "Hard Mode", code: "LVL_03", desc: "Elite-tier problems for the top performers. Only the strongest teams survive." },
                 { title: "Leaderboard", code: "RANK_SYS", desc: "Real-time score tracking and team rankings. See who dominates the arena." },
               ].map((prog, i) => (
                 <div key={i} className="cyber-panel p-6 group hover:bg-cyber-blue/5 cursor-crosshair">
                    <div className="flex justify-between items-start mb-6">
                      <div className="px-3 py-1 border border-cyber-blue/30 bg-cyber-blue/10 text-cyber-blue font-bold text-[10px] tracking-widest">
                        MOD_{prog.code}
                      </div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                        <Terminal className="w-3 h-3"/> Online
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-white mb-2 uppercase tracking-wide group-hover:text-cyber-blue transition-colors">
                      {prog.title}
                    </h4>
                    <p className="text-sm font-mono text-slate-500 mb-6">
                      {prog.desc}
                    </p>
                    <div className="w-full h-[1px] bg-cyber-gray mb-4 relative">
                       <div className="absolute top-0 left-0 h-full w-0 bg-cyber-blue group-hover:w-full transition-all duration-700 ease-out"></div>
                    </div>
                    <div className="flex items-center text-xs text-cyber-blue/70 font-mono group-hover:text-cyber-blue transition-colors">
                      {">"} Execute start_quiz.sh <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse">_</span>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </section>
      </main>

      {/* Cyber Footer */}
      <footer className="bg-cyber-dark border-t border-cyber-blue/30 pt-16 pb-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 border border-cyber-blue bg-cyber-black flex items-center justify-center relative shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                  <div className="w-2 h-2 bg-cyber-blue animate-pulse"></div>
               </div>
              <span className="font-black text-xl text-white tracking-widest text-glow">TQA<span className="text-cyber-blue text-sm">_SYS</span></span>
            </div>
            <p className="text-slate-500 font-mono text-xs max-w-sm mb-6 leading-relaxed">
              [SYSTEM: TECH_QUIZ_ARENA]<br/>
              The ultimate battleground for tech knowledge. Compete, survive, and dominate the leaderboard.
            </p>
          </div>
          
          <div>
            <h4 className="text-cyber-blue font-bold mb-4 uppercase tracking-[0.2em] text-[10px] border-b border-cyber-blue/20 pb-2 inline-block">Directory</h4>
            <ul className="space-y-3 font-mono text-xs text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">{">"} Quiz_Rules</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{">"} Leaderboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{">"} Past_Results</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{">"} FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cyber-blue font-bold mb-4 uppercase tracking-[0.2em] text-[10px] border-b border-cyber-blue/20 pb-2 inline-block">Secure Uplinks</h4>
            <ul className="space-y-3 font-mono text-xs text-slate-400">
              <li><Link href="/login" className="text-cyber-purple hover:text-white transition-colors">{">"} Team_Login</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">{">"} Host_Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{">"} Admin_Panel</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{">"} Contact_Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-cyber-gray pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            © {new Date().getFullYear()} TECH_QUIZ_ARENA. ALL DIRECTIVES RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">System Operational</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
