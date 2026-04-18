import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export default async function handler(req: VercelRequest, res: VercelResponse) {

  // Extract optional id from URL: /api/branches or /api/branches/<uuid>
  const urlParts = (req.url || '').split('?')[0].split('/').filter(Boolean);
  // urlParts = ['api', 'branches'] or ['api', 'branches', '<uuid>']
  const id = urlParts.length >= 3 ? urlParts[2] : null;

  // ── PATCH /api/branches/<id>  →  update ──────────────────────────────────
  if (req.method === 'PATCH' && id) {
    const { name, latitude, longitude, radius } = req.body ?? {};
    if (!name || !String(name).trim()) {
      return res.status(400).json({ success: false, error: 'Branch name is required.' });
    }
    const { data, error } = await supabaseAdmin
      .from('branches')
      .update({
        name: String(name).trim(),
        latitude: latitude !== undefined ? latitude : null,
        longitude: longitude !== undefined ? longitude : null,
        radius: radius !== undefined ? radius : 100,
      })
      .eq('id', id)
      .select()
      .single();
    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ success: false, error: `Branch "${name}" already exists.` });
      }
      return res.status(500).json({ success: false, error: error.message });
    }
    if (!data) return res.status(404).json({ success: false, error: 'Branch not found.' });
    return res.json({ success: true, branch: data });
  }

  // ── DELETE /api/branches/<id>  →  delete ─────────────────────────────────
  if (req.method === 'DELETE' && id) {
    const { error } = await supabaseAdmin
      .from('branches')
      .delete()
      .eq('id', id);
    if (error) return res.status(500).json({ success: false, error: error.message });
    return res.json({ success: true });
  }

  // ── GET /api/branches  →  list all ───────────────────────────────────────
  if (req.method === 'GET') {
    const { data, error } = await supabaseAdmin
      .from('branches')
      .select('*')
      .order('name', { ascending: true });
    if (error) return res.status(500).json({ success: false, error: error.message });
    return res.json({ success: true, branches: data });
  }

  // ── POST /api/branches  →  create ────────────────────────────────────────
  if (req.method === 'POST') {
    const { name, latitude, longitude, radius } = req.body ?? {};
    if (!name || !String(name).trim()) {
      return res.status(400).json({ success: false, error: 'Branch name is required.' });
    }
    const { data, error } = await supabaseAdmin
      .from('branches')
      .insert([{
        name: String(name).trim(),
        latitude: latitude !== undefined ? latitude : null,
        longitude: longitude !== undefined ? longitude : null,
        radius: radius !== undefined ? radius : 100,
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