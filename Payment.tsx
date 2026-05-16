import { useState } from "react";
import CalcLayout from "@/components/CalcLayout";

function fmt(n: number) { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }); }

export default function Payment() {
  const [principal, setPrincipal] = useState("15000");
  const [rate, setRate] = useState("8");
  const [months, setMonths] = useState("48");
  const [result, setResult] = useState<null | { monthly: number; total: number; interest: number }>(null);

  function calculate() {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(months);
    if (r === 0) { const m = P / n; setResult({ monthly: m, total: m * n, interest: 0 }); return; }
    const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setResult({ monthly: M, total: M * n, interest: M * n - P });
  }

  const inputClass = "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <CalcLayout title="Payment Calculator" description="Find the monthly payment required for any loan amount." breadcrumbs={[{ label: "Financial", path: "/financial" }, { label: "Payment" }]}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div><label className={labelClass}>Loan Amount ($)</label><input type="number" className={inputClass} value={principal} onChange={e => setPrincipal(e.target.value)} /></div>
          <div><label className={labelClass}>Annual Interest Rate (%)</label><input type="number" step="0.01" className={inputClass} value={rate} onChange={e => setRate(e.target.value)} /></div>
          <div><label className={labelClass}>Loan Term (months)</label><input type="number" className={inputClass} value={months} onChange={e => setMonths(e.target.value)} /></div>
          <button onClick={calculate} className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity">Calculate Payment</button>
        </div>
        {result && (
          <div className="space-y-3">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
              <p className="text-xs text-muted-foreground mb-1">Monthly Payment</p>
              <p className="text-4xl font-black text-primary">{fmt(result.monthly)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-xl p-4"><p className="text-xs text-muted-foreground">Total Interest</p><p className="text-lg font-bold">{fmt(result.interest)}</p></div>
              <div className="bg-card border border-border rounded-xl p-4"><p className="text-xs text-muted-foreground">Total Payment</p><p className="text-lg font-bold">{fmt(result.total)}</p></div>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
