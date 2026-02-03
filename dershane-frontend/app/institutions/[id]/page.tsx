"use client";
import { useEffect, useState, use } from "react";

export default function InstitutionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Kurum ID'sini URL'den alıyoruz
  const [students, setStudents] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fetchStudents = async () => {
    const res = await fetch(`http://localhost:8081/api/students/institution/${id}`);
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => { fetchStudents(); }, [id]);

  const addStudent = async (e: any) => {
    e.preventDefault();
    await fetch("http://localhost:8081/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        firstName, 
        lastName, 
        institution: { id: id } // Öğrenciyi bu kuruma bağlıyoruz
      }),
    });
    setFirstName(""); setLastName("");
    fetchStudents();
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-black">Kurum Öğrenci Yönetimi</h1>
      
      {/* Öğrenci Ekleme Formu */}
      <form onSubmit={addStudent} className="bg-white p-6 rounded shadow-md mb-8 max-w-md">
        <h2 className="font-semibold mb-4 text-black">Yeni Öğrenci Kaydı</h2>
        <input className="w-full p-2 border mb-2 rounded text-black" placeholder="Ad" value={firstName} onChange={e => setFirstName(e.target.value)} />
        <input className="w-full p-2 border mb-4 rounded text-black" placeholder="Soyad" value={lastName} onChange={e => setLastName(e.target.value)} />
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Öğrenciyi Kaydet</button>
      </form>

      {/* Öğrenci Listesi */}
      <div className="bg-white p-6 rounded shadow-md text-black">
        <h2 className="font-semibold mb-4">Mevcut Öğrenciler</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Ad Soyad</th>
              <th className="py-2 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s: any) => (
              <tr key={s.id} className="border-b">
                <td className="py-3">{s.firstName} {s.lastName}</td>
                <td className="py-3 text-right">
                    <button className="text-red-500 hover:underline">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length === 0 && <p className="mt-4 text-gray-500 text-center">Henüz öğrenci kaydı yok.</p>}
      </div>
    </div>
  );
}