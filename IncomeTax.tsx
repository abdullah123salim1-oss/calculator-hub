import { useState } from "react";
import CalcLayout from "@/components/CalcLayout";

function fmt(n: number) { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }); }

const brackets2024 = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

export default function IncomeTax() {
  const [income, setIncome] = useState("75000");
  const [filing, setFiling] = useState("single");
  const [result, setResult] = useState<null | { tax: number; effective: number; marginal: number; breakdown: { bracket: string; tax: number }[] }>(null);

  function calculate() {
    const inc = parseFloat(income);
    const deduction = filing === "single" ? 13850 : 27700;
    const taxable = Math.max(0, inc - deduction);
    let tax = 0;
    const breakdown = [];
    for (const b of brackets2024) {
      if (taxable <= b.min) break;
      const amt = Math.min(taxable, b.max) - b.min;
      const t = amt * b.rate;
      tax += t;
      breakdown.push({ bracket: `${(b.rate*100)}% (up to ${b.max === Infinity ? "+" : fmt(b.max)})`, tax: t });
    }
    const marginal = brackets2024.find(b => taxable > b.min && taxable <= b.max)?.rate ?? 0.37;
    setResult({ tax, effective: (tax / inc) * 100, marginal: marginal * 100, breakdown: breakdown.filter(b => b.tax > 0) });
  }

  const inputClass = "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <CalcLayout title="Income Tax Calculator" description="Estimate 2024 US federal income tax (standard deduction)." breadcrumbs={[{ label: "Financial", path: "/financial" }, { label: "Income Tax" }]}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div><label className={labelClass}>Annual Income ($)</label><input type="number" className={inputClass} value={income} onChange={e => setIncome(e.target.value)} /></div>
          <div>
            <label className={labelClass}>Filing Status</label>
            <select className={inputClass} value={filing} onChange={e => setFiling(e.target.value)}>
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
          <button onClick={calculate} className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity">Estimate Tax</button>
          <p className="text-xs text-muted-foreground">Estimates only. Does not include credits, deductions beyond standard, or state taxes.</p>
        </div>
        {result && (
          <div className="space-y-3">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
              <p className="text-xs text-muted-foreground mb-1">Estimated Tax</p>
              <p className="text-4xl font-black text-primary">{fmt(result.tax)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-xl p-4"><p className="text-xs text-muted-foreground">Effective Rate</p><p className="text-xl font-bold">{result.effective.toFixed(1)}%</p></div>
              <div className="bg-card border border-border rounded-xl p-4"><p className="text-xs text-muted-foreground">Marginal Rate</p><p className="text-xl font-bold">{result.marginal}%</p></div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Bracket Breakdown</p>
              <div className="space-y-1">
                {result.breakdown.map((b, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{b.bracket}</span>
                    <span className="font-semibold">{fmt(b.tax)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
