// proxy.ts
import type { NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

// This is the new entry point in Next 16 for handling requests at the edge boundary.
export default async function proxy(request: NextRequest) {
  // Reuse your existing Supabase logic
  return updateSession(request)
}

// Optional: if you want the same matcher rules as middleware.config,
// you can keep using `middleware.ts` for now, or later replicate matcher
// in the new config format when Next deprecates middleware completely.