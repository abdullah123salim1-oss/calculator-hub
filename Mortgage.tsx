import { useState } from "react";
import CalcLayout from "@/components/CalcLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export default function Mortgage() {
  const [home, setHome] = useState("300000");
  const [down, setDown] = useState("60000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const [result, setResult] = useState<null | { monthly: number; total: number; interest: number; principal: number; chartData: { name: string; Principal: number; Interest: number }[] }>(null);

  function calculate() {
    const P = parseFloat(home) - parseFloat(down);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    if (r === 0) {
      const m = P / n;
      setResult({ monthly: m, total: m * n, interest: 0, principal: P, chartData: [] });
      return;
    }
    const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = M * n;
    const interest = total - P;
    const chartData = [];
    for (let y = 1; y <= Math.min(parseFloat(years), 30); y++) {
      let balance = P;
      let totalPrincipal = 0;
      let totalInterest = 0;
      for (let m = 0; m < 12; m++) {
        const int = balance * r;
        const prin = M - int;
        totalInterest += int;
        totalPrincipal += prin;
        balance -= prin;
      }
      chartData.push({ name: `Y${y}`, Principal: Math.round(totalPrincipal), Interest: Math.round(totalInterest) });
    }
    setResult({ monthly: M, total, interest, principal: P, chartData });
  }

  const inputClass = "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <CalcLayout title="Mortgage Calculator" description="Calculate your monthly mortgage payment and total interest." breadcrumbs={[{ label: "Financial", path: "/financial" }, { label: "Mortgage" }]}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div>
            <label className={labelClass}>Home Price ($)</label>
            <input data-testid="input-home-price" type="number" className={inputClass} value={home} onChange={e => setHome(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Down Payment ($)</label>
            <input data-testid="input-down" type="number" className={inputClass} value={down} onChange={e => setDown(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Annual Interest Rate (%)</label>
            <input data-testid="input-rate" type="number" step="0.01" className={inputClass} value={rate} onChange={e => setRate(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Loan Term (years)</label>
            <input data-testid="input-years" type="number" className={inputClass} value={years} onChange={e => setYears(e.target.value)} />
          </div>
          <button data-testid="btn-calculate" onClick={calculate} className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity">Calculate</button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
              <p className="text-xs text-muted-foreground mb-1">Monthly Payment</p>
              <p data-testid="result-monthly" className="text-4xl font-black text-primary">{fmt(result.monthly)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground">Loan Amount</p>
                <p className="text-lg font-bold text-foreground">{fmt(result.principal)}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground">Total Interest</p>
                <p className="text-lg font-bold text-foreground">{fmt(result.interest)}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 col-span-2">
                <p className="text-xs text-muted-foreground">Total Cost</p>
                <p className="text-lg font-bold text-foreground">{fmt(result.total)}</p>
              </div>
            </div>
            {result.chartData.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs font-semibold text-muted-foreground mb-3">Yearly Breakdown</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={result.chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => fmt(v)} />
                    <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="Principal" fill="hsl(var(--primary))" radius={[2,2,0,0]} />
                    <Bar dataKey="Interest" fill="hsl(var(--chart-2))" radius={[2,2,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
