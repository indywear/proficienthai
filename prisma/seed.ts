import { neon } from "@neondatabase/serverless";

// Use hardcoded connection string
const connectionString =
    "postgresql://neondb_owner:npg_F2GtcmHiRgV0@ep-long-sky-a1iwoau6-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

const sql = neon(connectionString);

// Sample Chinese-Thai Vocabulary
const chineseVocabulary = [
    { chineseWord: "广西", thaiMeaning: "กว่างซี", category: "สถานที่" },
    { chineseWord: "北京", thaiMeaning: "ปักกิ่ง", category: "สถานที่" },
    { chineseWord: "昆明", thaiMeaning: "คุนหมิง", category: "สถานที่" },
    { chineseWord: "你好", thaiMeaning: "สวัสดี", category: "ทักทาย" },
    { chineseWord: "谢谢", thaiMeaning: "ขอบคุณ", category: "ทักทาย" },
    { chineseWord: "对不起", thaiMeaning: "ขอโทษ", category: "ทักทาย" },
    { chineseWord: "没关系", thaiMeaning: "ไม่เป็นไร", category: "ทักทาย" },
    { chineseWord: "朋友", thaiMeaning: "เพื่อน", category: "คน" },
    { chineseWord: "我", thaiMeaning: "ผม/ฉัน", category: "คน" },
    { chineseWord: "你", thaiMeaning: "คุณ", category: "คน" },
    { chineseWord: "名字", thaiMeaning: "ชื่อ", category: "ทั่วไป" },
    { chineseWord: "认识", thaiMeaning: "รู้จัก", category: "ทั่วไป" },
    { chineseWord: "学习", thaiMeaning: "เรียน", category: "การศึกษา" },
    { chineseWord: "考试", thaiMeaning: "สอบ", category: "การศึกษา" },
    { chineseWord: "图书馆", thaiMeaning: "หอสมุด", category: "สถานที่" },
    { chineseWord: "食堂", thaiMeaning: "โรงอาหาร", category: "สถานที่" },
    { chineseWord: "宿舍", thaiMeaning: "หอพัก", category: "สถานที่" },
    { chineseWord: "大学", thaiMeaning: "มหาวิทยาลัย", category: "การศึกษา" },
    { chineseWord: "泰语", thaiMeaning: "ภาษาไทย", category: "ภาษา" },
    { chineseWord: "中文", thaiMeaning: "ภาษาจีน", category: "ภาษา" },
];

const fillBlankQuestions = [
    { sentence: "นักศึกษาเดินเข้า __________ ใหญ่ของมหาวิทยาลัยเพื่อทำพิธีรับปริญญา", answer: "หอประชุม" },
    { sentence: "การรำไทยเป็นส่วนหนึ่งของ __________ ที่สะท้อนเอกลักษณ์ของชาติ", answer: "นาฏศิลป์" },
    { sentence: "ตัวละครทศกัณฐ์เป็นหัวใจสำคัญในการแสดง __________ เรื่องรามเกียรติ์", answer: "โขน" },
    { sentence: "ผู้ชนะเลิศการประกวดร้องเพลงจะได้รับ __________ มูลค่าหนึ่งแสนบาท", answer: "เงินรางวัล" },
    { sentence: "เมื่อจบหลักสูตรระยะสั้น ผู้เรียนจะได้รับ __________ ทุกคน", answer: "ประกาศนียบัตร" },
    { sentence: "ผู้เข้าชมงานต้อง __________ หน้างานก่อนรับของที่ระลึก", answer: "ลงทะเบียน" },
    { sentence: "การเรียนรู้ __________ ที่สองจะช่วยให้เราติดต่อสื่อสารกับชาวต่างชาติได้ดีขึ้น", answer: "ภาษา" },
    { sentence: "การไหว้และการแต่งกายชุดไทยเป็นส่วนหนึ่งของ __________ ที่งดงาม", answer: "วัฒนธรรม" },
    { sentence: "การพูดในที่สาธารณะเป็น __________ ที่พนักงานทุกคนควรฝึกฝน", answer: "ทักษะ" },
    { sentence: "พ่อแม่รู้สึกภูมิใจมากที่เห็นลูกสวมชุด __________ ในวันรับปริญญาบัตร", answer: "ครุย" },
];

