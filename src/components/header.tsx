"use client"
import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import "@/assets/styles/header.css";
import { usePathname, useSearchParams } from "next/navigation";
import { clearStoredRole, getStoredRole } from "@/utils/authStub";

export default function DashboardHeader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const role = getStoredRole();

    const title = pathname === "/" && role === "admin" && searchParams.get("view") === "camera"
        ? "Cameras"
        : pathname === "/" && role === "admin"
        ? "Students"
        : pathname === "/" && role === "teacher"
            ? "Sessions"
            : pathname.startsWith("/sessions")
                ? "Sessions"
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
                            clearStoredRole();
                            window.location.href = "/";
                        }}
                    >
                        Logout
                    </Button>
                    <Avatar className="avatar-div">
                        AM
                    </Avatar>
                </div>
            </Toolbar>
        </AppBar>
    );
}
