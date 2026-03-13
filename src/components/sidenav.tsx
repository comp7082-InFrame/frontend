'use client'

import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { IoPerson } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";
import { BsCameraVideoFill, BsPersonFillExclamation } from "react-icons/bs";
import Link from "next/link";
import "@/assets/styles/sidenav.css";
import { usePathname } from "next/navigation";
import { JSX } from "react";
import { RiCalendarTodoLine } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";

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
        { label: "Dashboard", path: "/", icon: <MdOutlineDashboard  /> },
        { label: "Teachers", path: "/admin/teachers", icon: <IoPerson /> },
        { label: "Students", path: "/admin/students", icon: <PiStudent /> },
        { label: "New Request", path: "/admin/newrequest", icon: <BsPersonFillExclamation /> },
        { label: "Camera", path: "/admin/camera", icon: <BsCameraVideoFill /> },
    ],
    teacher: [
        { label: "Dashboard", path: "/", icon: <MdOutlineDashboard  /> },
        { label: "Sessions", path: "/sessions", icon: <RiCalendarTodoLine  /> },
    ],
    student: [
        { label: "Dashboard", path: "/", icon: <MdOutlineDashboard  /> },
    ],
};

const Sidenav: React.FC<SidenavProps> = ({ role }) => {
    const pathname = usePathname();
    const menu = menuByRole[role] || [];

    return (
        <Box className="sidenav-container" position="fixed">
            <List sx={{ p: 0, mt: 0 }}>
                {menu.map((item) => {
                    const selected = pathname == (item.path);
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