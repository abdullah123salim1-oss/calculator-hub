import { useState } from "react";
import CalcLayout from "@/components/CalcLayout";

function fmt(n: number) { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }); }

export default function SalesTax() {
  const [price, setPrice] = useState("100");
  const [tax, setTax] = useState("8.25");
  const [result, setResult] = useState<null | { taxAmount: number; total: number; priceBeforeTax: number }>(null);
  const [mode, setMode] = useState<"add"|"reverse">("add");

  function calculate() {
    const p = parseFloat(price);
    const t = parseFloat(tax) / 100;
    if (mode === "add") {
      setResult({ priceBeforeTax: p, taxAmount: p * t, total: p * (1 + t) });
    } else {
      const before = p / (1 + t);
      setResult({ priceBeforeTax: before, taxAmount: p - before, total: p });
    }
  }

  const inputClass = "w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <CalcLayout title="Sales Tax Calculator" description="Calculate price with or without sales tax." breadcrumbs={[{ label: "Financial", path: "/financial" }, { label: "Sales Tax" }]}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setMode("add")} className={`py-2 rounded-lg text-sm font-medium transition-colors ${mode === "add" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>Add Tax</button>
            <button onClick={() => setMode("reverse")} className={`py-2 rounded-lg text-sm font-medium transition-colors ${mode === "reverse" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>Reverse Tax</button>
          </div>
          <div><label className={labelClass}>{mode === "add" ? "Price Before Tax ($)" : "Price Including Tax ($)"}</label><input type="number" step="0.01" className={inputClass} value={price} onChange={e => setPrice(e.target.value)} /></div>
          <div><label className={labelClass}>Tax Rate (%)</label><input type="number" step="0.01" className={inputClass} value={tax} onChange={e => setTax(e.target.value)} /></div>
          <button onClick={calculate} className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity">Calculate</button>
        </div>
        {result && (
          <div className="space-y-3">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
              <p className="text-xs text-muted-foreground mb-1">Total Price (with tax)</p>
              <p className="text-4xl font-black text-primary">{fmt(result.total)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-xl p-4"><p className="text-xs text-muted-foreground">Price Before Tax</p><p className="text-lg font-bold">{fmt(result.priceBeforeTax)}</p></div>
              <div className="bg-card border border-border rounded-xl p-4"><p className="text-xs text-muted-foreground">Tax Amount</p><p className="text-lg font-bold text-rose-500">{fmt(result.taxAmount)}</p></div>
            </div>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
