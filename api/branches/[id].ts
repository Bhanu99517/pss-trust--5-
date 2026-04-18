import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ success: false, error: 'Branch ID is required.' });
  }

  // ── PATCH /api/branches/[id] ──────────────────────────────────────────────
  if (req.method === 'PATCH') {
    const { name, latitude, longitude, radius } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Branch name is required.' });
    }

    const { data, error } = await supabaseAdmin
      .from('branches')
      .update({
        name: name.trim(),
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        radius: radius ?? 100,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ success: false, error: `Branch name "${name}" already exists.` });
      }
      return res.status(500).json({ success: false, error: error.message });
    }

    if (!data) {
      return res.status(404).json({ success: false, error: 'Branch not found.' });
    }

    return res.json({ success: true, branch: data });
  }

  // ── DELETE /api/branches/[id] ─────────────────────────────────────────────
  if (req.method === 'DELETE') {
    const { error } = await supabaseAdmin
      .from('branches')
      .delete()
      .eq('id', id);

    if (error) return res.status(500).json({ success: false, error: error.message });
    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}