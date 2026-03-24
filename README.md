# 🌐 Proximity Link

**Proximity Link** คือแพลตฟอร์มโซเชียลมีเดียที่เน้นการสร้างคอมมูนิตี้ (Groups) เพื่อให้ผู้ใช้สามารถแชร์เนื้อหา รูปภาพ วิดีโอ และจัดการกิจกรรมผ่านปฏิทินส่วนรวมได้อย่างมีประสิทธิภาพ พัฒนาด้วยเทคโนโลยีที่ทันสมัยและระบบ Real-time

---

## ✨ คุณสมบัติหลัก (Features)

### 👥 การจัดการกลุ่ม (Group Management)
* **Create & Edit Groups:** สร้างกลุ่มใหม่ กำหนดชื่อ คำอธิบาย พร้อมอัปโหลดรูปโปรไฟล์และรูปปกกลุ่ม
* **Join System:** ระบบติดตามกลุ่ม เพื่อรับข่าวสารล่าสุดใน Feed
* **Member Permissions:** เจ้าของกลุ่มสามารถกำหนดได้ว่า "อนุญาตให้สมาชิกโพสต์" หรือ "เฉพาะเจ้าของเท่านั้น"

### 📝 ระบบโพสต์และฟีด (Post & Feed)
* **Dynamic Feed:** หน้า Dashboard รวมโพสต์ล่าสุดจากทุกกลุ่มที่ผู้ใช้ติดตาม
* **Multimedia:** รองรับการโพสต์ข้อความ รูปภาพหลายรูป และวิดีโอ
* **Interactions:** ระบบกดถูกใจ (Like) และแสดงความคิดเห็น (Comment) แบบทันที
* **Media Modal:** เปิดดูรูปภาพและวิดีโอขนาดใหญ่ผ่าน Modal ที่สวยงาม

### 📅 ปฏิทินกิจกรรม (Group Calendar)
* **Event Scheduling:** เจ้าของกลุ่มสามารถเพิ่ม แก้ไข และลบกิจกรรม/วันสำคัญในปฏิทินได้
* **Detail View:** สมาชิกสามารถคลิกที่วันที่เพื่อดูรายละเอียดกิจกรรมในวันนั้นๆ
* **Visual Indicators:** แสดงจุดสีแจ้งเตือนจำนวนกิจกรรมบนปฏิทิน

### 🔐 ระบบสมาชิกและความปลอดภัย (Auth & Profile)
* **Authentication:** ระบบสมัครสมาชิก, เข้าสู่ระบบ และกู้คืนรหัสผ่านด้วย OTP ผ่านอีเมล (Supabase Auth)
* **Profile Management:** ผู้ใช้สามารถแก้ไขชื่อผู้ใช้ (Username) และรูปโปรไฟล์/หน้าปกของตนเองได้
* **Real-time Notifications:** แจ้งเตือนตัวเลขโพสต์ที่ยังไม่อ่าน (Unread Counter) ในแต่ละกลุ่มแบบเรียลไทม์

---

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)

* **Framework:** [Next.js](https://nextjs.org/) (App Router & Client Components)
* **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL & Realtime engine)
* **Authentication:** Supabase Auth (Email & OTP)
* **File Storage:** Supabase Storage (สำหรับจัดเก็บรูปภาพและวิดีโอ)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Calendar:** [React Calendar](https://www.npmjs.com/package/react-calendar)

---

## 🚀 การติดตั้งและใช้งาน (Setup & Installation)

1.  **Clone โปรเจกต์:**
    ```bash
    git clone [https://github.com/KanyadaSupan/proximity-link.git](https://github.com/KanyadaSupan/proximity-link.git)
    cd proximity-link
    ```

2.  **ติดตั้ง Dependencies:**
    ```bash
    npm install
    ```

3.  **ตั้งค่า Environment Variables:**
    สร้างไฟล์ `.env.local` และเพิ่มค่า Config ของ Supabase:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **รันโปรเจกต์:**
    ```bash
    npm run dev
    ```
    เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

---

## 📂 โครงสร้างโฟลเดอร์ที่สำคัญ

* `/app`: หน้าหลักของแอปพลิเคชัน (Dashboard, Profile, Group Detail, Auth)
* `/components`: ส่วนประกอบย่อย (PostCard, Calendar, Modals, Navbar)
* `/lib`: การตั้งค่า Supabase Client และ Hooks ต่างๆ
* `/types`: การกำหนด Type สำหรับ TypeScript

---

## 👤 ผู้พัฒนา
* **Nick** - Full-stack Developer
* **GitHub:** [@KanyadaSupan](https://github.com/KanyadaSupan)
* **Education:** Siam University (Digital Technology and Innovation)

---
Developed with ❤️ by Nick
