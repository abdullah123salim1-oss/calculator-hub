import { useState } from "react";
import CalcLayout from "@/components/CalcLayout";

function fmt(n: number) { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }); }

export default function Amortization() {
  const [principal, setPrincipal] = useState("200000");
  const [rate, setRate] = useState("6");
  const [years, setYears] = useState("30");
  const [result, setResult] = useState<null | { monthly: number; schedule: { payment: number; interest: number; principal: number; balance: number }[] }>(null);

  function calculate() {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    const M = r === 0 ? P / n : P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    let balance = P;
    const schedule = [];
    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const prin = M - interest;
      balance -= prin;
      schedule.push({ payment: i, interest, principal: prin, balance: Math.max(0, balance) });
    }
    setResult({ monthly: M, schedule });
  }

  const inputClass = "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <CalcLayout title="Amortization Calculator" description="Generate a complete loan amortization schedule." breadcrumbs={[{ label: "Financial", path: "/financial" }, { label: "Amortization" }]}>
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div><label className={labelClass}>Loan Amount ($)</label><input type="number" className={inputClass} value={principal} onChange={e => setPrincipal(e.target.value)} /></div>
          <div><label className={labelClass}>Annual Rate (%)</label><input type="number" step="0.01" className={inputClass} value={rate} onChange={e => setRate(e.target.value)} /></div>
          <div><label className={labelClass}>Term (years)</label><input type="number" className={inputClass} value={years} onChange={e => setYears(e.target.value)} /></div>
        </div>
        <button onClick={calculate} className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity">Generate Schedule</button>
      </div>
      {result && (
        <div>
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-4">
            <p className="text-xs text-muted-foreground">Monthly Payment</p>
            <p className="text-3xl font-black text-primary">{fmt(result.monthly)}</p>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-xs">
                <thead className="bg-muted/50 sticky top-0">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Month</th>
                    <th className="text-right px-3 py-2 font-semibold text-muted-foreground">Principal</th>
                    <th className="text-right px-3 py-2 font-semibold text-muted-foreground">Interest</th>
                    <th className="text-right px-3 py-2 font-semibold text-muted-foreground">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.slice(0, 120).map((row) => (
                    <tr key={row.payment} className="border-t border-border hover:bg-muted/30">
                      <td className="px-3 py-1.5 text-muted-foreground">{row.payment}</td>
                      <td className="px-3 py-1.5 text-right text-emerald-600">{fmt(row.principal)}</td>
                      <td className="px-3 py-1.5 text-right text-rose-500">{fmt(row.interest)}</td>
                      <td className="px-3 py-1.5 text-right font-medium">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {result.schedule.length > 120 && <p className="text-xs text-center text-muted-foreground py-2">Showing first 120 months of {result.schedule.length}</p>}
          </div>
        </div>
      )}
    </CalcLayout>
  );
}
