"use client";
import { useEffect, useState } from "react";

export default function FirebaseTest() {
    const [config, setConfig] = useState({});

    useEffect(() => {
        setConfig({
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "✓ Set" : "✗ Missing",
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "✓ Set" : "✗ Missing",
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "✓ Set" : "✗ Missing",
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? "✓ Set" : "✗ Missing",
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? "✓ Set" : "✗ Missing",
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? "✓ Set" : "✗ Missing",
        });
    }, []);

    return (
        <div style={{ position: "fixed", bottom: 10, right: 10, background: "#1a1a2e", padding: "10px", borderRadius: "8px", fontSize: "12px", zIndex: 9999 }}>
            <h4 style={{ margin: 0, marginBottom: "5px", color: "#fff" }}>Firebase Config</h4>
            {Object.entries(config).map(([key, value]) => (
                <div key={key} style={{ color: value.includes("✓") ? "#4ade80" : "#f87171" }}>
                    {key}: {value}
                </div>
            ))}
        </div>
    );
}
