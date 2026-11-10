"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase"; // adjust dots if needed!

export default function IntakeForm({ onRefresh }: { onRefresh: () => void }) {
  const [license, setLicense] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Basic Wash");
  const [loading, setLoading] = useState(false);

  async function addCar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("bookings")
      .insert([{ license_plate: license, service_type: service, phone: phone }]);

    if (!error) {
      setLicense("");
      setPhone("");
      onRefresh(); // Tells the main page: "I added a car, go fetch the new data!"
    }
    setLoading(false);
  }

  return (
    <form onSubmit={addCar} className="bg-slate-900/50 rounded-2xl p-8 border border-white/5 mb-12">
      <div className="flex flex-col md:flex-row gap-6">
        <input 
          value={license} onChange={(e) => setLicense(e.target.value)} 
          placeholder="License Plate" required 
          className="bg-slate-950 p-3 rounded-xl text-white w-full border border-slate-800 focus:border-blue-500 outline-none"
        />
        <input 
          value={phone} onChange={(e) => setPhone(e.target.value)} 
          placeholder="Phone (e.g. 0712345678)" required 
          className="bg-slate-950 p-3 rounded-xl text-white w-full border border-slate-800 focus:border-blue-500 outline-none"
        />
        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all">
          {loading ? "Adding..." : "Log Vehicle"}
        </button>
      </div>
    </form>
  );
}