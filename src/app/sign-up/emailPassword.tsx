"use client";

import { getSupabaseBrowserClient } from "@/utils/supabase/browser-client";
import { User } from "@supabase/supabase-js";
import { useState, useEffect, CSSProperties } from "react";
import { SimpleAuthPage } from "@/components/SimpleAuthPage";
import { Box, Button, CircularProgress, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import "@/assets/styles/form.css";
import { useRouter } from 'next/navigation';
import { signOut } from "@/utils/supabase/actions";
import { updateSignUpUser } from "@/services/api";
import { AppRole } from "@/utils/authStub";

type EmailPasswordProps = {
    user: User | null;
};

const loadingStyles: Record<string, CSSProperties> = {
    '.load-container': {
        position: 'absolute',
        width: '100%',
        height: 'calc(100% - 50px)',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 99,
    }
}

export default function EmailPasswordSignUp({ user }: EmailPasswordProps) {
    const supabase = getSupabaseBrowserClient();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState<AppRole>("student");
    const [studentNumber, setStudentNumber] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [status, setStatus] = useState("");
    const [currentUser, setCurrentUser] = useState<User | null>(user);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        setStatus("");

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
            try {
                const created = await updateSignUpUser({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    role: role,
                    student_number: studentNumber,
                    employee_number: employeeNumber,
                    uuid: data.user?.id || ''
                })
            } catch (error) {
                console.error("Error updating user after sign up:", error);
                setStatus("Sign up succeeded but failed to update user details. Please contact support.");
                setLoading(false);
                return;
            } finally {
                setLoading(false);
                router.push('/');
            }
        }

    }

    async function handleLogout() {
        await signOut();
        setCurrentUser(null);
        setStatus("");
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setRole("student");
        setStudentNumber("");
        setEmployeeNumber("");

        router.push('/sign-in');

    }

    return (
        <SimpleAuthPage
        >
            {loading && (<Box display="flex" justifyContent="center" alignItems="center" minHeight="200px" style={loadingStyles['.load-container']}>
                <CircularProgress />
            </Box>)}
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
                            Sign up Your Account
                        </Typography>
                        <div className="">
                            <div className="form-group">
                                <div className='form-item'>
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

                                <div className='form-item'>
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
                            <div className="form-group">
                                <div className='form-item'>
                                    <Typography style={{ color: 'var(--primary-text-color)' }}>
                                        <b className='form-lbl'>
                                            First Name
                                        </b>
                                    </Typography>

                                    <TextField
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        placeholder="Your first name"
                                        className="mt-2 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className='form-item'>
                                    <Typography style={{ color: 'var(--primary-text-color)' }} >

                                        <b className='form-lbl'>
                                            Last Name
                                        </b>
                                    </Typography>

                                    <TextField
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        placeholder="Your last name"
                                        className="mt-2 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='form-item'>
                                    <Typography style={{ color: 'var(--primary-text-color)' }} >

                                        <b className='form-lbl'>
                                            Role
                                        </b>
                                    </Typography>                                    <FormControl className='start-session-form form-container'>
                                        <Select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value as AppRole)}
                                            size="small"
                                        >
                                            <MenuItem value={'student'}>Student</MenuItem>
                                            <MenuItem value={'teacher'}>Teacher</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                {role === 'student' ? (
                                    <div className='form-item'>
                                        <Typography style={{ color: 'var(--primary-text-color)' }} >

                                            <b className='form-lbl'>
                                                Student Number
                                            </b>
                                        </Typography>

                                        <TextField
                                            type="text"
                                            value={studentNumber}
                                            onChange={(e) => setStudentNumber(e.target.value)}
                                            required
                                            placeholder="Your student number"
                                            className="mt-2 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                ) : (
                                    <div className='form-item'>
                                        <Typography style={{ color: 'var(--primary-text-color)' }} >

                                            <b className='form-lbl'>
                                                Employee Number
                                            </b>
                                        </Typography>

                                        <TextField
                                            type="text"
                                            value={employeeNumber}
                                            onChange={(e) => setEmployeeNumber(e.target.value)}
                                            required
                                            placeholder="Your employee number"
                                            className="mt-2 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>


                        <div style={{
                            display: 'flex', gap: '20px'
                        }}>
                            <Button
                                type="button"
                                className="secondary-btn"
                                onClick={(e) => {
                                    handleSubmit("signUp")
                                }}
                            >
                                Sign up
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
                        <Button className="secondary-btn" onClick={async () => { handleLogout() }}>
                            Logout
                        </Button>
                    </div>
                </div>
            )
            }
        </SimpleAuthPage >
    );
}