import EmailPassword from "./emailPassword";
import { createSupabaseServerClient } from "@/utils/supabase/server-client";

export default async function EmailPasswordPage() {
    const supabase = await createSupabaseServerClient()
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return <EmailPassword user={user} />;
}