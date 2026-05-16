import { useState } from "react";
import CalcLayout from "@/components/CalcLayout";

function fmt(n: number) { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }); }

export default function Salary() {
  const [value, setValue] = useState("75000");
  const [from, setFrom] = useState("annual");
  const [hours, setHours] = useState("40");
  const [result, setResult] = useState<null | { hourly: number; daily: number; weekly: number; biweekly: number; monthly: number; annual: number }>(null);

  function calculate() {
    const v = parseFloat(value);
    const h = parseFloat(hours);
    let annual: number;
    switch (from) {
      case "hourly": annual = v * h * 52; break;
      case "daily": annual = v * 5 * 52; break;
      case "weekly": annual = v * 52; break;
      case "biweekly": annual = v * 26; break;
      case "monthly": annual = v * 12; break;
      default: annual = v;
    }
    setResult({
      hourly: annual / 52 / h,
      daily: annual / 52 / 5,
      weekly: annual / 52,
      biweekly: annual / 26,
      monthly: annual / 12,
      annual,
    });
  }

  const inputClass = "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <CalcLayout title="Salary Calculator" description="Convert salary between hourly, daily, weekly, biweekly, monthly, and annual." breadcrumbs={[{ label: "Financial", path: "/financial" }, { label: "Salary" }]}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div>
            <label className={labelClass}>Pay Period</label>
            <select className={inputClass} value={from} onChange={e => setFrom(e.target.value)}>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          <div><label className={labelClass}>Amount ($)</label><input type="number" step="0.01" className={inputClass} value={value} onChange={e => setValue(e.target.value)} /></div>
          <div><label className={labelClass}>Hours per Week</label><input type="number" className={inputClass} value={hours} onChange={e => setHours(e.target.value)} /></div>
          <button onClick={calculate} className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity">Convert</button>
        </div>
        {result && (
          <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
            {[
              ["Hourly", result.hourly],
              ["Daily", result.daily],
              ["Weekly", result.weekly],
              ["Biweekly", result.biweekly],
              ["Monthly", result.monthly],
              ["Annual", result.annual],
            ].map(([label, val]) => (
              <div key={label as string} className={`flex justify-between items-center py-2 border-b border-border last:border-0 ${label === from.charAt(0).toUpperCase() + from.slice(1) ? "font-bold text-primary" : ""}`}>
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-semibold">{fmt(val as number)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
