"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Task {
    id: string;
    weekNumber: number;
    title: string;
    description: string;
    contentUrl: string;
    minWords: number;
    maxWords: number;
    deadline: string;
    isActive: boolean;
    _count: {
        submissions: number;
    };
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/tasks")
            .then((res) => res.json())
            .then((json) => {
                if (Array.isArray(json)) {
                    setTasks(json);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("th-TH", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const isExpired = (deadline: string) => {
        return new Date(deadline) < new Date();
    };

    return (
        <main style={{ minHeight: "100vh", background: "#F8FAF9" }}>
            <nav className="nav">
                <div className="container nav-content">
                    <Link href="/" className="nav-brand">ProficienThAI</Link>
                    <div className="nav-links">
                        <Link href="/dashboard" className="nav-link">Dashboard</Link>
                        <Link href="/leaderboard" className="nav-link">Leaderboard</Link>
                        <Link href="/tasks" className="nav-link active">Tasks</Link>
                        <Link href="/about" className="nav-link">About</Link>
                    </div>
                </div>
            </nav>

            <div className="container" style={{ padding: "32px 20px", maxWidth: "900px" }}>
                <h1 style={{ marginBottom: "8px" }}>ภาระงาน</h1>
                <p style={{ color: "#666", marginBottom: "32px" }}>
                    รายการภาระงานทั้งหมด
                </p>

                {loading ? (
                    <div style={{ textAlign: "center", padding: "48px 0" }}>
                        <p style={{ color: "#666" }}>กำลังโหลด...</p>
                    </div>
                ) : tasks.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "48px 0" }}>
                        <p style={{ color: "#666" }}>ยังไม่มีภาระงาน</p>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="card"
                                style={{
                                    opacity: isExpired(task.deadline) && !task.isActive ? 0.7 : 1,
                                }}
                            >
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "12px",
                                }}>
                                    <div>
                                        <span style={{
                                            display: "inline-block",
                                            padding: "4px 12px",
                                            background: task.isActive ? "#E8F5E9" : "#F5F5F5",
                                            color: task.isActive ? "#2E7D32" : "#666",
                                            borderRadius: "12px",
                                            fontSize: "0.75rem",
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                        }}>
                                            สัปดาห์ที่ {task.weekNumber}
                                        </span>
                                        <h3 style={{ marginBottom: "4px" }}>{task.title}</h3>
                                    </div>
                                    {task.isActive && (
                                        <span className="status status-success">เปิดรับ</span>
                                    )}
                                </div>

                                <p style={{
                                    color: "#666",
                                    marginBottom: "16px",
                                    lineHeight: "1.6",
                                }}>
                                    {task.description}
                                </p>

                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "16px",
                                    fontSize: "0.875rem",
                                    color: "#999",
                                }}>
                                    <div>
                                        <strong>กำหนดส่ง:</strong>{" "}
                                        <span style={{
                                            color: isExpired(task.deadline) ? "#F44336" : "#666"
                                        }}>
                                            {formatDate(task.deadline)}
                                        </span>
                                    </div>
                                    <div>
                                        <strong>ความยาว:</strong> {task.minWords}-{task.maxWords} คำ
                                    </div>
                                    <div>
                                        <strong>ส่งแล้ว:</strong> {task._count.submissions} คน
                                    </div>
                                </div>

                                {task.contentUrl && (
                                    <a
                                        href={task.contentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "inline-block",
                                            marginTop: "16px",
                                            padding: "8px 16px",
                                            background: "#4CAF50",
                                            color: "white",
                                            borderRadius: "8px",
                                            textDecoration: "none",
                                            fontSize: "0.875rem",
                                        }}
                                    >
                                        อ่านเนื้อหา
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
