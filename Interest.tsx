import { useState } from "react";
import CalcLayout from "@/components/CalcLayout";

function fmt(n: number) { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }); }

export default function Interest() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [time, setTime] = useState("3");
  const [result, setResult] = useState<null | { interest: number; total: number }>(null);

  function calculate() {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const I = P * r * t;
    setResult({ interest: I, total: P + I });
  }

  const inputClass = "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <CalcLayout title="Simple Interest Calculator" description="Calculate interest using the formula I = P × R × T." breadcrumbs={[{ label: "Financial", path: "/financial" }, { label: "Interest" }]}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div><label className={labelClass}>Principal Amount ($)</label><input type="number" className={inputClass} value={principal} onChange={e => setPrincipal(e.target.value)} /></div>
          <div><label className={labelClass}>Annual Rate (%)</label><input type="number" step="0.01" className={inputClass} value={rate} onChange={e => setRate(e.target.value)} /></div>
          <div><label className={labelClass}>Time (years)</label><input type="number" step="0.5" className={inputClass} value={time} onChange={e => setTime(e.target.value)} /></div>
          <button onClick={calculate} className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity">Calculate</button>
        </div>
        {result && (
          <div className="space-y-3">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
              <p className="text-xs text-muted-foreground mb-1">Interest Earned</p>
              <p className="text-4xl font-black text-primary">{fmt(result.interest)}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold">{fmt(result.total)}</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Formula: I = P × R × T</p>
              <p>I = {fmt(parseFloat(principal))} × {parseFloat(rate)/100} × {time} = {fmt(result.interest)}</p>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
