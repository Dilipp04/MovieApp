import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { settokenInLS, isLoggedIn } = useAuth()
    const Navigate = useNavigate()
    useEffect(() => {
        if (isLoggedIn) {
            return Navigate("/")
        }
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${import.meta.env.VITE_API}/api/auth/login`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json();
        settokenInLS(json.token)
        if (response.ok) {
            setEmail("")
            setPassword("")
            Navigate("/");
        } else {
            alert(json.msg)
        }
    };

    return (
        <div className="relative min-h-screen bg-[url('/background.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-black before:opacity-50 ">
            <div className="relative z-10">
                <Container maxWidth="xs" sx={{ display: "flex", opacity: 0.95, justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: "100%" }}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Login
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Login
                            </Button>
                            <div className="text-center">
                                <NavLink to="/register">
                                    Create new account
                                </NavLink>
                            </div>
                        </Box>
                    </Paper>
                </Container>
            </div>
        </div>
    );
};

export default Login;

