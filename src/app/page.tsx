import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: "16px 20px",
        zIndex: 100,
      }}>
        <div className="container" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <Link href="/" style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "700",
            fontSize: "1.25rem",
          }}>
            ProficienThAI
          </Link>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="/leaderboard" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none" }}>
              Leaderboard
            </Link>
            <Link href="/tasks" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none" }}>
              Tasks
            </Link>
            <Link href="/about" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none" }}>
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
        color: "white",
        padding: "120px 20px 80px",
        textAlign: "center"
      }}>
        <div className="container">
          <div style={{ marginBottom: "24px" }}>
            <img
              src="/logo.svg"
              alt="ProficienThAI Logo"
              style={{ width: "80px", height: "80px", margin: "0 auto" }}
            />
          </div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "16px" }}>
            ProficienThAI
          </h1>
          <p style={{ fontSize: "1.25rem", opacity: 0.9, maxWidth: "600px", margin: "0 auto 32px" }}>
            นวัตกรรมแช็ตบอตปัญญาประดิษฐ์เพื่อยกระดับสมิทธิภาพการอ่านและการเขียนภาษาไทย
          </p>
          <p style={{ fontSize: "1rem", opacity: 0.8, marginBottom: "32px" }}>
            AI-Powered Thai Language Learning for Non-Native Speakers
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/dashboard"
              className="btn"
              style={{
                background: "white",
                color: "#2E7D32",
                padding: "12px 32px",
                borderRadius: "12px",
                fontWeight: "600",
                textDecoration: "none"
              }}
            >
              View Dashboard
            </Link>
            <a
              href="https://line.me/R/"
              className="btn"
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                padding: "12px 32px",
                borderRadius: "12px",
                fontWeight: "600",
                textDecoration: "none",
                border: "2px solid white"
              }}
            >
              Add LINE Bot
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "80px 20px", background: "#F8FAF9" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "48px" }}>
            หลักการทำงาน
          </h2>
          <div className="stats-grid" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            {/* Feature 1 */}
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{
                width: "64px",
                height: "64px",
                background: "#E8F5E9",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: "28px"
              }}>
                <img src="/icons/chat.svg" alt="Chat" style={{ width: "32px" }} />
              </div>
              <h3 style={{ marginBottom: "8px" }}>LINE Chatbot</h3>
              <p style={{ color: "#666", fontSize: "0.9375rem" }}>
                เรียนรู้ผ่านแอปพลิเคชัน LINE ที่คุ้นเคย
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{
                width: "64px",
                height: "64px",
                background: "#E3F2FD",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px"
              }}>
                <img src="/icons/feedback.svg" alt="Feedback" style={{ width: "32px" }} />
              </div>
              <h3 style={{ marginBottom: "8px" }}>AI Feedback</h3>
              <p style={{ color: "#666", fontSize: "0.9375rem" }}>
                รับผลป้อนกลับทันทีจาก AI เพื่อพัฒนาการเขียน
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{
                width: "64px",
                height: "64px",
                background: "#FFF3E0",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px"
              }}>
                <img src="/icons/trophy.svg" alt="Trophy" style={{ width: "32px" }} />
              </div>
              <h3 style={{ marginBottom: "8px" }}>Gamification</h3>
              <p style={{ color: "#666", fontSize: "0.9375rem" }}>
                สะสมแต้ม เลื่อนเลเวล รับ Badge ตลอดการเรียน
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "80px 20px", background: "white" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "48px" }}>
            ขั้นตอนการใช้งาน
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
              <div style={{
                width: "48px",
                height: "48px",
                background: "#4CAF50",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                flexShrink: 0
              }}>1</div>
              <div>
                <h4 style={{ marginBottom: "8px" }}>ลงทะเบียน</h4>
                <p style={{ color: "#666" }}>เพิ่ม ProficienThAI เป็นเพื่อนใน LINE และลงทะเบียนข้อมูลของคุณ</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
              <div style={{
                width: "48px",
                height: "48px",
                background: "#4CAF50",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                flexShrink: 0
              }}>2</div>
              <div>
                <h4 style={{ marginBottom: "8px" }}>รับภาระงาน</h4>
                <p style={{ color: "#666" }}>แช็ตบอตจะส่งภาระงานการอ่าน-เขียนให้ทุกสัปดาห์</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
              <div style={{
                width: "48px",
                height: "48px",
                background: "#4CAF50",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                flexShrink: 0
              }}>3</div>
              <div>
                <h4 style={{ marginBottom: "8px" }}>ขอผลป้อนกลับ</h4>
                <p style={{ color: "#666" }}>ส่งฉบับร่างเพื่อรับคำแนะนำจาก AI ก่อนส่งงานจริง</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
              <div style={{
                width: "48px",
                height: "48px",
                background: "#4CAF50",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                flexShrink: 0
              }}>4</div>
              <div>
                <h4 style={{ marginBottom: "8px" }}>ส่งงาน & สะสมแต้ม</h4>
                <p style={{ color: "#666" }}>ส่งงานตรงเวลาเพื่อรับแต้ม เลื่อนเลเวล และปลดล็อก Badge</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "#1A1A1A",
        color: "white",
        padding: "48px 20px",
        textAlign: "center"
      }}>
        <div className="container">
          <p style={{ fontWeight: "600", marginBottom: "16px" }}>ProficienThAI</p>
          <p style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "24px" }}>
            สถาบันวิจัยภาษาและวัฒนธรรมเอเชีย มหาวิทยาลัยมหิดล
          </p>
          <p style={{ fontSize: "0.75rem", opacity: 0.5 }}>
            © 2025 ProficienThAI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
