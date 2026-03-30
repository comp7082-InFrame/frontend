"use client";

import { getSupabaseBrowserClient } from "@/utils/supabase/browser-client";
import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { SimpleAuthPage } from "@/components/SimpleAuthPage";
import { Button, TextField, Typography } from "@mui/material";
import "@/assets/styles/form.css";
import { useRouter } from 'next/navigation';
import { signOut } from "@/utils/supabase/actions";

type EmailPasswordProps = {
    user: User | null;
};

export default function EmailPassword({ user }: EmailPasswordProps) {
    const supabase = getSupabaseBrowserClient();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [currentUser, setCurrentUser] = useState<User | null>(user);
    const router = useRouter();

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setCurrentUser(session?.user ?? null);
            }
        );

        return () => listener?.subscription.unsubscribe();
    }, [supabase]);

    useEffect(() => {
        if (currentUser) {
            router.push('/');
        }
    }, [currentUser]);

    async function handleSubmit(type: string) {
        setStatus("");
        if (type === "signIn") {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error("Error signing in:", error);
                setStatus(error.message);
            } else {
                setStatus("Signed in successfully");
                router.push('/')
            }
        } else {
            const { error, data } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: '/',
                },
            });
            if (error) {
                setStatus(error.message);
            } else {
                // router.push('/sign-in')
                setStatus("Check your inbox to confirm the new account.");
            }
        }

    }

    return (
        <SimpleAuthPage
        >
            {!currentUser ? (
                <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                    <form
                        className="form-container"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" style={{ color: 'var(--primary-text-color)' }}>
                            Sign in to Your Account
                        </Typography>
                        <div className="space-y-4" style={{ gap: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div>
                                <Typography style={{ color: 'var(--primary-text-color)' }}>
                                    <b className='form-lbl'>
                                        Email
                                    </b>
                                </Typography>

                                <TextField
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@email.com"
                                    className="mt-2 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <Typography style={{ color: 'var(--primary-text-color)' }} >

                                    <b className='form-lbl'>
                                        Password
                                    </b>
                                </Typography>

                                <TextField
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Your password"
                                    className="mt-2 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div style={{
                            display: 'flex', gap: '20px'
                        }}>
                            {/* <Button
                                type="button"
                                className="secondary-btn"
                                onClick={(e) => {
                                    handleSubmit("signUp")
                                }

                                }
                            >
                                Sign up
                            </Button> */}

                            <Button
                                type="button"
                                className="primary-btn"
                                onClick={(e) => {
                                    handleSubmit("signIn")
                                }}
                            >
                                Sign in
                            </Button>
                        </div>

                        {status && (
                            <p style={{ color: 'red' }} role="status">
                                {status}
                            </p>
                        )}
                    </form>
                </div>
            ) : (
                <div style={{
                    display: 'flex', textAlign: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                }}>
                    <div style={{
                        display: 'flex', textAlign: 'center',
                        gap: '20px',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: 'solid 1px grey',
                        borderRadius: '10px',
                        padding: '40px',
                    }}>
                        <Typography variant="h5" style={{ color: 'var(--primary-text-color)', maxWidth: '500px' }}>
                            Sign up successfully. Please contact your administrator to confirm your account.
                        </Typography>
                        <Button className="secondary-btn" onClick={async () => { await signOut(); setCurrentUser(null) }}>
                            Logout
                        </Button>
                    </div>
                </div>
            )
            }
        </SimpleAuthPage >
    );
}