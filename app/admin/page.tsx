"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

// Importing your new Lego blocks!
import IntakeForm from "../components/IntakeForm";
import QueueList from "../components/QueueList";

export default function AdminCommandCenter() {
  const [cars, setCars] = useState<any[]>([]);

  // The main page handles the data
  async function fetchQueue() {
    const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: true });
    if (data) setCars(data);
  }

  useEffect(() => {
    fetchQueue();
  }, []);

  async function updateStatus(id: string, newStatus: string) {
    await supabase.from("bookings").update({ status: newStatus }).eq("id", id);
    fetchQueue();
  }

  async function deleteCar(id: string) {
    await supabase.from("bookings").delete().eq("id", id);
    fetchQueue();
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto mt-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-8">Command Center</h1>
        
        {/* Lego Block 1: We hand it the fetchQueue function so it can refresh the page */}
        <IntakeForm onRefresh={fetchQueue} />

        <h2 className="text-lg font-semibold text-white mb-6">Active Queue</h2>
        
        {/* Lego Block 2: We hand it the list of cars and the buttons to update/delete */}
        <QueueList 
          cars={cars} 
          onUpdateStatus={updateStatus} 
          onDelete={deleteCar} 
        />
      </div>
    </main>
  );
}