"use client";

import { useState } from "react";
import { supabase } from "./lib/supabase";

export default function CustomerHome() {
  const [license, setLicense] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Express Wash");
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  const services = [
    {
      name: "Express Wash",
      desc: "High-pressure exterior wash, snow foam bath, and microfiber hand dry. Perfect for regular maintenance.",
      price: "KSH 500",
      img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Interior Deep Clean",
      desc: "Complete vacuum, upholstery extraction, leather conditioning, and dashboard UV protection.",
      price: "KSH 1,500",
      img: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "The Executive Detail",
      desc: "Full interior and exterior restoration including engine bay cleaning, clay bar treatment, and premium wax.",
      price: "KSH 3,000",
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
    }
  ];

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("bookings")
      .insert([{ license_plate: license, service_type: service, phone: phone }]);

    if (error) {
      alert("Booking failed: " + error.message);
    } else {
      setBooked(true);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#090d16] font-sans text-slate-100 selection:bg-teal-500 selection:text-slate-950">
      
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 p-6 md:p-10 flex justify-between items-center text-white">
        <div className="font-extrabold text-2xl tracking-tighter uppercase flex items-center gap-2">
          Mimi's <span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block"></span>
        </div>
        <div className="text-sm font-medium tracking-wide hidden md:block text-slate-300">
          Magadi Road, Ongata Rongai • Open 7AM - 6PM
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[85vh] min-h-[600px] w-full flex items-end pb-20 px-6 md:px-20">
        <div className="absolute inset-0 bg-slate-950 z-10 opacity-50"></div>
        <img 
          src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=2000" 
          alt="Premium Auto Spa" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 max-w-4xl">
          <div className="inline-block text-teal-400 font-semibold tracking-widest text-xs uppercase mb-4 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full">
            Ongata Rongai's Premier Auto Spa & Cafe
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-6">
            Precision care.<br />Zero waiting.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 font-light max-w-xl">
            Drop your keys, grab an espresso in our lounge, and let us restore your vehicle while you relax.
          </p>
          <button 
            onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#ea580c] hover:bg-[#d946ef] text-white font-bold py-4 px-10 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-orange-600/30"
          >
            Book Your Spot
          </button>
        </div>
      </div>

      {/* Services Section */}
      <div className="px-6 md:px-20 py-24 max-w-[1600px] mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Our Services</h2>
          <p className="text-slate-400 text-lg max-w-md">Professional detailing designed to protect your investment and turn heads on Magadi Road.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {services.map((svc) => (
            <div key={svc.name} className="group cursor-pointer">
              <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-2xl mb-6 bg-slate-900 border border-white/5">
                <img 
                  src={svc.img} 
                  alt={svc.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-teal-400 transition-colors">{svc.name}</h3>
                <span className="font-semibold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full text-sm">{svc.price}</span>
              </div>
              <p className="text-slate-400 leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Section */}
      <div id="booking-section" className="bg-[#0e1626] border-t border-white/5 text-white py-24 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Join the Queue</h2>
            <p className="text-slate-400 text-lg">Secure your slot instantly. We'll text your phone when your vehicle is ready.</p>
          </div>

          {booked ? (
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-3xl p-12 text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-950 font-bold text-2xl">
                ✓
              </div>
              <h3 className="text-3xl font-bold mb-4 text-teal-300">You're on the list!</h3>
              <p className="text-slate-300 text-lg mb-8">Head over to Magadi Road. We'll text you at <strong className="text-white">{phone}</strong> when your car is ready.</p>
              <button onClick={() => setBooked(false)} className="text-sm font-semibold tracking-wider uppercase text-teal-400 hover:underline">
                Book another vehicle
              </button>
            </div>
          ) : (
            <form onSubmit={submitBooking} className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
              <div className="grid md:grid-cols-2 gap-8">
                
                <div className="space-y-3">
                  <label className="text-xs font-bold text-teal-400 uppercase tracking-widest">License Plate</label>
                  <input 
                    type="text" 
                    required
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    className="w-full bg-slate-950/80 border-b-2 border-slate-700 p-4 text-white uppercase placeholder-slate-600 focus:border-teal-400 outline-none transition-colors rounded-t-lg"
                    placeholder="KCD 123G"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-teal-400 uppercase tracking-widest">Phone Number</label>
                  <input 
                    type="text" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950/80 border-b-2 border-slate-700 p-4 text-white placeholder-slate-600 focus:border-teal-400 outline-none transition-colors rounded-t-lg"
                    placeholder="0712 345 678"
                  />
                </div>

                <div className="space-y-4 md:col-span-2 mt-4">
                  <label className="text-xs font-bold text-teal-400 uppercase tracking-widest">Select Your Service</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {services.map((svc) => (
                      <label 
                        key={svc.name} 
                        className={`cursor-pointer border-2 rounded-2xl p-5 transition-all ${
                          service === svc.name 
                            ? "bg-teal-500/10 border-teal-400 text-white shadow-lg shadow-teal-500/10" 
                            : "border-slate-800 bg-slate-950/40 hover:border-slate-700 text-slate-300"
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="service" 
                          value={svc.name} 
                          checked={service === svc.name}
                          onChange={(e) => setService(e.target.value)}
                          className="hidden" 
                        />
                        <div className="font-bold mb-1">{svc.name}</div>
                        <div className={`text-sm ${service === svc.name ? "text-teal-400 font-semibold" : "text-slate-400"}`}>{svc.price}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="md:col-span-2 mt-8 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold py-5 rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99] text-lg w-full flex justify-center items-center gap-3 shadow-xl shadow-orange-900/30"
                >
                  {loading ? "Confirming..." : "Complete Booking"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

    </main>
  );
}