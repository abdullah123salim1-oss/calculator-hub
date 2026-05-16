import { useState } from "react";
import CalcLayout from "@/components/CalcLayout";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function fmt(n: number) { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }); }

export default function Investment() {
  const [initial, setInitial] = useState("10000");
  const [monthly, setMonthly] = useState("200");
  const [rate, setRate] = useState("8");
  const [years, setYears] = useState("20");
  const [result, setResult] = useState<null | { fv: number; contributions: number; growth: number; chartData: { year: number; Balance: number; Contributions: number }[] }>(null);

  function calculate() {
    const P = parseFloat(initial);
    const m = parseFloat(monthly);
    const r = parseFloat(rate) / 100 / 12;
    const yrs = parseFloat(years);
    const chartData = [];
    for (let y = 0; y <= yrs; y++) {
      const n = y * 12;
      const bal = P * Math.pow(1 + r, n) + (n > 0 && r > 0 ? m * (Math.pow(1 + r, n) - 1) / r : m * n);
      chartData.push({ year: y, Balance: Math.round(bal), Contributions: Math.round(P + m * n) });
    }
    const fv = chartData[chartData.length - 1].Balance;
    const contributions = P + m * yrs * 12;
    setResult({ fv, contributions, growth: fv - contributions, chartData });
  }

  const inputClass = "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <CalcLayout title="Investment Calculator" description="Project the future value of your investments." breadcrumbs={[{ label: "Financial", path: "/financial" }, { label: "Investment" }]}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div><label className={labelClass}>Initial Investment ($)</label><input type="number" className={inputClass} value={initial} onChange={e => setInitial(e.target.value)} /></div>
          <div><label className={labelClass}>Monthly Contribution ($)</label><input type="number" className={inputClass} value={monthly} onChange={e => setMonthly(e.target.value)} /></div>
          <div><label className={labelClass}>Annual Return (%)</label><input type="number" step="0.1" className={inputClass} value={rate} onChange={e => setRate(e.target.value)} /></div>
          <div><label className={labelClass}>Investment Period (years)</label><input type="number" className={inputClass} value={years} onChange={e => setYears(e.target.value)} /></div>
          <button onClick={calculate} className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity">Calculate</button>
        </div>
        {result && (
          <div className="space-y-3">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
              <p className="text-xs text-muted-foreground mb-1">Future Value</p>
              <p className="text-4xl font-black text-primary">{fmt(result.fv)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-xl p-4"><p className="text-xs text-muted-foreground">Total Invested</p><p className="text-lg font-bold">{fmt(result.contributions)}</p></div>
              <div className="bg-card border border-border rounded-xl p-4"><p className="text-xs text-muted-foreground">Returns</p><p className="text-lg font-bold text-emerald-600">{fmt(result.growth)}</p></div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-3">Portfolio Growth</p>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={result.chartData}>
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} tickFormatter={v => `Y${v}`} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => fmt(v)} labelFormatter={v => `Year ${v}`} />
                  <Area dataKey="Contributions" fill="hsl(var(--chart-2))" stroke="hsl(var(--chart-2))" fillOpacity={0.3} stackId="1" />
                  <Area dataKey="Balance" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" fillOpacity={0.2} stackId="2" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
