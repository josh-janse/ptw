import {
  BookOpen,
  ChevronDown,
  Compass,
  Gift,
  GraduationCap,
  HelpCircle,
  House,
  LayoutGrid,
  Sparkles,
  Users,
} from "lucide-react";
import type { ComponentType } from "react";
import { Button } from "@/components/ui/button";

interface NavItem {
  active?: boolean;
  icon: ComponentType<{ className?: string }>;
  label: string;
}

const primaryNav: NavItem[] = [
  { label: "Home", icon: House, active: true },
  { label: "Groups", icon: Users },
  { label: "Rule of Life", icon: LayoutGrid },
  { label: "Reflection", icon: Compass },
];

const secondaryNav = [
  "Courses + Practices",
  "Leader Training",
  "Teaching Materials",
  "Giving",
];

interface Practice {
  // Whether the swatch is dark enough to need light text
  light?: boolean;
  name: string;
  // Theme color token (mapped in globals.css)
  swatch: string;
}

const practices: Practice[] = [
  { name: "Sabbath", swatch: "bg-sabbath", light: false },
  { name: "Prayer", swatch: "bg-prayer", light: false },
  { name: "Fasting", swatch: "bg-fasting", light: true },
  { name: "Solitude", swatch: "bg-solitude", light: true },
  { name: "Scripture", swatch: "bg-scripture", light: false },
  { name: "Community", swatch: "bg-community", light: true },
  { name: "Generosity", swatch: "bg-generosity", light: true },
  { name: "Witness", swatch: "bg-witness", light: true },
];

function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-58 shrink-0 flex-col border-sidebar-border border-r bg-sidebar px-4 py-6 md:flex">
      <div className="flex items-center gap-2 px-1.5">
        <span className="flex size-10 items-center justify-center rounded-full bg-[#684037] font-medium text-sm text-white">
          PW
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-sidebar-foreground text-sm">
            Practicing the Way
          </p>
          <p className="truncate text-muted-foreground text-xs">Apprentice</p>
        </div>
        <ChevronDown className="size-4 text-muted-foreground" />
      </div>

      <nav aria-label="Primary" className="mt-8 flex flex-col gap-1">
        {primaryNav.map(({ label, icon: Icon, active }) => (
          <a
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "flex items-center gap-2.5 rounded-xl bg-sidebar-accent p-1.5 font-medium text-sidebar-accent-foreground text-sm"
                : "flex items-center gap-2.5 rounded-xl p-1.5 font-medium text-sidebar-foreground text-sm transition-colors hover:bg-sidebar-accent"
            }
            href="/"
            key={label}
          >
            <span className="flex size-9 items-center justify-center">
              <Icon className="size-5" />
            </span>
            {label}
          </a>
        ))}
      </nav>

      <nav
        aria-label="Resources"
        className="mt-8 flex flex-col gap-1 border-sidebar-border border-t pt-6"
      >
        {secondaryNav.map((label) => (
          <a
            className="rounded-xl px-1.5 py-2 text-muted-foreground text-sm transition-colors hover:text-sidebar-foreground"
            href="/"
            key={label}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-6">
        <Button size="sm" variant="outline">
          <Gift /> Give
        </Button>
        <Button size="sm" variant="ghost">
          <HelpCircle /> Help
        </Button>
      </div>
    </aside>
  );
}

function FeatureCard() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-fasting p-8 text-white sm:p-10">
      <div className="relative z-10 max-w-md">
        <p className="font-medium text-sm text-white/70">Spiritual Health</p>
        <h2 className="mt-2 font-normal text-3xl leading-tight">
          Make space to prayerfully reflect on your apprenticeship to Jesus.
        </h2>
        <Button className="mt-6 bg-white text-foreground hover:bg-white/90">
          Begin Reflection
        </Button>
      </div>
      {/* Abstract orbital motif */}
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 size-64 rounded-full border border-white/15"
      />
      <div
        aria-hidden="true"
        className="absolute -top-4 -right-4 size-40 rounded-full border border-white/10"
      />
    </section>
  );
}

export default function Brand() {
  return (
    <div className="flex min-h-dvh w-full bg-background text-foreground">
      <Sidebar />

      <main className="mx-auto w-full max-w-7xl flex-auto px-5 py-8 sm:px-8">
        <header className="mb-8">
          <p className="font-medium text-muted-foreground text-sm">
            Brand Example
          </p>
          <h1 className="mt-1 font-normal text-4xl leading-tight">
            Welcome to Practicing the Way
          </h1>
          <p className="mt-3 max-w-prose text-lg text-muted-foreground leading-relaxed">
            A calm, contemplative system. Plus Jakarta Sans at regular weight,
            warm off-white surfaces, muted earthy accents, and a single salmon
            CTA color.
          </p>
        </header>

        <FeatureCard />

        {/* Practices */}
        <section className="mt-12">
          <h2 className="mb-4 flex items-center gap-2 font-normal text-2xl">
            <Sparkles className="size-5 text-primary" /> The Practices
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {practices.map(({ name, swatch, light }) => (
              <div
                className={`${swatch} ${
                  light ? "text-white" : "text-[#1a1a1a]"
                } flex aspect-square flex-col justify-between rounded-2xl p-4 shadow-[0px_30px_40px_-20px_#00000026]`}
                key={name}
              >
                <span
                  aria-hidden="true"
                  className="flex size-9 items-center justify-center rounded-full border border-current/30"
                >
                  <span className="size-2 rounded-full bg-current" />
                </span>
                <span className="font-medium text-base">{name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <section className="mt-12">
          <h2 className="mb-4 font-normal text-2xl">Buttons</h2>
          <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-card p-6 shadow-md">
            <Button>Start a Course</Button>
            <Button variant="secondary">Preview Resources</Button>
            <Button variant="outline">View / Edit</Button>
            <Button variant="ghost">Print</Button>
            <Button variant="destructive">Remove</Button>
            <Button variant="link">Learn more</Button>
            <Button size="sm" variant="outline">
              <BookOpen /> Small
            </Button>
            <Button size="icon" variant="outline">
              <GraduationCap />
              <span className="sr-only">Leader training</span>
            </Button>
          </div>
        </section>

        {/* Palette */}
        <section className="mt-12 mb-8">
          <h2 className="mb-4 font-normal text-2xl">Core Tokens</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: "background", className: "bg-background border" },
              { name: "card", className: "bg-card border" },
              { name: "primary", className: "bg-primary" },
              { name: "secondary", className: "bg-secondary" },
              { name: "muted", className: "bg-muted" },
              { name: "border", className: "bg-border" },
            ].map(({ name, className }) => (
              <div key={name}>
                <div className={`${className} h-16 rounded-xl`} />
                <p className="mt-1.5 text-muted-foreground text-xs">{name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
