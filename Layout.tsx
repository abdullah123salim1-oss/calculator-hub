import { useState } from "react";
import { Link, useLocation } from "wouter";
import { DollarSign, Heart, Calculator, Grid3X3, Menu, X, ChevronDown, ChevronRight } from "lucide-react";

const categories = [
  {
    name: "Financial",
    path: "/financial",
    icon: DollarSign,
    color: "text-emerald-600",
    items: [
      { name: "Mortgage", path: "/financial/mortgage" },
      { name: "Loan", path: "/financial/loan" },
      { name: "Auto Loan", path: "/financial/auto-loan" },
      { name: "Interest", path: "/financial/interest" },
      { name: "Payment", path: "/financial/payment" },
      { name: "Retirement", path: "/financial/retirement" },
      { name: "Amortization", path: "/financial/amortization" },
      { name: "Investment", path: "/financial/investment" },
      { name: "Inflation", path: "/financial/inflation" },
      { name: "Finance", path: "/financial/finance" },
      { name: "Income Tax", path: "/financial/income-tax" },
      { name: "Compound Interest", path: "/financial/compound-interest" },
      { name: "Salary", path: "/financial/salary" },
      { name: "Interest Rate", path: "/financial/interest-rate" },
      { name: "Sales Tax", path: "/financial/sales-tax" },
    ],
  },
  {
    name: "Health & Fitness",
    path: "/health",
    icon: Heart,
    color: "text-rose-500",
    items: [
      { name: "BMI", path: "/health/bmi" },
      { name: "Calorie", path: "/health/calorie" },
      { name: "Body Fat", path: "/health/body-fat" },
      { name: "BMR", path: "/health/bmr" },
      { name: "Ideal Weight", path: "/health/ideal-weight" },
      { name: "Pace", path: "/health/pace" },
      { name: "Pregnancy", path: "/health/pregnancy" },
      { name: "Conception", path: "/health/conception" },
      { name: "Due Date", path: "/health/due-date" },
    ],
  },
  {
    name: "Math",
    path: "/math",
    icon: Calculator,
    color: "text-violet-600",
    items: [
      { name: "Scientific", path: "/math/scientific" },
      { name: "Fraction", path: "/math/fraction" },
      { name: "Percentage", path: "/math/percentage" },
      { name: "Random Number", path: "/math/random-number" },
      { name: "Triangle", path: "/math/triangle" },
      { name: "Std Deviation", path: "/math/standard-deviation" },
    ],
  },
  {
    name: "Other",
    path: "/other",
    icon: Grid3X3,
    color: "text-amber-600",
    items: [
      { name: "Age", path: "/other/age" },
      { name: "Date", path: "/other/date" },
      { name: "Time", path: "/other/time" },
      { name: "Hours", path: "/other/hours" },
      { name: "GPA", path: "/other/gpa" },
      { name: "Grade", path: "/other/grade" },
      { name: "Concrete", path: "/other/concrete" },
      { name: "Subnet", path: "/other/subnet" },
      { name: "Password", path: "/other/password" },
      { name: "Conversion", path: "/other/conversion" },
    ],
  },
];

function SidebarCategory({ cat, onClose }: { cat: typeof categories[0]; onClose?: () => void }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(location.startsWith(cat.path));
  const Icon = cat.icon;
  const isActive = location.startsWith(cat.path);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"}`}
      >
        <Icon size={16} className={cat.color} />
        <span className="flex-1 text-left">{cat.name}</span>
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>
      {open && (
        <div className="ml-6 mt-1 space-y-0.5">
          {cat.items.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={onClose}
              className={`block px-3 py-1.5 text-xs rounded-md transition-colors ${location === item.path ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-4 border-b border-border">
        <Link href="/" onClick={onClose} className="font-bold text-lg text-foreground leading-tight">
          Calculator<span className="text-primary">Hub</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
        >
          <Calculator size={16} className="text-primary" />
          Simple Calculator
        </Link>
        <div className="h-px bg-border my-2" />
        {categories.map((cat) => (
          <SidebarCategory key={cat.path} cat={cat} onClose={onClose} />
        ))}
      </nav>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="hidden md:flex flex-col w-60 border-r border-border bg-card shrink-0">
        <Sidebar />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 bg-card flex flex-col border-r border-border">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-md hover:bg-muted"
            >
              <X size={18} />
            </button>
            <Sidebar onClose={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-md hover:bg-muted">
            <Menu size={20} />
          </button>
          <span className="font-bold text-base">Calculator<span className="text-primary">Hub</span></span>
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
