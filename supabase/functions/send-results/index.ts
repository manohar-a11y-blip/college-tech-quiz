import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { emails, teamName, score, totalQuestions } = await req.json()

    console.log(`Sending results for team: ${teamName}`)

    const responses = []

    for (const email of emails) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Tech Quiz Arena <onboarding@resend.dev>",
          to: email,
          subject: `🏆 Quiz Results - Team ${teamName}`,
          html: `
            <div style="background-color: #050505; padding: 40px 20px; font-family: 'Courier New', monospace;">
              <div style="max-width: 500px; margin: 0 auto; background-color: #0a0e17; border: 1px solid rgba(0, 243, 255, 0.3); padding: 0;">
                <div style="background: linear-gradient(90deg, #0056b3, #bc13fe); padding: 3px;"></div>
                <div style="padding: 30px;">
                  <h1 style="color: white; font-size: 18px; letter-spacing: 4px; margin: 0 0 10px;">TECH QUIZ ARENA</h1>
                  <p style="color: #00f3ff; font-size: 10px; letter-spacing: 3px; text-transform: uppercase;">Final Results Readout</p>
                  <hr style="border-color: rgba(0, 243, 255, 0.2); margin: 20px 0;">
                  <div style="background: rgba(188, 19, 254, 0.1); padding: 20px; border: 1px solid rgba(188, 19, 254, 0.3);">
                    <p style="color: #bc13fe; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 5px;">Team Identification</p>
                    <p style="color: white; font-size: 16px; font-weight: bold; margin: 0;">${teamName}</p>
                    <div style="margin-top: 20px;">
                      <p style="color: #00f3ff; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 5px;">Performance Statistics</p>
                      <p style="color: white; font-size: 24px; font-weight: 900; margin: 0;">${score} / ${totalQuestions}</p>
                      <p style="color: #64748b; font-size: 10px; margin-top: 5px;">Accuracy: ${Math.round((score / totalQuestions) * 100)}%</p>
                    </div>
                  </div>
                  <p style="color: #94a3b8; font-size: 12px; line-height: 1.8; margin-top: 20px;">
                    > Mission Summary: The participation of your team has been logged and analyzed.<br>
                    > Rankings will be broadcasted shortly at the Arena Control Center.<br><br>
                    > Thank you for competing.
                  </p>
                </div>
                <div style="background: linear-gradient(90deg, #0056b3, #bc13fe); padding: 2px;"></div>
              </div>
            </div>
          `,
        }),
      })
      const result = await res.json()
      responses.push(result)
    }

    return new Response(JSON.stringify({ success: true, responses }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
