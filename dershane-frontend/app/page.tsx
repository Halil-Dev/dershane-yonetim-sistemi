"use client";
import { useEffect, useState } from "react";
import Link from "next/link"; // Yönlendirme için bu kütüphaneyi ekledik

export default function Home() {
  const [name, setName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [institutions, setInstitutions] = useState([]);

  // Backend'den listeyi çeken fonksiyon
  const fetchInstitutions = async () => {
    const res = await fetch("http://localhost:8081/api/institutions");
    const data = await res.json();
    setInstitutions(data);
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  // Yeni dershane kaydeden fonksiyon
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch("http://localhost:8081/api/institutions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, taxNumber, active: true }),
    });
    setName("");
    setTaxNumber("");
    fetchInstitutions(); // Listeyi yenile
  };

  return (
    <main className="p-10 bg-gray-50 min-h-screen text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-900">Dershane Yönetim Paneli</h1>
        
        {/* Kayıt Formu */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-10 max-w-md border-t-4 border-blue-600">
          <h2 className="text-xl mb-4 font-semibold">Yeni Kurum Kaydı</h2>
          <div className="space-y-4">
            <input 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none" 
              placeholder="Dershane Adı" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <input 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none" 
              placeholder="Vergi Numarası" 
              value={taxNumber} 
              onChange={(e) => setTaxNumber(e.target.value)} 
            />
            <button className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 transition shadow">
              Kurumu Sisteme Ekle
            </button>
          </div>
        </form>

        {/* Liste */}
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold mb-2">Kayıtlı Kurumlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {institutions.map((inst: any) => (
              /* Link bileşeni ile her kartı tıklanabilir yaptık */
              <Link href={`/institutions/${inst.id}`} key={inst.id}>
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center cursor-pointer hover:border-blue-500 hover:shadow-md transition group">
                  <div>
                    <span className="block font-bold text-lg group-hover:text-blue-600">{inst.name}</span>
                    <span className="text-gray-500 text-sm italic">VKN: {inst.taxNumber}</span>
                  </div>
                  <div className="text-blue-500 font-semibold group-hover:translate-x-1 transition-transform">
                    Yönet →
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {institutions.length === 0 && (
            <div className="text-center p-10 bg-white rounded border border-dashed border-gray-300 text-gray-400">
              Henüz kayıtlı bir kurum bulunamadı.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}