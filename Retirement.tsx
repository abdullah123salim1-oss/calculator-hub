import { useState } from "react";
import CalcLayout from "@/components/CalcLayout";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function fmt(n: number) { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }); }

export default function Retirement() {
  const [current, setCurrent] = useState("50000");
  const [monthly, setMonthly] = useState("500");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("30");
  const [result, setResult] = useState<null | { final: number; contributions: number; growth: number; chartData: {year: number; Balance: number}[] }>(null);

  function calculate() {
    const P = parseFloat(current);
    const m = parseFloat(monthly);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    const fv = P * Math.pow(1 + r, n) + m * (Math.pow(1 + r, n) - 1) / r;
    const contributions = P + m * n;
    const chartData = [];
    for (let y = 0; y <= parseFloat(years); y++) {
      const mn = y * 12;
      const bal = P * Math.pow(1 + r, mn) + (mn > 0 ? m * (Math.pow(1 + r, mn) - 1) / r : 0);
      chartData.push({ year: y, Balance: Math.round(bal) });
    }
    setResult({ final: fv, contributions, growth: fv - contributions, chartData });
  }

  const inputClass = "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <CalcLayout title="Retirement Calculator" description="Project your retirement savings over time." breadcrumbs={[{ label: "Financial", path: "/financial" }, { label: "Retirement" }]}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div><label className={labelClass}>Current Savings ($)</label><input type="number" className={inputClass} value={current} onChange={e => setCurrent(e.target.value)} /></div>
          <div><label className={labelClass}>Monthly Contribution ($)</label><input type="number" className={inputClass} value={monthly} onChange={e => setMonthly(e.target.value)} /></div>
          <div><label className={labelClass}>Expected Annual Return (%)</label><input type="number" step="0.1" className={inputClass} value={rate} onChange={e => setRate(e.target.value)} /></div>
          <div><label className={labelClass}>Years Until Retirement</label><input type="number" className={inputClass} value={years} onChange={e => setYears(e.target.value)} /></div>
          <button onClick={calculate} className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity">Calculate</button>
        </div>
        {result && (
          <div className="space-y-3">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
              <p className="text-xs text-muted-foreground mb-1">Projected Balance</p>
              <p className="text-4xl font-black text-primary">{fmt(result.final)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-xl p-4"><p className="text-xs text-muted-foreground">Contributions</p><p className="text-lg font-bold">{fmt(result.contributions)}</p></div>
              <div className="bg-card border border-border rounded-xl p-4"><p className="text-xs text-muted-foreground">Investment Growth</p><p className="text-lg font-bold text-emerald-600">{fmt(result.growth)}</p></div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-3">Balance Over Time</p>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={result.chartData}>
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} tickFormatter={v => `Y${v}`} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => fmt(v)} labelFormatter={v => `Year ${v}`} />
                  <Line dataKey="Balance" stroke="hsl(var(--primary))" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
