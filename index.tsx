import { Link } from "wouter";
import CalcLayout from "@/components/CalcLayout";
import { DollarSign, Home, Car, TrendingUp, CreditCard, PiggyBank, BarChart2, LineChart, Activity, Calculator, Receipt, RefreshCw, Briefcase, Percent, ShoppingCart } from "lucide-react";

const calcs = [
  { name: "Mortgage Calculator", path: "/financial/mortgage", icon: Home, desc: "Calculate monthly mortgage payments and total interest." },
  { name: "Loan Calculator", path: "/financial/loan", icon: CreditCard, desc: "Determine monthly payments for any loan." },
  { name: "Auto Loan Calculator", path: "/financial/auto-loan", icon: Car, desc: "Estimate car loan payments and total cost." },
  { name: "Interest Calculator", path: "/financial/interest", icon: Percent, desc: "Calculate simple interest on a principal." },
  { name: "Payment Calculator", path: "/financial/payment", icon: CreditCard, desc: "Find the monthly payment for a given loan." },
  { name: "Retirement Calculator", path: "/financial/retirement", icon: PiggyBank, desc: "Project retirement savings over time." },
  { name: "Amortization Calculator", path: "/financial/amortization", icon: BarChart2, desc: "Generate a full loan amortization schedule." },
  { name: "Investment Calculator", path: "/financial/investment", icon: TrendingUp, desc: "Project the future value of investments." },
  { name: "Inflation Calculator", path: "/financial/inflation", icon: Activity, desc: "Adjust amounts for inflation over time." },
  { name: "Finance Calculator", path: "/financial/finance", icon: Calculator, desc: "General time value of money calculations." },
  { name: "Income Tax Calculator", path: "/financial/income-tax", icon: Receipt, desc: "Estimate US federal income tax owed." },
  { name: "Compound Interest", path: "/financial/compound-interest", icon: RefreshCw, desc: "See how compound interest grows over time." },
  { name: "Salary Calculator", path: "/financial/salary", icon: Briefcase, desc: "Convert salary between hourly, weekly, monthly, annual." },
  { name: "Interest Rate Calculator", path: "/financial/interest-rate", icon: LineChart, desc: "Solve for the interest rate of a loan." },
  { name: "Sales Tax Calculator", path: "/financial/sales-tax", icon: ShoppingCart, desc: "Calculate price after adding sales tax." },
];

export default function FinancialIndex() {
  return (
    <CalcLayout title="Financial Calculators" description="Tools to help you make smart money decisions.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {calcs.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.path} href={c.path} className="block border border-border rounded-xl p-4 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all bg-card">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Icon size={16} className="text-emerald-600" />
                </div>
                <span className="font-semibold text-sm text-foreground">{c.name}</span>
              </div>
              <p className="text-xs text-muted-foreground ml-10">{c.desc}</p>
            </Link>
          );
        })}
      </div>
    </CalcLayout>
  );
}