const wordOrderQuestions = [
    { shuffledWords: [{ number: 1, word: "เรา" }, { number: 2, word: "ไป" }, { number: 3, word: "มหิดล" }, { number: 4, word: "กัน" }], correctAnswer: "เราไปมหิดลกัน" },
    { shuffledWords: [{ number: 1, word: "ทุก" }, { number: 2, word: "คน" }, { number: 3, word: "จะ" }, { number: 4, word: "ได้รับ" }, { number: 5, word: "วุฒิบัตร" }], correctAnswer: "ทุกคนจะได้รับวุฒิบัตร" },
    { shuffledWords: [{ number: 1, word: "บัณฑิต" }, { number: 2, word: "สวม" }, { number: 3, word: "ชุด" }, { number: 4, word: "ครุย" }], correctAnswer: "บัณฑิตสวมชุดครุย" },
];

const sentenceConstructionPairs = [
    { word1: "หอประชุม", word2: "กิจกรรม" },
    { word1: "พู่กัน", word2: "เขียน" },
    { word1: "โขน", word2: "แสดง" },
    { word1: "ลงทะเบียน", word2: "เว็บไซต์" },
    { word1: "เงินรางวัล", word2: "ชนะ" },
    { word1: "วัฒนธรรม", word2: "เรียนรู้" },
    { word1: "บัณฑิต", word2: "ชุดครุย" },
    { word1: "หนวดเครา", word2: "โกน" },
];

async function main() {
    console.log("🌱 Starting seed with raw SQL...");

    // Seed Chinese Vocabulary
    console.log("📚 Seeding Chinese-Thai vocabulary...");
    for (const vocab of chineseVocabulary) {
        await sql`
            INSERT INTO "ChineseVocabulary" ("id", "chineseWord", "thaiMeaning", "category", "createdAt")
            VALUES (gen_random_uuid(), ${vocab.chineseWord}, ${vocab.thaiMeaning}, ${vocab.category}, now())
            ON CONFLICT ("chineseWord") DO NOTHING
        `;
    }
    console.log(`✅ Seeded ${chineseVocabulary.length} vocabulary items`);

    // Seed Fill-in-Blank Questions
    console.log("📝 Seeding fill-in-blank questions...");
    for (const q of fillBlankQuestions) {
        await sql`
            INSERT INTO "FillBlankQuestion" ("id", "sentence", "answer", "createdAt")
            VALUES (gen_random_uuid(), ${q.sentence}, ${q.answer}, now())
        `;
    }
    console.log(`✅ Seeded ${fillBlankQuestions.length} fill-in-blank questions`);

    // Seed Word Order Questions
    console.log("🔤 Seeding word-order questions...");
    for (const q of wordOrderQuestions) {
        await sql`
            INSERT INTO "WordOrderQuestion" ("id", "shuffledWords", "correctAnswer", "createdAt")
            VALUES (gen_random_uuid(), ${JSON.stringify(q.shuffledWords)}::jsonb, ${q.correctAnswer}, now())
        `;
    }
    console.log(`✅ Seeded ${wordOrderQuestions.length} word-order questions`);

    // Seed Sentence Construction Pairs
    console.log("✍️ Seeding sentence construction pairs...");
    for (const p of sentenceConstructionPairs) {
        await sql`
            INSERT INTO "SentenceConstructionPair" ("id", "word1", "word2", "createdAt")
            VALUES (gen_random_uuid(), ${p.word1}, ${p.word2}, now())
        `;
    }
    console.log(`✅ Seeded ${sentenceConstructionPairs.length} sentence pairs`);

    console.log("🎉 Seed completed successfully!");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
