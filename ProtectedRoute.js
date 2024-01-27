// ProtectedRoute.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Correct import path
import supabase from "@/supabase"; // Import your Supabase configuration

export function ProtectedRoute({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data?.user);
      } catch (error) {
        console.error('Error fetching user session:', error.message);
      }
    };

    fetchUserSession();
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      if (!user) {
        // If the user is not authenticated, redirect to the login page
        router.push("/authentication/sign-in");
      }
    };

    checkAuth();
  }, [user, router]);

  return <>{children}</>;
}
