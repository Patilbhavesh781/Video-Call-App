import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    TextField,
    Box,
    Paper
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>
            {/* NAVBAR */}
            <AppBar position="static" elevation={0} sx={{ background: "#0F172A" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <VideoCallIcon />
                        <Typography variant="h6" fontWeight="bold">
                            Video Call App
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <IconButton color="inherit" onClick={() => navigate("/history")}>
                            <RestoreIcon />
                        </IconButton>
                        <Typography variant="body2" sx={{ mr: 2 }}>
                            History
                        </Typography>

                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() => {
                                localStorage.removeItem("token")
                                navigate("/auth")
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* MAIN SECTION */}
            <Box
                sx={{
                    minHeight: "calc(100vh - 64px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 4,
                    background: "linear-gradient(135deg, #0F172A, #1E293B)"
                }}
            >
                <Box
                    sx={{
                        maxWidth: "1100px",
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 4,
                        alignItems: "center"
                    }}
                >
                    {/* LEFT PANEL */}
                    <Paper
                        elevation={10}
                        sx={{
                            p: 4,
                            borderRadius: "20px",
                            background: "#FFFFFF"
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            High-Quality Video Calls
                        </Typography>

                        <Typography variant="body1" color="text.secondary" mb={3}>
                            Seamless, secure, and crystal-clear video meetings —
                            just like quality education.
                        </Typography>

                        <Box display="flex" gap={2}>
                            <TextField
                                fullWidth
                                label="Enter Meeting Code"
                                variant="outlined"
                                onChange={e => setMeetingCode(e.target.value)}
                            />

                            <Button
                                onClick={handleJoinVideoCall}
                                variant="contained"
                                sx={{
                                    px: 4,
                                    background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                                    borderRadius: "10px"
                                }}
                            >
                                Join
                            </Button>
                        </Box>
                    </Paper>

                    {/* RIGHT PANEL */}
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            justifyContent: "center"
                        }}
                    >
                        <img
                            src="/logo3.png"
                            alt="Video Call Illustration"
                            style={{
                                width: "100%",
                                maxWidth: "420px",
                                borderRadius: "20px"
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default withAuth(HomeComponent)
