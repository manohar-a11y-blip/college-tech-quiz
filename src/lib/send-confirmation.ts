import { supabase } from "./supabase"

// Called after successful OTP verification to email all team members
export async function sendParticipationEmails(
  teamName: string,
  branch: string,
  members: { name: string; email: string }[]
) {
  try {
    const { data, error } = await supabase.functions.invoke("send-participation", {
      body: { teamName, branch, members },
    })
    if (error) throw error
    return data
  } catch (err) {
    console.error("Failed to send participation emails:", err)
  }
}
