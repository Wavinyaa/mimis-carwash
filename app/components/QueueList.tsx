"use client";

export default function QueueList({ 
  cars, 
  onUpdateStatus, 
  onDelete 
}: { 
  cars: any[], 
  onUpdateStatus: (id: string, status: string) => void,
  onDelete: (id: string) => void 
}) {
  
  if (cars.length === 0) {
    return <div className="p-12 text-center text-slate-500 border border-dashed border-slate-800 rounded-2xl">The lot is empty.</div>;
  }

  return (
    <div className="space-y-4">
      {cars.map((car) => (
        <div key={car.id} className="flex justify-between items-center bg-slate-900/40 p-5 rounded-2xl border border-white/5">
          <div>
            <p className="text-2xl font-bold text-white uppercase">{car.license_plate}</p>
            <p className="text-sm text-slate-400">{car.service_type} • {car.phone}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{car.status}</span>
            
            {car.status === 'queued' && (
              <button onClick={() => onUpdateStatus(car.id, 'washing')} className="bg-amber-500/20 text-amber-400 px-4 py-1.5 rounded-lg hover:bg-amber-500/30">Start</button>
            )}

            {car.status === 'washing' && (
              <button onClick={() => onUpdateStatus(car.id, 'completed')} className="bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-lg hover:bg-emerald-500/30">Complete</button>
            )}
            
            {car.status === 'completed' && (
              <button onClick={() => onDelete(car.id)} className="bg-red-500/20 text-red-400 px-4 py-1.5 rounded-lg hover:bg-red-500/30">Clear</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}