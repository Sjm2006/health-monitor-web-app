import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  MapPin,
  Phone,
  CheckCircle2,
  ExternalLink,
  Loader2,
} from "lucide-react";
import Layout from "@/components/Layout";

interface Props {
  onBack: () => void;
}

const villages = [
  "Guwahati Rural",
  "Dibrugarh",
  "Jorhat",
  "Silchar",
  "Tezpur",
  "Nagaon",
  "Kokrajhar",
  "Bongaigaon",
  "Golaghat",
  "Other",
];

const waterSources = [
  "Private Well",
  "Public Well / Tube Well",
  "River / Stream",
  "Pond / Lake",
  "Treated Water Supply",
  "Bottled Water",
  "Other",
];

interface FormData {
  name: string;
  age: string;
  gender: string;
  village: string;
  phone: string;
  symptoms: string;
  duration: string;
  waterSource: string;
  additionalInfo: string;
}

const EMPTY: FormData = {
  name: "",
  age: "",
  gender: "",
  village: "",
  phone: "",
  symptoms: "",
  duration: "",
  waterSource: "",
  additionalInfo: "",
};

const Input = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    required={required}
    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
  />
);

const ReportCase = ({ onBack }: Props) => {
  const { toast } = useToast();
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof FormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.village || !form.symptoms) {
      toast({
        title: "Missing required fields",
        description: "Please fill in Name, Village, and Symptoms before submitting.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Report submitted ✓",
        description:
          "Your report has been sent to local health authorities. You will be contacted if needed.",
      });
      setForm(EMPTY);
    }, 1800);
  };

  return (
    <Layout onBack={onBack} title="Report a Case">
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-5">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl md:text-4xl">Report a Health Case</h1>
          <p className="text-muted-foreground mt-1">
            Help health authorities monitor and respond to illness in your community.
          </p>
        </div>

        {/* Privacy note */}
        <div className="flex gap-3 p-4 rounded-lg bg-accent border border-accent-foreground/10">
          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Your privacy is protected. </span>
            Information is used only for health monitoring and handled confidentially by health authorities.
          </div>
        </div>

        {/* Form card */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 font-display text-xl">
              <FileText className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" value={form.name} onChange={set("name")} placeholder="Enter full name" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" value={form.age} onChange={set("age")} placeholder="Enter age" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={form.gender} onValueChange={set("gender")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              {/* Location */}
              <div className="pt-2 border-t">
                <h3 className="font-display text-lg flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-primary" />
                  Location
                </h3>
                <div className="space-y-1.5">
                  <Label htmlFor="village">Village / Area *</Label>
                  <Select value={form.village} onValueChange={set("village")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your village or area" />
                    </SelectTrigger>
                    <SelectContent>
                      {villages.map((v) => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Health info */}
              <div className="pt-2 border-t space-y-4">
                <h3 className="font-display text-lg">Health Information</h3>

                <div className="space-y-1.5">
                  <Label htmlFor="symptoms">Symptoms *</Label>
                  <Textarea
                    id="symptoms"
                    value={form.symptoms}
                    onChange={(e) => set("symptoms")(e.target.value)}
                    placeholder="Describe symptoms (e.g. diarrhea, vomiting, fever, stomach pain…)"
                    rows={4}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="duration">Duration of Symptoms</Label>
                  <Input id="duration" value={form.duration} onChange={set("duration")} placeholder="e.g. 2 days, 1 week" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="waterSource">Primary Water Source</Label>
                  <Select value={form.waterSource} onValueChange={set("waterSource")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select water source" />
                    </SelectTrigger>
                    <SelectContent>
                      {waterSources.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    value={form.additionalInfo}
                    onChange={(e) => set("additionalInfo")(e.target.value)}
                    placeholder="Recent travel, food consumed, other household members affected…"
                    rows={3}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4 border-t space-y-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full gradient-primary text-white border-0 shadow-elevated"
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting…</>
                  ) : (
                    "Submit Health Report"
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    You can also use our online form:
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("https://forms.google.com", "_blank")}
                  >
                    <ExternalLink className="w-3.5 h-3.5 mr-2" />
                    Open Google Form
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Emergency */}
        <div className="flex gap-3 p-4 rounded-lg bg-danger/5 border border-danger/20">
          <Phone className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-sm">For Medical Emergencies</p>
            <p className="text-sm text-muted-foreground mt-0.5">Contact emergency services immediately.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-danger/40 text-danger" onClick={() => window.open("tel:108")}>
              108
            </Button>
            <Button variant="outline" size="sm" className="border-danger/40 text-danger" onClick={() => window.open("tel:102")}>
              102
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportCase;
