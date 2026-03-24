'use client' 

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client' 
import { PlusCircle, UsersRound } from 'lucide-react' 

// ====================================================================
// ส่วนกำหนดรูปแบบข้อมูล (Interface)
// ====================================================================

// โครงสร้างข้อมูลของ "กลุ่ม" ที่ดึงมาจากฐานข้อมูล
interface Group {
  id: string
  name: string
  description: string | null
  avatar_url: string | null // ที่อยู่ไฟล์รูปโปรไฟล์
  cover_url: string | null  // ที่อยู่ไฟล์รูปปก
  owner_id: string
}

// ====================================================================
// Component หลัก: หน้าแสดงกลุ่มของฉัน (MyGroupsPage)
// ====================================================================

export default function MyGroupsPage() {
  
  // --- 1. การจัดการข้อมูล (State) ---
  const [groups, setGroups] = useState<Group[]>([])   // เก็บรายการกลุ่ม
  const [loading, setLoading] = useState(true)        // สถานะกำลังโหลด
  const [error, setError] = useState('')              // ข้อความ Error
  const [userId, setUserId] = useState<string | null>(null) // รหัสผู้ใช้ปัจจุบัน

  // --- 2. โหลดข้อมูลเมื่อเข้าสู่หน้าเว็บ (Effect) ---
  useEffect(() => {
    const fetchUserAndGroups = async () => {
      setLoading(true) // เริ่มโหลด
      setError('')     // ล้าง Error เก่า
      
      // ขั้นตอนที่ 1: ตรวจสอบว่าผู้ใช้ล็อกอินหรือยัง
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError('คุณยังไม่ได้ล็อกอิน')
        setLoading(false)
        return
      }

      setUserId(user.id)

      // ขั้นตอนที่ 2: ดึงข้อมูลกลุ่มจากฐานข้อมูล
      // เงื่อนไข: เอาเฉพาะกลุ่มที่ owner_id ตรงกับ user.id (กลุ่มที่ฉันสร้างเอง)
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('owner_id', user.id) 
        .order('name', { ascending: true }) 

      if (error) {
        console.error('Error fetching my groups:', error.message)
        setError('เกิดข้อผิดพลาดในการโหลดกลุ่มของฉัน')
      } else {
        setGroups((data as Group[]) || [])
      }

      setLoading(false) // โหลดเสร็จสิ้น
    }

    fetchUserAndGroups()
  }, []) // ทำงานแค่ครั้งเดียวตอนเปิดหน้านี้

  // กำหนดรูปภาพเริ่มต้น (กรณีไม่มีรูป)
  const avatarPlaceholder = '/default-avatar.png'
  const coverPlaceholder = '/default-cover.png'

  // --- 3. ส่วนแสดงผลหน้าจอ (Render UI) ---
  return (
    <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center mt-20">
      
      {/* ส่วนหัวข้อหน้าเว็บ */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 shadow-lg mb-8 w-full max-w-6xl">
        <h1 className="text-4xl font-extrabold text-white tracking-tight text-center">
          🏠 กลุ่มของฉัน
        </h1>
        <p className="text-sky-100 mt-2 text-sm text-center">
          จัดการและดูแลกลุ่มที่คุณเป็นเจ้าของ
        </p>
      </div>

      {/* แสดงสถานะ Loading หรือ Error */}
      {loading && <p className="text-center text-gray-500">กำลังโหลด...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* ตารางแสดงรายการกลุ่ม (Grid Layout) */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
        
        {/* การ์ดปุ่ม "สร้างกลุ่มใหม่" */}
        <Link
          href="/create"
          className="w-52 h-60 rounded-2xl shadow-md flex flex-col items-center justify-center border-2 border-dashed border-sky-400 hover:border-sky-600 hover:scale-105 transform transition cursor-pointer bg-white"
        >
          <PlusCircle className="w-12 h-12 text-sky-500" />
          <span className="mt-4 text-lg font-semibold text-sky-700 text-center">
            สร้างกลุ่มใหม่
          </span>
        </Link>

        {/* วนลูปแสดงการ์ดกลุ่มแต่ละใบ */}
        {!loading && groups.map((group) => {
          
          // แปลง Path รูปโปรไฟล์เป็น URL ที่ใช้งานได้
          const { data: avatarData } = supabase.storage.from('groups').getPublicUrl(group.avatar_url || 'no-path');
          const avatarUrl = group.avatar_url ? avatarData.publicUrl : avatarPlaceholder;

          // แปลง Path รูปปกเป็น URL ที่ใช้งานได้
          const { data: coverData } = supabase.storage.from('groups').getPublicUrl(group.cover_url || 'no-path');
          const coverUrl = group.cover_url ? coverData.publicUrl : coverPlaceholder;

          return (
            <div
              key={group.id}
              className="w-52 h-60 rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition relative group/card"
            >
              {/* พื้นหลังรูปปก (Cover Image) */}
              <div
                className="absolute inset-0 bg-no-repeat bg-center transition-opacity duration-300 group-hover/card:opacity-80"
                style={{
                  backgroundImage: `url(${coverUrl})`,
                  backgroundSize: 'cover',
                }}
              ></div>
              
              {/* เลเยอร์สีดำจางๆ ทับพื้นหลัง */}
              <div className="absolute inset-0 bg-black/40"></div>
              
              {/* เนื้อหาภายในการ์ด */}
              <div className='relative flex flex-col items-center h-full pt-4'>
                
                {/* รูปโปรไฟล์กลุ่ม (วงกลม) */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {group.avatar_url ? (
                    <img src={avatarUrl} alt={group.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <UsersRound className="w-10 h-10 text-gray-600" />
                    </div>
                  )}
                </div>

                {/* ชื่อกลุ่ม */}
                <h2 className="mt-2 text-center text-white text-xl sm:text-2xl font-extrabold break-words line-clamp-2 p-2">
                  {group.name}
                </h2>

                {/* ปุ่มกดดูรายละเอียด */}
                <Link
                  href={`/groups/${group.id}`}
                  className="absolute bottom-4 w-40 text-center bg-sky-600 text-white py-2 rounded-xl font-medium hover:bg-sky-700 transition"
                >
                  ดูรายละเอียด
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* ข้อความเมื่อไม่มีกลุ่มเลย */}
      {!loading && groups.length === 0 && !error && (
        <p className="text-center text-gray-400 mt-10 text-lg">
          คุณยังไม่มีกลุ่มในระบบ
        </p>
      )}
    </div>
  )
}