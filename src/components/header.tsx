"use client"
import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import "@/assets/styles/header.css";

export default function DashboardHeader() {
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
                    Dashboard
                </Typography>

                <Avatar className="avatar-div"
                >
                    AM
                </Avatar>
            </Toolbar>
        </AppBar>
    );
}
