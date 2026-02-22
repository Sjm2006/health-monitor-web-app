import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Thermometer,
  Droplets,
  CloudRain,
  Phone,
} from "lucide-react";
import Layout from "@/components/Layout";

interface Props {
  onBack: () => void;
}

const symptomsList = [
  { id: "diarrhea", label: "Diarrhea", score: 3 },
  { id: "vomiting", label: "Vomiting", score: 3 },
  { id: "fever", label: "Fever", score: 2 },
  { id: "dehydration", label: "Dehydration", score: 4 },
  { id: "abdominal_pain", label: "Abdominal Pain", score: 2 },
  { id: "nausea", label: "Nausea", score: 1 },
  { id: "fatigue", label: "Fatigue / Weakness", score: 1 },
  { id: "blood_stool", label: "Blood in Stool", score: 5 },
];

const waterSources = [
  { value: "treated", label: "Treated / Boiled Water", score: 0 },
  { value: "well", label: "Private Well", score: 2 },
  { value: "public_well", label: "Public / Tube Well", score: 3 },
  { value: "river", label: "River / Stream", score: 5 },
  { value: "pond", label: "Pond / Lake", score: 4 },
  { value: "unknown", label: "Unknown Source", score: 3 },
];

const rainfallLevels = [
  { value: "none", label: "No recent rain", score: 0 },
  { value: "light", label: "Light rain (1–7 days ago)", score: 1 },
  { value: "moderate", label: "Moderate rain (1–3 days ago)", score: 2 },
  { value: "heavy", label: "Heavy rain / flooding (last 3 days)", score: 4 },
];

const recommendations: Record<"Low" | "Medium" | "High", string[]> = {
  High: [
    "Seek immediate medical attention",
    "Drink ORS solution frequently",
    "Switch to boiled/treated water immediately",
    "Avoid solid foods temporarily",
    "Monitor symptoms closely",
  ],
  Medium: [
    "Monitor symptoms for 24–48 hours",
    "Drink only boiled/treated water",
    "Take ORS if available",
    "Rest and avoid strenuous activities",
    "Seek medical help if symptoms worsen",
  ],
  Low: [
    "Continue preventive measures",
    "Maintain good hand hygiene",
    "Use only safe water sources",
    "Wash hands frequently with soap",
    "Stay aware of community health alerts",
  ],
};

type RiskLevel = "Low" | "Medium" | "High";

const riskConfig: Record<RiskLevel, { color: string; bg: string; icon: JSX.Element; badge: string }> = {
  High: {
    color: "text-danger",
    bg: "bg-danger/10",
    badge: "destructive",
    icon: <XCircle className="w-8 h-8" />,
  },
  Medium: {
    color: "text-warning",
    bg: "bg-warning/10",
    badge: "secondary",
    icon: <AlertTriangle className="w-8 h-8" />,
  },
  Low: {
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    badge: "default",
    icon: <CheckCircle2 className="w-8 h-8" />,
  },
};

