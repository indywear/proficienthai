"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

interface DashboardData {
    user: {
        thaiName: string;
        chineseName: string;
        level: number;
        totalPoints: number;
        progressToNextLevel: number;
        pointsToNextLevel: number;
    };
    tasks: {
        total: number;
        completed: number;
        pending: number;
        activeTasks: Array<{
            id: string;
            weekNumber: number;
            title: string;
            deadline: string;
        }>;
    };
    submissions: {
        total: number;
        onTime: number;
        averageScore: number;
        recent: Array<{
            id: string;
            taskTitle: string;
            weekNumber: number;
            score: number;
            onTime: boolean;
            submittedAt: string;
        }>;
    };
    practice: {
        totalSessions: number;
        accuracy: number;
        vocabularyLearned: number;
    };
    badges: Array<{
        type: string;
        name: string;
        nameThai: string;
        earnedAt: string;
    }>;
    feedbackRequests: number;
}

function DashboardContent() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setError("กรุณาเข้าผ่าน LINE เพื่อดู Dashboard");
            setLoading(false);
            return;
        }

        fetch(`/api/dashboard?userId=${userId}`)
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    setError(json.error);
                } else {
                    setData(json);
                }
                setLoading(false);
            })
            .catch(() => {
                setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
                setLoading(false);
            });
    }, [userId]);

    if (loading) {
        return (
            <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
                <div style={{
                    width: "48px",
                    height: "48px",
                    border: "4px solid #E0E0E0",
                    borderTopColor: "#4CAF50",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    margin: "0 auto"
                }} />
                <p style={{ marginTop: "16px", color: "#666" }}>กำลังโหลด...</p>
                <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
                <div style={{
                    width: "64px",
                    height: "64px",
                    background: "#FFEBEE",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px"
                }}>
                    <span style={{ fontSize: "24px" }}>!</span>
                </div>
                <p style={{ color: "#666" }}>{error}</p>
                <Link
                    href="/"
                    style={{
                        color: "#4CAF50",
                        textDecoration: "none",
                        marginTop: "16px",
                        display: "inline-block"
                    }}
                >
                    กลับหน้าหลัก
                </Link>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="container" style={{ padding: "24px 20px", maxWidth: "1000px" }}>
            {/* Header */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "32px"
            }}>
                <div>
                    <h1 style={{ marginBottom: "4px" }}>
                        สวัสดี, {data.user.thaiName}
                    </h1>
                    <p style={{ color: "#666" }}>
                        {data.user.chineseName}
                    </p>
                </div>
                <div className="level-badge">
                    {data.user.level}
                </div>
            </div>

            {/* Level Progress */}
            <div className="card" style={{ marginBottom: "24px" }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px"
                }}>
                    <h3>Level {data.user.level}</h3>
                    <span style={{ color: "#666", fontSize: "0.875rem" }}>
                        {data.user.totalPoints} แต้ม
                    </span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${data.user.progressToNextLevel}%` }}
                    />
                </div>
                <p style={{
                    fontSize: "0.875rem",
                    color: "#999",
                    marginTop: "8px"
                }}>
                    อีก {data.user.pointsToNextLevel} แต้ม ถึง Level {data.user.level + 1}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid" style={{ marginBottom: "24px" }}>
                <div className="stat-card">
                    <div className="stat-value">{data.tasks.completed}/{data.tasks.total}</div>
                    <div className="stat-label">ภาระงานที่ส่งแล้ว</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{data.submissions.averageScore}</div>
                    <div className="stat-label">คะแนนเฉลี่ย</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{data.practice.vocabularyLearned}</div>
                    <div className="stat-label">คำศัพท์ที่เรียน</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{data.feedbackRequests}</div>
                    <div className="stat-label">ขอ Feedback</div>
                </div>
            </div>

            {/* Badges */}
            {data.badges.length > 0 && (
                <div className="card" style={{ marginBottom: "24px" }}>
                    <h3 style={{ marginBottom: "16px" }}>Badge ที่ได้รับ</h3>
                    <div className="badge-list">
                        {data.badges.map((badge) => (
                            <span key={badge.type} className="badge">
                                {badge.nameThai}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Submissions */}
            <div className="card" style={{ marginBottom: "24px" }}>
                <h3 style={{ marginBottom: "16px" }}>งานที่ส่งล่าสุด</h3>
                {data.submissions.recent.length > 0 ? (
                    <div style={{ overflowX: "auto" }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>สัปดาห์</th>
                                    <th>ภาระงาน</th>
                                    <th>คะแนน</th>
                                    <th>สถานะ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.submissions.recent.map((sub) => (
                                    <tr key={sub.id}>
                                        <td>{sub.weekNumber}</td>
                                        <td>{sub.taskTitle}</td>
                                        <td>{sub.score}/100</td>
                                        <td>
                                            <span className={`status ${sub.onTime ? "status-success" : "status-warning"}`}>
                                                {sub.onTime ? "ตรงเวลา" : "ล่าช้า"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p style={{ color: "#999", textAlign: "center", padding: "24px 0" }}>
                        ยังไม่มีงานที่ส่ง
                    </p>
                )}
            </div>

            {/* Active Tasks */}
            {data.tasks.activeTasks.length > 0 && (
                <div className="card">
                    <h3 style={{ marginBottom: "16px" }}>ภาระงานปัจจุบัน</h3>
                    {data.tasks.activeTasks.map((task) => (
                        <div
                            key={task.id}
                            style={{
                                padding: "16px",
                                background: "#F8FAF9",
                                borderRadius: "12px",
                                marginBottom: "12px"
                            }}
                        >
                            <div style={{ fontWeight: "600", marginBottom: "4px" }}>
                                สัปดาห์ที่ {task.weekNumber}: {task.title}
                            </div>
                            <div style={{ fontSize: "0.875rem", color: "#666" }}>
                                กำหนดส่ง: {new Date(task.deadline).toLocaleDateString("th-TH", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function DashboardPage() {
    return (
        <main style={{ minHeight: "100vh", background: "#F8FAF9" }}>
            {/* Navigation */}
            <nav className="nav">
                <div className="container nav-content">
                    <Link href="/" className="nav-brand">
                        ProficienThAI
                    </Link>
                    <div className="nav-links">
                        <Link href="/dashboard" className="nav-link active">Dashboard</Link>
                        <Link href="/leaderboard" className="nav-link">Leaderboard</Link>
                        <Link href="/tasks" className="nav-link">Tasks</Link>
                        <Link href="/about" className="nav-link">About</Link>
                    </div>
                </div>
            </nav>

            <Suspense fallback={
                <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
                    <p style={{ color: "#666" }}>กำลังโหลด...</p>
                </div>
            }>
                <DashboardContent />
            </Suspense>
        </main>
    );
}
