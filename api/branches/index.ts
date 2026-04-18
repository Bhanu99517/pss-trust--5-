import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export default async function handler(req: VercelRequest, res: VercelResponse) {

  // ── GET /api/branches ─────────────────────────────────────────────────────
  if (req.method === 'GET') {
    const { data, error } = await supabaseAdmin
      .from('branches')
      .select('*')
      .order('name', { ascending: true });

    if (error) return res.status(500).json({ success: false, error: error.message });
    return res.json({ success: true, branches: data });
  }

  // ── POST /api/branches ────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const { name, latitude, longitude, radius } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Branch name is required.' });
    }

    const { data, error } = await supabaseAdmin
      .from('branches')
      .insert([{
        name: name.trim(),
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        radius: radius ?? 100,
      }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ success: false, error: `Branch "${name}" already exists.` });
      }
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(201).json({ success: true, branch: data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}