const RiskCalculator = ({ onBack }: Props) => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [waterSource, setWaterSource] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [result, setResult] = useState<{ level: RiskLevel; score: number } | null>(null);

  const toggleSymptom = (id: string, checked: boolean) =>
    setSymptoms((prev) => (checked ? [...prev, id] : prev.filter((s) => s !== id)));

  const calculate = () => {
    let score = 0;
    symptoms.forEach((id) => {
      const s = symptomsList.find((x) => x.id === id);
      if (s) score += s.score;
    });
    const ws = waterSources.find((w) => w.value === waterSource);
    if (ws) score += ws.score;
    const rf = rainfallLevels.find((r) => r.value === rainfall);
    if (rf) score += rf.score;

    const level: RiskLevel = score <= 3 ? "Low" : score <= 8 ? "Medium" : "High";
    setResult({ level, score });
  };

  const reset = () => {
    setResult(null);
    setSymptoms([]);
    setWaterSource("");
    setRainfall("");
  };

  if (result) {
    const cfg = riskConfig[result.level];
    return (
      <Layout onBack={onBack} title="Risk Calculator">
        <div className="max-w-2xl mx-auto px-4 py-10">
          {/* Result card */}
          <Card className="shadow-elevated mb-6 overflow-hidden">
            <div className={`h-1.5 w-full ${result.level === "High" ? "bg-danger" : result.level === "Medium" ? "bg-warning" : "bg-emerald-500"}`} />
            <CardHeader className="text-center pb-2 pt-8">
              <div className={`w-16 h-16 rounded-full ${cfg.bg} ${cfg.color} flex items-center justify-center mx-auto mb-4`}>
                {cfg.icon}
              </div>
              <CardTitle className="text-2xl font-display">Risk Assessment Result</CardTitle>
              <Badge variant={cfg.badge as any} className="mx-auto text-sm px-4 py-1 mt-2">
                {result.level} Risk
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
                Score: {result.score} / 20
              </p>
            </CardHeader>
            <CardContent className="pb-8">
              <Progress value={(result.score / 20) * 100} className="mb-8 h-2" />

              <h3 className="font-display text-lg mb-4">Recommended Actions</h3>
              <ul className="space-y-3">
                {recommendations[result.level].map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>

              {result.level === "High" && (
                <div className="mt-6 p-4 rounded-lg bg-danger/8 border border-danger/20 flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-danger text-sm">Immediate action required</p>
                    <p className="text-sm text-danger/80 mt-1">
                      Your responses suggest high risk. Please contact a healthcare worker or go to your nearest health center now.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" onClick={reset} className="flex-1">
              Recalculate
            </Button>
            <Button
              className="flex-1 gradient-primary text-white border-0"
              onClick={() => window.open("tel:+911234567890")}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Health Center
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout onBack={onBack} title="Risk Calculator">
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-5">
        {/* Section: Symptoms */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-xl">
              <Thermometer className="w-5 h-5 text-primary" />
              Current Symptoms
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Select any symptoms you or someone in your household is experiencing.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {symptomsList.map((symptom) => (
                <div key={symptom.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/40 transition-colors cursor-pointer"
                  onClick={() => toggleSymptom(symptom.id, !symptoms.includes(symptom.id))}
                >
                  <Checkbox
                    id={symptom.id}
                    checked={symptoms.includes(symptom.id)}
                    onCheckedChange={(checked) => toggleSymptom(symptom.id, checked as boolean)}
                  />
                  <Label htmlFor={symptom.id} className="cursor-pointer flex-1 text-sm">
                    {symptom.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section: Water Source */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-xl">
              <Droplets className="w-5 h-5 text-primary" />
              Primary Water Source
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              What is your main source of drinking water?
            </p>
          </CardHeader>
          <CardContent>
            <RadioGroup value={waterSource} onValueChange={setWaterSource} className="space-y-2">
              {waterSources.map((source) => (
                <div
                  key={source.value}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${waterSource === source.value ? "border-primary bg-accent" : "hover:bg-muted/40"}`}
                  onClick={() => setWaterSource(source.value)}
                >
                  <RadioGroupItem value={source.value} id={`ws-${source.value}`} />
                  <Label htmlFor={`ws-${source.value}`} className="cursor-pointer flex-1 text-sm">
                    {source.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Section: Rainfall */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-xl">
              <CloudRain className="w-5 h-5 text-primary" />
              Recent Rainfall
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              How much rainfall has there been in your area recently?
            </p>
          </CardHeader>
          <CardContent>
            <RadioGroup value={rainfall} onValueChange={setRainfall} className="space-y-2">
              {rainfallLevels.map((level) => (
                <div
                  key={level.value}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${rainfall === level.value ? "border-primary bg-accent" : "hover:bg-muted/40"}`}
                  onClick={() => setRainfall(level.value)}
                >
                  <RadioGroupItem value={level.value} id={`rf-${level.value}`} />
                  <Label htmlFor={`rf-${level.value}`} className="cursor-pointer flex-1 text-sm">
                    {level.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Button
          onClick={calculate}
          disabled={!waterSource || !rainfall}
          size="lg"
          className="w-full gradient-primary text-white border-0 shadow-elevated"
        >
          Calculate Risk Level
        </Button>
      </div>
    </Layout>
  );
};

export default RiskCalculator;
