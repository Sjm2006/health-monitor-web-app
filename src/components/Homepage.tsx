import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Calculator,
  BookOpen,
  BarChart3,
  AlertTriangle,
  Phone,
  Users,
  Droplets,
  ArrowRight,
  Shield,
} from "lucide-react";
import heroImage from "@/assets/health-hero.jpg";

interface HomepageProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { icon: Users, label: "Total Reports", value: "47", color: "text-primary" },
  { icon: AlertTriangle, label: "Active Alerts", value: "3", color: "text-warning" },
  { icon: Droplets, label: "Healthy Villages", value: "12", color: "text-emerald-600" },
  { icon: Shield, label: "Risk Level", value: "Medium", color: "text-amber-600", isBadge: true },
];

const actions = [
  {
    id: "calculator",
    icon: Calculator,
    label: "Risk Calculator",
    description: "Assess your household's water-borne disease risk based on symptoms and environment.",
    accent: "bg-primary/10 text-primary",
    cta: "Check your risk",
  },
  {
    id: "dashboard",
    icon: BarChart3,
    label: "Live Dashboard",
    description: "Real-time community health trends, village data, and outbreak patterns.",
    accent: "bg-teal-100 text-teal-700",
    cta: "View data",
  },
  {
    id: "awareness",
    icon: BookOpen,
    label: "Health Tips",
    description: "Prevention guides, ORS preparation, and disease information in English & Assamese.",
    accent: "bg-amber-100 text-amber-700",
    cta: "Learn more",
  },
  {
    id: "report",
    icon: Activity,
    label: "Report a Case",
    description: "Submit illness reports to help health authorities respond quickly.",
    accent: "bg-rose-100 text-rose-600",
    cta: "Report now",
  },
];

const Homepage = ({ onNavigate }: HomepageProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Nav ────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md gradient-primary flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-base font-medium">HealthWatch NE</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-danger border-danger/40 hover:bg-danger/5"
            onClick={() => window.open("tel:108")}
          >
            <Phone className="w-3.5 h-3.5 mr-1.5" />
            Emergency: 108
          </Button>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[520px] flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 gradient-hero opacity-90" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <Badge className="mb-5 bg-white/15 text-white border-white/25 backdrop-blur animate-fade-up">
            Rural Northeast India · Early Warning System
          </Badge>

          <h1 className="font-display text-5xl md:text-7xl text-white leading-[1.08] mb-6 animate-fade-up delay-100">
            Community
            <br />
            <em className="not-italic text-secondary/90">Health Monitor</em>
          </h1>

          <p className="text-white/80 text-lg md:text-xl max-w-xl mb-8 animate-fade-up delay-200">
            Protecting rural villages from water-borne diseases through real-time
            monitoring, early alerts, and community-driven reporting.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 animate-fade-up delay-300">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-elevated font-medium"
              onClick={() => onNavigate("calculator")}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Check Risk Score
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => onNavigate("report")}
            >
              <Activity className="w-4 h-4 mr-2" />
              Report a Case
            </Button>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── Stats strip ─────────────────────────────────────────── */}
      <section className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="p-6 flex items-center gap-4 border-r border-border last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`p-2.5 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  {stat.isBadge ? (
                    <Badge variant="secondary" className="text-sm mb-0.5">
                      {stat.value}
                    </Badge>
                  ) : (
                    <p className="text-2xl font-display font-semibold">{stat.value}</p>
                  )}
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main actions ────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl mb-2">What do you need?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {actions.map((action, i) => (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="group text-left p-6 bg-card border border-border rounded-xl shadow-card hover-lift hover:border-primary/30 transition-colors animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`w-10 h-10 rounded-lg ${action.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg mb-2">{action.label}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {action.description}
                </p>
                <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  {action.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Emergency banner ────────────────────────────────────── */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-danger/5 border border-danger/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-danger" />
              </div>
              <div>
                <p className="font-medium">Medical Emergency?</p>
                <p className="text-sm text-muted-foreground">
                  Contact emergency services or your local health center immediately.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Button
                variant="outline"
                className="border-danger/40 text-danger hover:bg-danger/5"
                onClick={() => window.open("tel:108")}
              >
                Ambulance: 108
              </Button>
              <Button
                variant="outline"
                className="border-danger/40 text-danger hover:bg-danger/5"
                onClick={() => window.open("tel:102")}
              >
                Medical: 102
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center">
              <Droplets className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display text-sm font-medium">HealthWatch NE</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} HealthWatch NE. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed & Developed by <span className="font-semibold text-primary">SJM</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;