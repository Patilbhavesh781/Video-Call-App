import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'

export default function LandingPage() {

    const router = useNavigate();

    return (
        <div className="landingPageContainer">
            {/* NAVBAR */}
            <nav className="landingNav">
                <div className="navHeader">
                    <h2>Video Call App</h2>
                </div>

                <div className="navlist">
                    <p
                        className="navItem"
                        onClick={() => router("/aljk23")}
                    >
                        Join as Guest
                    </p>

                    <p
                        className="navItem"
                        onClick={() => router("/auth")}
                    >
                        Register
                    </p>

                    <div
                        className="navButton"
                        role="button"
                        onClick={() => router("/auth")}
                    >
                        Login
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <div className="landingMainContainer">
                <div className="landingText">
                    <h1>
                        <span className="highlight">Connect</span> with your loved ones
                    </h1>

                    <p>
                        Bridge the distance with seamless, secure video calls.
                    </p>

                    <div className="ctaButton" role="button">
                        <Link to="/auth">Get Started</Link>
                    </div>
                </div>

                <div className="landingImage">
                    <img src="/mobile.png" alt="Video Call App Preview" />
                </div>
            </div>
        </div>
    )
}
