import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

import {
    Card,
    Box,
    CardContent,
    Button,
    Typography,
    IconButton,
    Divider
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';

export default function History() {

    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        }
        fetchHistory();
    }, [])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();
        return `${day}/${month}/${year}`
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0F172A, #1E293B)",
                p: 4
            }}
        >
            {/* HEADER */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 4
                }}
            >
                <Box display="flex" alignItems="center" gap={1}>
                    <HistoryIcon sx={{ color: "white" }} />
                    <Typography variant="h5" fontWeight="bold" color="white">
                        Meeting History
                    </Typography>
                </Box>

                <IconButton
                    sx={{ color: "white" }}
                    onClick={() => routeTo("/home")}
                >
                    <HomeIcon />
                </IconButton>
            </Box>

            {/* HISTORY LIST */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)"
                    },
                    gap: 3
                }}
            >
                {meetings.length !== 0 &&
                    meetings.map((e, i) => (
                        <Card
                            key={i}
                            elevation={8}
                            sx={{
                                borderRadius: "16px",
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "translateY(-5px)"
                                }
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Meeting Code
                                </Typography>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    mb={2}
                                >
                                    {e.meetingCode}
                                </Typography>

                                <Divider />

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    mt={2}
                                >
                                    Date
                                </Typography>

                                <Typography variant="body1">
                                    {formatDate(e.date)}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                }
            </Box>

            {/* EMPTY STATE */}
            {meetings.length === 0 && (
                <Box
                    sx={{
                        mt: 10,
                        textAlign: "center",
                        color: "white",
                        opacity: 0.8
                    }}
                >
                    <Typography variant="h6">
                        No meeting history found
                    </Typography>
                </Box>
            )}
        </Box>
    )
}
