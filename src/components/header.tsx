"use client"
import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import "@/assets/styles/header.css";
import { usePathname, useSearchParams } from "next/navigation";
import { clearStoredUser, getStoredUser, getStoredRole } from "@/utils/authStub";

export default function DashboardHeader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const role = getStoredRole();
    const user = getStoredUser();

    const getInitials = (firstName?: string, lastName?: string) => {
        if (!firstName && !lastName) return "U";
        const first = firstName?.charAt(0).toUpperCase() || "";
        const last = lastName?.charAt(0).toUpperCase() || "";
        return (first + last).slice(0, 2);
    };

    const title = pathname === "/" && role === "admin" && searchParams.get("view") === "camera"
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
            <Toolbar
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
                    <Button
                        className="header-logout"
                        onClick={() => {
                            clearStoredUser();
                            window.location.href = "/";
                        }}
                    >
                        Logout
                    </Button>
                    <Avatar className="avatar-div">
                        {getInitials(user?.first_name, user?.last_name)}
                    </Avatar>
                </div>
            </Toolbar>
        </AppBar>
    );
}
