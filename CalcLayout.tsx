import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  path?: string;
}

interface CalcLayoutProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  children: React.ReactNode;
}

function AdSlot() {
  return (
    <div className="w-full rounded-xl bg-muted/60 border border-dashed border-border flex flex-col items-center justify-center gap-1 text-center" style={{ minHeight: 250 }}>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Advertisement</span>
      <span className="text-xs text-muted-foreground/40">300 × 250</span>
    </div>
  );
}

export default function CalcLayout({ title, description, breadcrumbs, children }: CalcLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-4 flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight size={12} />
              {b.path ? (
                <Link href={b.path} className="hover:text-foreground transition-colors">{b.label}</Link>
              ) : (
                <span className="text-foreground font-medium">{b.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex gap-6 items-start">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-foreground mb-1">{title}</h1>
          {description && <p className="text-muted-foreground text-sm mb-6">{description}</p>}
          {children}
        </div>
        <aside className="hidden lg:flex flex-col gap-4 w-[300px] shrink-0 sticky top-8">
          <AdSlot />
          <AdSlot />
        </aside>
      </div>
    </div>
  );
}
