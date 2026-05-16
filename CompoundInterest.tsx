import { useState } from "react";
import CalcLayout from "@/components/CalcLayout";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

function fmt(n: number) { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }); }

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState("5000");
  const [rate, setRate] = useState("8");
  const [years, setYears] = useState("15");
  const [n, setN] = useState("12");
  const [result, setResult] = useState<null | { amount: number; interest: number; chartData: { year: number; Amount: number; Principal: number }[] }>(null);

  function calculate() {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const freq = parseFloat(n);
    const A = P * Math.pow(1 + r / freq, freq * t);
    const chartData = [];
    for (let y = 0; y <= t; y++) {
      chartData.push({ year: y, Amount: Math.round(P * Math.pow(1 + r / freq, freq * y)), Principal: Math.round(P) });
    }
    setResult({ amount: A, interest: A - P, chartData });
  }

  const inputClass = "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <CalcLayout title="Compound Interest Calculator" description="See the power of compound interest with A = P(1 + r/n)^(nt)." breadcrumbs={[{ label: "Financial", path: "/financial" }, { label: "Compound Interest" }]}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div><label className={labelClass}>Principal ($)</label><input type="number" className={inputClass} value={principal} onChange={e => setPrincipal(e.target.value)} /></div>
          <div><label className={labelClass}>Annual Rate (%)</label><input type="number" step="0.1" className={inputClass} value={rate} onChange={e => setRate(e.target.value)} /></div>
          <div><label className={labelClass}>Time (years)</label><input type="number" className={inputClass} value={years} onChange={e => setYears(e.target.value)} /></div>
          <div>
            <label className={labelClass}>Compounding Frequency</label>
            <select className={inputClass} value={n} onChange={e => setN(e.target.value)}>
              <option value="1">Annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
              <option value="365">Daily</option>
            </select>
          </div>
          <button onClick={calculate} className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity">Calculate</button>
        </div>
        {result && (
          <div className="space-y-3">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
              <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
              <p className="text-4xl font-black text-primary">{fmt(result.amount)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-xl p-4"><p className="text-xs text-muted-foreground">Principal</p><p className="text-lg font-bold">{fmt(parseFloat(principal))}</p></div>
              <div className="bg-card border border-border rounded-xl p-4"><p className="text-xs text-muted-foreground">Interest Earned</p><p className="text-lg font-bold text-emerald-600">{fmt(result.interest)}</p></div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-3">Growth Over Time</p>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={result.chartData}>
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} tickFormatter={v => `Y${v}`} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => fmt(v)} labelFormatter={v => `Year ${v}`} />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                  <Line dataKey="Amount" stroke="hsl(var(--primary))" dot={false} strokeWidth={2} />
                  <Line dataKey="Principal" stroke="hsl(var(--chart-2))" dot={false} strokeWidth={2} strokeDasharray="4 2" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
