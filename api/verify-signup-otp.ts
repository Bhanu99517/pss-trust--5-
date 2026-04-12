import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, code } = req.body;
  if (!code) return res.status(400).json({ error: 'Verification code is required' });

  try {
    // Check for the chairman's global signup code
    const { data: otpData, error: fetchError } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('email', 'CHAIRMAN_SIGNUP_CODE')
      .eq('code', code)
      .maybeSingle();

    if (fetchError || !otpData) {
      return res.status(400).json({ error: 'Invalid verification code.' });
    }

    const expiresAt = new Date(otpData.expires_at);
    if (expiresAt < new Date()) {
      return res.status(400).json({ error: 'Verification code has expired.' });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({ error: 'An internal error occurred during verification.' });
  }
}
