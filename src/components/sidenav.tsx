'use client'

import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { PiStudent } from "react-icons/pi";
import Link from "next/link";
import "@/assets/styles/sidenav.css";
import { usePathname, useSearchParams } from "next/navigation";
import { JSX } from "react";
import { RiCalendarTodoLine } from "react-icons/ri";
import { BsCameraVideoFill } from "react-icons/bs";

type MenuItem = {
    label: string;
    path: string;
    icon: JSX.Element;
};

type SidenavProps = {
    role: "admin" | "teacher" | "student";
};

const menuByRole: Record<string, MenuItem[]> = {
    admin: [
        { label: "Students", path: "/", icon: <PiStudent /> },
        { label: "Cameras", path: "/?view=camera", icon: <BsCameraVideoFill /> },
    ],
    teacher: [
        { label: "Sessions", path: "/sessions", icon: <RiCalendarTodoLine  /> },
    ],
    student: [],
};

const Sidenav: React.FC<SidenavProps> = ({ role }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const menu = menuByRole[role] || [];
    const currentPath = pathname === "/" && searchParams.get("view") === "camera"
        ? "/?view=camera"
        : pathname;

    return (
        <Box className="sidenav-container" position="fixed">
            <List sx={{ p: 0, mt: 0 }}>
                {menu.map((item) => {
                    const selected = currentPath === item.path;
                    return (
                        <ListItemButton
                            key={item.path}
                            component={Link}
                            href={item.path}
                            className={selected ? "sidenav-item selected" : "sidenav-item"}
                        >
                            <ListItemIcon className="item-icon">{item.icon}</ListItemIcon>
                            <ListItemText className="item-text" primary={item.label} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Box>
    );
};

export default Sidenav;
