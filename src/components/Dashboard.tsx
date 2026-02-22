import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Users,
  MapPin,
  Calendar,
} from "lucide-react";
import Layout from "@/components/Layout";

interface Props {
  onBack: () => void;
}

const villageData = [
  { name: "Guwahati Rural", cases: 12, risk: "Medium", population: 2500 },
  { name: "Dibrugarh", cases: 8, risk: "Low", population: 1800 },
  { name: "Jorhat", cases: 15, risk: "High", population: 3200 },
  { name: "Silchar", cases: 6, risk: "Low", population: 1500 },
  { name: "Tezpur", cases: 11, risk: "Medium", population: 2100 },
  { name: "Nagaon", cases: 18, risk: "High", population: 2800 },
];

const weeklyTrends = [
  { week: "Wk 1", cases: 15, alerts: 2 },
  { week: "Wk 2", cases: 23, alerts: 3 },
  { week: "Wk 3", cases: 18, alerts: 1 },
  { week: "Wk 4", cases: 31, alerts: 5 },
  { week: "Wk 5", cases: 27, alerts: 4 },
  { week: "Wk 6", cases: 22, alerts: 2 },
];

const symptomsData = [
  { name: "Diarrhea", value: 35, color: "hsl(174 62% 38%)" },
  { name: "Vomiting", value: 28, color: "hsl(34 90% 50%)" },
  { name: "Fever", value: 22, color: "hsl(43 96% 52%)" },
  { name: "Dehydration", value: 15, color: "hsl(0 80% 55%)" },
];

const waterSourceCases = [
  { source: "Well Water", cases: 25 },
  { source: "River/Stream", cases: 20 },
  { source: "Pond/Lake", cases: 12 },
  { source: "Treated Water", cases: 3 },
];

const riskBadge = (risk: string) => {
  const variant = risk === "High" ? "destructive" : risk === "Medium" ? "secondary" : "default";
  return <Badge variant={variant as any}>{risk}</Badge>;
};

const totalCases = villageData.reduce((s, v) => s + v.cases, 0);
const highRisk = villageData.filter((v) => v.risk === "High").length;
const totalPop = villageData.reduce((s, v) => s + v.population, 0);

const Dashboard = ({ onBack }: Props) => (
  <Layout onBack={onBack} title="Dashboard">
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl">Community Health Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time monitoring of water-borne diseases</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Cases",
            value: totalCases,
            sub: "+12% this week",
            trend: "up",
            icon: Users,
            trendColor: "text-danger",
          },
          {
            label: "High Risk Areas",
            value: `${highRisk} villages`,
            sub: "Requiring attention",
            trend: "up",
            icon: AlertTriangle,
            trendColor: "text-warning",
          },
          {
            label: "Population Monitored",
            value: totalPop.toLocaleString(),
            sub: "Active monitoring",
            trend: "stable",
            icon: Users,
            trendColor: "text-emerald-600",
          },
          {
            label: "Alert Rate",
            value: "15%",
            sub: "−3% improvement",
            trend: "down",
            icon: TrendingDown,
            trendColor: "text-emerald-600",
          },
        ].map((kpi, i) => (
          <Card key={i} className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {kpi.label}
                </p>
                <kpi.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-display font-semibold">{kpi.value}</p>
              <div className={`flex items-center gap-1 mt-1 text-xs ${kpi.trendColor}`}>
                {kpi.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.sub}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-lg">Weekly Case Trends</CardTitle>
            <p className="text-sm text-muted-foreground">Cases and alerts over 6 weeks</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="cases"
                  stroke="hsl(174 62% 38%)"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  name="Cases"
                />
                <Line
                  type="monotone"
                  dataKey="alerts"
                  stroke="hsl(43 96% 52%)"
                  strokeWidth={2}
                  strokeDasharray="4 2"
                  dot={{ r: 3 }}
                  name="Alerts"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-lg">Symptom Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">Most reported symptoms</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="60%" height={220}>
                <PieChart>
                  <Pie data={symptomsData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                    {symptomsData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2.5">
                {symptomsData.map((s) => (
                  <div key={s.name} className="flex items-center gap-2 text-sm">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                    <span className="font-medium ml-auto">{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-lg">Village Risk Status</CardTitle>
            <p className="text-sm text-muted-foreground">Current risk levels by area</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {villageData.map((v, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{v.name}</p>
                      <p className="text-xs text-muted-foreground">Pop. {v.population.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="text-sm font-semibold">{v.cases} cases</span>
                    {riskBadge(v.risk)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-lg">Cases by Water Source</CardTitle>
            <p className="text-sm text-muted-foreground">Risk breakdown by source type</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={waterSourceCases} layout="vertical" margin={{ left: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="source" type="category" width={110} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="cases" fill="hsl(174 62% 38%)" radius={[0, 4, 4, 0]} name="Cases" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Action items */}
      <Card className="shadow-card border-l-4 border-l-warning">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display text-lg">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Immediate Actions Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-danger/5 border border-danger/15">
              <p className="font-semibold text-danger text-sm mb-1">High Priority</p>
              <p className="text-sm text-muted-foreground">
                Deploy health teams to Jorhat and Nagaon villages
              </p>
            </div>
            <div className="p-4 rounded-lg bg-warning/5 border border-warning/15">
              <p className="font-semibold text-warning text-sm mb-1">Medium Priority</p>
              <p className="text-sm text-muted-foreground">
                Water quality testing in Guwahati Rural and Tezpur
              </p>
            </div>
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <p className="font-semibold text-emerald-700 text-sm mb-1">Prevention</p>
              <p className="text-sm text-muted-foreground">
                Distribute ORS packets across all monitored areas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </Layout>
);

export default Dashboard;
