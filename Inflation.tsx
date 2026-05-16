import { useState } from "react";
import CalcLayout from "@/components/CalcLayout";

function fmt(n: number) { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }); }

export default function Inflation() {
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("3");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState<null | { future: number; loss: number; purchasing: number }>(null);

  function calculate() {
    const A = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const future = A * Math.pow(1 + r, t);
    const purchasing = A / Math.pow(1 + r, t);
    setResult({ future, loss: future - A, purchasing });
  }

  const inputClass = "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <CalcLayout title="Inflation Calculator" description="See how inflation affects the value of money over time." breadcrumbs={[{ label: "Financial", path: "/financial" }, { label: "Inflation" }]}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div><label className={labelClass}>Amount ($)</label><input type="number" className={inputClass} value={amount} onChange={e => setAmount(e.target.value)} /></div>
          <div><label className={labelClass}>Annual Inflation Rate (%)</label><input type="number" step="0.1" className={inputClass} value={rate} onChange={e => setRate(e.target.value)} /></div>
          <div><label className={labelClass}>Years</label><input type="number" className={inputClass} value={years} onChange={e => setYears(e.target.value)} /></div>
          <button onClick={calculate} className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity">Calculate</button>
        </div>
        {result && (
          <div className="space-y-3">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
              <p className="text-xs text-muted-foreground mb-1">Future equivalent of {fmt(parseFloat(amount))} today</p>
              <p className="text-4xl font-black text-primary">{fmt(result.future)}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground">Purchasing power of {fmt(parseFloat(amount))} in {years} years</p>
              <p className="text-2xl font-bold text-rose-500">{fmt(result.purchasing)}</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              At {rate}% annual inflation, {fmt(parseFloat(amount))} today will cost {fmt(result.future)} in {years} years — a {((result.future/parseFloat(amount)-1)*100).toFixed(1)}% increase.
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
