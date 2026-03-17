import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")

serve(async (req) => {
  const { teamName, branch, members } = await req.json()

  console.log(`Sending participation emails for team: ${teamName}`)

  const responses = []

  for (const member of members) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Tech Quiz Arena <onboarding@resend.dev>", // replace with your verified domain
        to: member.email,
        subject: `🎮 Welcome to Tech Quiz Arena — Team ${teamName}`,
        html: `
          <div style="background:#050505;padding:40px 20px;font-family:'Courier New',monospace">
            <div style="max-width:500px;margin:0 auto;background:#0a0e17;border:1px solid rgba(0,243,255,0.3)">
              <div style="background:linear-gradient(90deg,#0056b3,#bc13fe);padding:3px"></div>
              <div style="padding:30px">
                <h1 style="color:white;font-size:18px;letter-spacing:4px">TECH QUIZ ARENA</h1>
                <p style="color:#00f3ff;font-size:10px;letter-spacing:3px;text-transform:uppercase">Participation Confirmed</p>
                <hr style="border-color:rgba(0,243,255,0.2);margin:20px 0">
                <p style="color:#94a3b8;font-size:12px;line-height:2">
                  > Hello <b style="color:white">${member.name}</b>,<br>
                  > You have been registered for the Tech Quiz Arena!<br><br>
                  > Team: <b style="color:#00f3ff">${teamName}</b><br>
                  > Branch: <b style="color:#bc13fe">${branch}</b><br>
                  > Members: <b style="color:white">${members.map((m: any) => m.name).join(", ")}</b><br><br>
                  > Get ready to compete. Good luck, contestant!
                </p>
              </div>
              <div style="background:linear-gradient(90deg,#0056b3,#bc13fe);padding:2px"></div>
            </div>
          </div>
        `,
      }),
    })
    responses.push(await res.json())
  }

  return new Response(JSON.stringify({ success: true, responses }), {
    headers: { "Content-Type": "application/json" },
  })
})
