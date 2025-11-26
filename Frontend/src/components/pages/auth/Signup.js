import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    IconButton,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./auth.css";
import axios from "axios";
import { toast } from 'react-hot-toast';

const theme = createTheme({
    palette: {
        primary: {
            main: "#007bff",
        },
        secondary: {
            main: "#0056b3",
        },
        background: {
            default: "#f0f5f9",
        },
    },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 400,
    margin: "auto",
    textAlign: "center",
}));

const StyledForm = styled("form")(({ theme }) => ({
    width: "100%",
    marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        setNameError("");
        setError("");
        setEmailError("");
        setPasswordError("");

        // Validation
        if (!name || !email || !password) {
            if (!name) setNameError("Name is required");
            if (!email) setEmailError("Email is required");
            if (!password) setPasswordError("Password is required");
            return;
        }

        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
        
        console.log('Attempting signup to:', `${BACKEND_URL}/api/v1/users/signup`);
        
        setLoading(true);
        
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/users/signup`,
                {
                    name,
                    email,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );
            
            console.log("Signup success:", response.data);
            toast.success('Account created successfully!');
            navigate("/login");
        } catch (error) {
            console.error('Signup error:', error);
            
            if (error.response && error.response.data) {
                setError(error.response.data.message || "Signup failed");
                toast.error(error.response.data.message || "Signup failed");
            } else if (error.request) {
                setError("Cannot connect to server. Please check your connection.");
                toast.error("Cannot connect to server");
            } else {
                setError("An error occurred. Please try again.");
                toast.error("An error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        toast.info('Google Sign Up coming soon!');
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="h-[calc(100svh-5rem)] flex justify-center items-center">
                <Container component="main" maxWidth="xs" className="relative">
                    <StyledPaper elevation={3}>
                        <div className="flex items-center">
                            <IconButton
                                onClick={() => navigate("/")}
                                color="inherit"
                                size="small"
                                sx={{ position: "absolute", left: "2rem" }}>
                                <ArrowBackIcon
                                    sx={{ height: "35px", width: "35px" }}
                                />
                            </IconButton>
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{ fontWeight: "bold" }}>
                                Sign Up
                            </Typography>
                        </div>
                        <StyledForm noValidate onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={isSubmitted && !!nameError}
                                helperText={isSubmitted && nameError}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={isSubmitted && !!emailError}
                                helperText={isSubmitted && emailError}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={isSubmitted && !!passwordError}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                error={isSubmitted && !!passwordError}
                                helperText={isSubmitted && passwordError}
                            />
                            {error && (
                                <Typography
                                    color="error"
                                    variant="body2"
                                    align="center"
                                    sx={{ mt: 2 }}>
                                    {error}
                                </Typography>
                            )}
                            <SubmitButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                sx={{ color: "white" }}>
                                {loading ? 'Signing up...' : 'Sign Up'}
                            </SubmitButton>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                onClick={handleGoogleSignUp}
                                sx={{ marginTop: 2 }}>
                                Sign Up with Google
                            </Button>
                            <Box mt={2}>
                                <Typography variant="body2">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="text-[#00aaff] text-lg">
                                        Sign In
                                    </Link>
                                </Typography>
                            </Box>
                        </StyledForm>
                    </StyledPaper>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default Signup;