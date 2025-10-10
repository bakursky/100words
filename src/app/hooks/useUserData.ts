
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

export type UserData = {
  avatar_url: string;
  name: string;
  email: string;
};

async function fetchUserData(): Promise<UserData | null> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    console.error("Error fetching user:", error);
    return null;
  }

  return {
    avatar_url: user.user_metadata.avatar_url || "",
    name: user.user_metadata.name || "User",
    email: user.user_metadata.email || "User",
  };
}

export function useUserData() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
  });
}
