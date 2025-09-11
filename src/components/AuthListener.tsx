"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthListener() {
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) router.replace("/");
        });

        const { data: sub } = supabase.auth.onAuthStateChange((event) => {
            if (event === "SIGNED_IN") {
                router.replace("/");
            }
        });

        return () => {
            sub.subscription.unsubscribe();
        };
    }, [router]);

    return null;
}
