import Link from "next/link";

export default function AboutPage() {
    return (
        <main style={{ minHeight: "100vh", background: "#F8FAF9" }}>
            <nav className="nav">
                <div className="container nav-content">
                    <Link href="/" className="nav-brand">ProficienThAI</Link>
                    <div className="nav-links">
                        <Link href="/dashboard" className="nav-link">Dashboard</Link>
                        <Link href="/leaderboard" className="nav-link">Leaderboard</Link>
                        <Link href="/tasks" className="nav-link">Tasks</Link>
                        <Link href="/about" className="nav-link active">About</Link>
                    </div>
                </div>
            </nav>

            <div className="container" style={{ padding: "32px 20px", maxWidth: "800px" }}>
                <h1 style={{ marginBottom: "32px" }}>เกี่ยวกับ ProficienThAI</h1>

                <div className="card" style={{ marginBottom: "24px" }}>
                    <h2 style={{ marginBottom: "16px", color: "#4CAF50" }}>นวัตกรรมแช็ตบอตปัญญาประดิษฐ์</h2>
                    <p style={{ color: "#666", lineHeight: "1.8", marginBottom: "16px" }}>
                        ProficienThAI เป็นนวัตกรรมแช็ตบอตปัญญาประดิษฐ์ที่พัฒนาขึ้นเพื่อยกระดับสมิทธิภาพการอ่านและการเขียนภาษาไทย
                        สำหรับนักศึกษาต่างชาติ โดยเฉพาะนักศึกษาจีนที่เรียนภาษาไทยเป็นภาษาที่สอง
                    </p>
                    <p style={{ color: "#666", lineHeight: "1.8" }}>
                        ระบบใช้เทคโนโลยี AI ล่าสุดในการวิเคราะห์งานเขียนและให้ผลป้อนกลับอย่างละเอียด
                        พร้อมระบบ Gamification ที่ช่วยสร้างแรงจูงใจในการเรียนรู้
                    </p>
                </div>

                <div className="card" style={{ marginBottom: "24px" }}>
                    <h2 style={{ marginBottom: "16px", color: "#4CAF50" }}>คุณสมบัติหลัก</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ display: "flex", gap: "16px" }}>
                            <div style={{
                                width: "48px",
                                height: "48px",
                                background: "#E8F5E9",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <span style={{ fontSize: "24px" }}>AI</span>
                            </div>
                            <div>
                                <h4 style={{ marginBottom: "4px" }}>AI Feedback</h4>
                                <p style={{ color: "#666", fontSize: "0.9375rem" }}>
                                    รับผลป้อนกลับทันทีจาก AI ตามเกณฑ์การประเมิน 5 ข้อ
                                </p>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "16px" }}>
                            <div style={{
                                width: "48px",
                                height: "48px",
                                background: "#E3F2FD",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <span style={{ fontSize: "20px" }}>LINE</span>
                            </div>
                            <div>
                                <h4 style={{ marginBottom: "4px" }}>LINE Chatbot</h4>
                                <p style={{ color: "#666", fontSize: "0.9375rem" }}>
                                    เรียนรู้ผ่านแอปพลิเคชัน LINE ที่คุ้นเคย ใช้งานง่าย
                                </p>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "16px" }}>
                            <div style={{
                                width: "48px",
                                height: "48px",
                                background: "#FFF3E0",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <span style={{ fontSize: "20px" }}>XP</span>
                            </div>
                            <div>
                                <h4 style={{ marginBottom: "4px" }}>Gamification</h4>
                                <p style={{ color: "#666", fontSize: "0.9375rem" }}>
                                    สะสมแต้ม เลื่อนเลเวล รับ Badge ตลอดการเรียน
                                </p>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "16px" }}>
                            <div style={{
                                width: "48px",
                                height: "48px",
                                background: "#F3E5F5",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <span style={{ fontSize: "20px" }}>Game</span>
                            </div>
                            <div>
                                <h4 style={{ marginBottom: "4px" }}>เกมฝึกภาษา</h4>
                                <p style={{ color: "#666", fontSize: "0.9375rem" }}>
                                    เกมคำศัพท์จีน-ไทย, เติมคำ, เรียงคำ, แต่งประโยค
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ marginBottom: "24px" }}>
                    <h2 style={{ marginBottom: "16px", color: "#4CAF50" }}>เกณฑ์การประเมิน</h2>
                    <p style={{ color: "#666", marginBottom: "16px" }}>
                        งานเขียนจะถูกประเมินตามเกณฑ์ 5 ข้อ (คะแนนเต็ม 20):
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {[
                            { name: "เนื้อหาและการนำเสนอ", desc: "ความตรงประเด็น ครบถ้วน มีตัวอย่างประกอบ" },
                            { name: "การลำดับความ", desc: "การจัดลำดับ นำ-เนื้อ-สรุป การเชื่อมโยงประโยค" },
                            { name: "ไวยากรณ์และโครงสร้าง", desc: "ความถูกต้องของไวยากรณ์ ความหลากหลายของประโยค" },
                            { name: "การเลือกใช้คำศัพท์", desc: "ความเหมาะสม ความหลากหลายของคำศัพท์" },
                            { name: "อักขระวิธีและการเว้นวรรค", desc: "การสะกดคำ วรรณยุกต์ การเว้นวรรค" },
                        ].map((item, i) => (
                            <div key={i} style={{
                                padding: "12px 16px",
                                background: "#F8FAF9",
                                borderRadius: "8px",
                            }}>
                                <div style={{ fontWeight: "600", marginBottom: "4px" }}>
                                    {i + 1}. {item.name}
                                </div>
                                <div style={{ color: "#666", fontSize: "0.875rem" }}>
                                    {item.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <h2 style={{ marginBottom: "16px", color: "#4CAF50" }}>หน่วยงานที่รับผิดชอบ</h2>
                    <p style={{ color: "#666", lineHeight: "1.8" }}>
                        สถาบันวิจัยภาษาและวัฒนธรรมเอเชีย<br />
                        มหาวิทยาลัยมหิดล<br /><br />
                        Research Institute for Languages and Cultures of Asia<br />
                        Mahidol University
                    </p>
                </div>
            </div>

            <footer style={{
                background: "#1A1A1A",
                color: "white",
                padding: "32px 20px",
                textAlign: "center",
                marginTop: "48px",
            }}>
                <p style={{ fontWeight: "600", marginBottom: "8px" }}>ProficienThAI</p>
                <p style={{ fontSize: "0.75rem", opacity: 0.5 }}>
                    &copy; 2025 ProficienThAI. All rights reserved.
                </p>
            </footer>
        </main>
    );
}
