import { useState } from "react";
import CalcLayout from "@/components/CalcLayout";

function fmt(n: number) { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }); }

export default function Finance() {
  const [solve, setSolve] = useState<"FV"|"PV"|"Rate"|"Period">("FV");
  const [pv, setPv] = useState("10000");
  const [fv, setFv] = useState("20000");
  const [rate, setRate] = useState("7");
  const [periods, setPeriods] = useState("10");
  const [result, setResult] = useState<string|null>(null);

  function calculate() {
    const PV = parseFloat(pv);
    const FV = parseFloat(fv);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(periods);
    switch (solve) {
      case "FV": setResult(fmt(PV * Math.pow(1 + r, n))); break;
      case "PV": setResult(fmt(FV / Math.pow(1 + r, n))); break;
      case "Rate": setResult(((Math.pow(FV / PV, 1 / n) - 1) * 100).toFixed(4) + "%"); break;
      case "Period": setResult((Math.log(FV / PV) / Math.log(1 + r)).toFixed(2) + " years"); break;
    }
  }

  const inputClass = "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <CalcLayout title="Finance Calculator" description="Solve for any time value of money variable (PV, FV, Rate, or Period)." breadcrumbs={[{ label: "Financial", path: "/financial" }, { label: "Finance" }]}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div>
            <label className={labelClass}>Solve For</label>
            <select className={inputClass} value={solve} onChange={e => setSolve(e.target.value as typeof solve)}>
              <option value="FV">Future Value (FV)</option>
              <option value="PV">Present Value (PV)</option>
              <option value="Rate">Interest Rate</option>
              <option value="Period">Number of Periods</option>
            </select>
          </div>
          {solve !== "PV" && <div><label className={labelClass}>Present Value ($)</label><input type="number" className={inputClass} value={pv} onChange={e => setPv(e.target.value)} /></div>}
          {solve !== "FV" && <div><label className={labelClass}>Future Value ($)</label><input type="number" className={inputClass} value={fv} onChange={e => setFv(e.target.value)} /></div>}
          {solve !== "Rate" && <div><label className={labelClass}>Annual Interest Rate (%)</label><input type="number" step="0.01" className={inputClass} value={rate} onChange={e => setRate(e.target.value)} /></div>}
          {solve !== "Period" && <div><label className={labelClass}>Number of Periods (years)</label><input type="number" className={inputClass} value={periods} onChange={e => setPeriods(e.target.value)} /></div>}
          <button onClick={calculate} className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity">Calculate</button>
        </div>
        {result && (
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 flex flex-col justify-center">
            <p className="text-xs text-muted-foreground mb-2">{solve === "FV" ? "Future Value" : solve === "PV" ? "Present Value" : solve === "Rate" ? "Interest Rate" : "Periods"}</p>
            <p className="text-5xl font-black text-primary">{result}</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
