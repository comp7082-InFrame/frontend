"use client"
import { AppBar, Avatar, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import "@/assets/styles/header.css";
import { usePathname, useSearchParams } from "next/navigation";
import { clearStoredUser, getStoredUser, getStoredRole, setStoredUser } from "@/utils/authStub";
import { getSupabaseBrowserClient } from "@/utils/supabase/browser-client";
import { useState } from "react";
import { signOut } from "@/utils/supabase/actions";

export default function DashboardHeader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const role = getStoredRole();
    const user = getStoredUser();
    const supabase = getSupabaseBrowserClient();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const getInitials = (firstName?: string, lastName?: string) => {
        if (!firstName && !lastName) return "U";
        const first = firstName?.charAt(0).toUpperCase() || "";
        const last = lastName?.charAt(0).toUpperCase() || "";
        return (first + last).slice(0, 2);
    };

    const title = pathname === "/auth" ? "" :
        pathname === "/" && role === "admin" && searchParams.get("view") === "camera"
            ? "Cameras"
            : pathname === "/" && role === "admin"
                ? "Students"
                : pathname === "/teachers"
                    ? "Teachers"
                    : pathname === "/" && role === "teacher"
                        ? "Dashboard"
                        : pathname.startsWith("/sessions")
                            ? "Sessions"
                            : pathname === "/camera"
                                ? "Live Camera"
                                : "Dashboard";

    async function handleSignOut() {
        clearStoredUser();
        setAnchorEl(null);
        await signOut()
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenAvatarMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <AppBar
            position="fixed"
            className="header"
        >
            <div className="logo-div">
                <Image
                    src={Logo}
                    alt="InFrame logo"
                    priority
                />
            </div>
            {user != null ? (<Toolbar
                className="header-toolbar"

            >
                <Typography
                    variant="h6"
                    component="div"
                    className="header-title"
                >
                    {title}
                </Typography>

                <div className="header-actions">
                    <Avatar className="avatar-div"
                        onClick={handleOpenAvatarMenu}
                    >
                        {getInitials(user?.first_name, user?.last_name)}
                    </Avatar>
                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                            list: {
                                'aria-labelledby': 'lock-button',
                                role: 'listbox',
                            },
                        }}
                    >

                        <MenuItem
                            key={'signout'}
                            onClick={() => {
                                handleSignOut();
                                window.location.href = "/sign-in";
                            }}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>) : null
            }
        </AppBar>
    );
}
