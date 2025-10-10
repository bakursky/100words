import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

export type Note = { id: string; user_id: string; note_date: string; decrypted_content: string; created_at?: string };

async function fetchNotes(): Promise<Note[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase.rpc("get_my_notes");
  if (error) {
    console.error("Failed to fetch notes:", error);
    throw error;
  }
  return data ?? [];
}

export function useNotes() {
  return useQuery({ queryKey: ["notes"], queryFn: fetchNotes });
}
