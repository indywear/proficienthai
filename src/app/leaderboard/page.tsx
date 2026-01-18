"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface LeaderboardEntry {
    rank: number;
    thaiName: string;
    chineseName: string;
    university: string;
    level: number;
    points: number;
    submissions: number;
    badges: number;
}

export default function LeaderboardPage() {
    const [data, setData] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/leaderboard")
            .then((res) => res.json())
            .then((json) => {
                if (Array.isArray(json)) {
                    setData(json);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <main style={{ minHeight: "100vh", background: "#F8FAF9" }}>
            <nav className="nav">
                <div className="container nav-content">
                    <Link href="/" className="nav-brand">ProficienThAI</Link>
                    <div className="nav-links">
                        <Link href="/dashboard" className="nav-link">Dashboard</Link>
                        <Link href="/leaderboard" className="nav-link active">Leaderboard</Link>
                        <Link href="/tasks" className="nav-link">Tasks</Link>
                        <Link href="/about" className="nav-link">About</Link>
                    </div>
                </div>
            </nav>

            <div className="container" style={{ padding: "32px 20px", maxWidth: "1000px" }}>
                <h1 style={{ marginBottom: "8px" }}>Leaderboard</h1>
                <p style={{ color: "#666", marginBottom: "32px" }}>
                    อันดับนักเรียนที่มีคะแนนสูงสุด
                </p>

                {loading ? (
                    <div style={{ textAlign: "center", padding: "48px 0" }}>
                        <p style={{ color: "#666" }}>กำลังโหลด...</p>
                    </div>
                ) : data.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "48px 0" }}>
                        <p style={{ color: "#666" }}>ยังไม่มีข้อมูล</p>
                    </div>
                ) : (
                    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ width: "60px" }}>อันดับ</th>
                                    <th>ชื่อ</th>
                                    <th>มหาวิทยาลัย</th>
                                    <th style={{ textAlign: "center" }}>Level</th>
                                    <th style={{ textAlign: "right" }}>แต้ม</th>
                                    <th style={{ textAlign: "center" }}>งานที่ส่ง</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((entry) => (
                                    <tr key={entry.rank}>
                                        <td>
                                            <span style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: "32px",
                                                height: "32px",
                                                borderRadius: "50%",
                                                background: entry.rank <= 3
                                                    ? entry.rank === 1 ? "#FFD700"
                                                    : entry.rank === 2 ? "#C0C0C0"
                                                    : "#CD7F32"
                                                    : "#F5F5F5",
                                                color: entry.rank <= 3 ? "#1A1A1A" : "#666",
                                                fontWeight: "600",
                                            }}>
                                                {entry.rank}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: "500" }}>{entry.thaiName}</div>
                                            <div style={{ fontSize: "0.875rem", color: "#999" }}>
                                                {entry.chineseName}
                                            </div>
                                        </td>
                                        <td style={{ color: "#666" }}>{entry.university}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <span className="level-badge" style={{
                                                width: "36px",
                                                height: "36px",
                                                fontSize: "1rem",
                                            }}>
                                                {entry.level}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: "right", fontWeight: "600", color: "#4CAF50" }}>
                                            {entry.points.toLocaleString()}
                                        </td>
                                        <td style={{ textAlign: "center" }}>{entry.submissions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
}
