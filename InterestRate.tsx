import { useState } from "react";
import CalcLayout from "@/components/CalcLayout";

export default function InterestRate() {
  const [principal, setPrincipal] = useState("10000");
  const [payment, setPayment] = useState("200");
  const [months, setMonths] = useState("60");
  const [result, setResult] = useState<null | { rate: number; totalInterest: number }>(null);

  function calculate() {
    const P = parseFloat(principal);
    const M = parseFloat(payment);
    const n = parseFloat(months);
    // Newton-Raphson to solve for r
    let r = 0.01;
    for (let i = 0; i < 1000; i++) {
      const f = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) - M;
      const fp = P * (Math.pow(1+r,n)*(1+r*n) - Math.pow(1+r,n+1) + 1) / Math.pow(Math.pow(1+r,n)-1, 2);
      const rNew = r - f / fp;
      if (Math.abs(rNew - r) < 1e-10) break;
      r = rNew;
    }
    const annual = r * 12 * 100;
    setResult({ rate: annual, totalInterest: M * n - P });
  }

  const inputClass = "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <CalcLayout title="Interest Rate Calculator" description="Find the annual interest rate of a loan given its payment details." breadcrumbs={[{ label: "Financial", path: "/financial" }, { label: "Interest Rate" }]}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div><label className={labelClass}>Loan Amount ($)</label><input type="number" className={inputClass} value={principal} onChange={e => setPrincipal(e.target.value)} /></div>
          <div><label className={labelClass}>Monthly Payment ($)</label><input type="number" step="0.01" className={inputClass} value={payment} onChange={e => setPayment(e.target.value)} /></div>
          <div><label className={labelClass}>Loan Term (months)</label><input type="number" className={inputClass} value={months} onChange={e => setMonths(e.target.value)} /></div>
          <button onClick={calculate} className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity">Find Rate</button>
        </div>
        {result && (
          <div className="space-y-3">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
              <p className="text-xs text-muted-foreground mb-1">Annual Interest Rate</p>
              <p className="text-5xl font-black text-primary">{result.rate.toFixed(2)}%</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground">Total Interest Paid</p>
              <p className="text-2xl font-bold">{result.totalInterest.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
