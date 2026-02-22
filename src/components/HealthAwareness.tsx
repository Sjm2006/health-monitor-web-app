import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Droplets,
  Heart,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Hand,
  Thermometer,
  Info,
} from "lucide-react";
import Layout from "@/components/Layout";

interface Props {
  onBack: () => void;
}

type Lang = "en" | "as";

const preventionTips = [
  {
    icon: Droplets,
    title: "Safe Drinking Water",
    priority: "High",
    en: "Always boil water for at least 1 minute before drinking. Use treated or bottled water when possible.",
    as: "পানী খোৱাৰ আগতে কমেও ১ মিনিটৰ বাবে উতলাওক। যেতিয়া সম্ভৱ শোধিত বা বটল পানী ব্যৱহাৰ কৰক।",
  },
  {
    icon: Hand,
    title: "Hand Hygiene",
    priority: "High",
    en: "Wash hands with soap and clean water for 20 seconds — especially before eating and after using the toilet.",
    as: "বিশেষকৈ খোৱাৰ আগতে আৰু শৌচালয় ব্যৱহাৰৰ পিছত চাবোন আৰু পৰিষ্কাৰ পানীৰে ২০ ছেকেণ্ড হাত ধুব।",
  },
  {
    icon: Shield,
    title: "Food Safety",
    priority: "Medium",
    en: "Cook food thoroughly, eat while hot. Avoid raw vegetables and fruits unless you can peel them yourself.",
    as: "খাদ্য ভালদৰে ৰান্ধক, গৰম থাকোঁতে খাওক। কেঁচা পাচলি আৰু ফল এৰাই চলক যদিহে আপুনি নিজে বাকলি ছোৱাব নোৱাৰে।",
  },
  {
    icon: Heart,
    title: "Environmental Hygiene",
    priority: "Medium",
    en: "Keep surroundings clean, use proper waste disposal, and maintain clean toilets and water storage.",
    as: "চাৰিওফালে পৰিষ্কাৰ ৰাখক, সঠিক আৱৰ্জনা নিষ্কাশন ব্যৱহাৰ কৰক, পৰিষ্কাৰ শৌচালয় আৰু পানী সংৰক্ষণ বজাই ৰাখক।",
  },
];

const orsContent = {
  en: {
    title: "How to Prepare ORS (Oral Rehydration Solution)",
    ingredients: [
      "1 litre of clean, boiled water (cooled)",
      "6 level teaspoons of sugar",
      "½ teaspoon of salt",
    ],
    steps: [
      "Boil 1 litre of water and allow it to cool.",
      "Add 6 level teaspoons of sugar.",
      "Add ½ teaspoon of salt.",
      "Stir until completely dissolved.",
      "Taste — it should be no saltier than tears.",
      "Give in small, frequent sips.",
    ],
    warning: "If vomiting occurs, wait 10 minutes then give ORS slowly.",
  },
  as: {
    title: "ORS (মৌখিক পুনৰ্হাইড্ৰেশ্যন দ্ৰৱণ) কেনেকৈ প্ৰস্তুত কৰিব",
    ingredients: [
      "১ লিটাৰ পৰিষ্কাৰ, উতলোৱা পানী (ঠাণ্ডা হোৱা)",
      "৬ চামুচ চেনি",
      "১/২ চামুচ নিমখ",
    ],
    steps: [
      "১ লিটাৰ পানী উতলাই ঠাণ্ডা হ'বলৈ দিয়ক।",
      "৬ চামুচ চেনি যোগ কৰক।",
      "১/২ চামুচ নিমখ যোগ কৰক।",
      "সম্পূৰ্ণভাৱে দ্ৰৱীভূত নোহোৱালৈকে লৰাওক।",
      "সোৱাদ চাওক — চকুলোতকৈ নিমখীয়া হ'ব নালাগে।",
      "সৰু সৰু চুমুক দি দিয়ক।",
    ],
    warning: "বমি হ'লে ১০ মিনিট অপেক্ষা কৰি তাৰ পিছত লাহে লাহে ORS দিয়ক।",
  },
};

const warningSigns = {
  en: {
    title: "When to Seek Immediate Medical Help",
    signs: [
      "Severe dehydration (dry mouth, no tears, reduced urination)",
      "Blood in stool or vomit",
      "High fever (above 101°F / 38.3°C)",
      "Severe stomach pain",
      "Signs of shock — rapid heartbeat or dizziness",
      "No improvement after 24–48 hours of home treatment",
    ],
    contacts: "Health Center: +91-XXXX-XXXX · Ambulance: 108 · Medical Emergency: 102",
  },
  as: {
    title: "কেতিয়া তৎক্ষণাত চিকিৎসা সহায় লোৱা উচিত",
    signs: [
      "গুৰুতৰ পানীশূন্যতা (শুকান মুখ, চকুলো নোলোৱা, কম প্ৰস্ৰাৱ)",
      "শৌচ বা বমিত তেজ",
      "উচ্চ জ্বৰ (১০১°F/৩৮.৩°C ৰ ওপৰত)",
      "তীব্ৰ পেটৰ বিষ",
      "শ্বকৰ লক্ষণ — দ্ৰুত হৃদস্পন্দন বা মূৰ ঘূৰোৱা",
      "ঘৰুৱা চিকিৎসাৰ ২৪–৪৮ ঘণ্টা পিছতো উন্নতি নোহোৱা",
    ],
    contacts: "স্বাস্থ্য কেন্দ্ৰ: +৯১-XXXX-XXXX · এম্বুলেন্স: ১০৮ · চিকিৎসা জৰুৰী: ১০২",
  },
};

const diseases = [
  {
    name: { en: "Cholera", as: "হৈজা" },
    symptoms: { en: "Severe watery diarrhea, vomiting, rapid dehydration", as: "তীব্ৰ পানীয়া শৌচ, বমি, দ্ৰুত পানীশূন্যতা" },
    prevention: { en: "Safe water, proper sanitation, food hygiene", as: "নিৰাপদ পানী, উচিত পয়ঃনিষ্কাশন, খাদ্যৰ পৰিষ্কাৰতা" },
  },
  {
    name: { en: "Typhoid", as: "টাইফয়েড" },
    symptoms: { en: "High fever, headache, stomach pain, weakness", as: "উচ্চ জ্বৰ, মূৰৰ বিষ, পেটৰ বিষ, দুৰ্বলতা" },
    prevention: { en: "Vaccination, safe water, good hygiene", as: "টীকাকৰণ, নিৰাপদ পানী, ভাল পৰিষ্কাৰ-পৰিচ্ছন্নতা" },
  },
  {
    name: { en: "Hepatitis A", as: "হেপাটাইটিছ এ" },
    symptoms: { en: "Jaundice, fatigue, nausea, stomach pain", as: "কাঁহুদী, ভাগৰুৱা, বমি ভাব, পেটৰ বিষ" },
    prevention: { en: "Vaccination, hand hygiene, safe water", as: "টীকাকৰণ, হাতৰ পৰিষ্কাৰতা, নিৰাপদ পানী" },
  },
];

const HealthAwareness = ({ onBack }: Props) => {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <Layout onBack={onBack} title="Health Tips">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Language selector */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl">
              {lang === "en" ? "Health Awareness" : "স্বাস্থ্য সজাগতা"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {lang === "en"
                ? "Prevention guides for water-borne disease"
                : "পানীবাহিত ৰোগ প্ৰতিৰোধৰ তথ্য"}
            </p>
          </div>
          <div className="flex rounded-lg border overflow-hidden">
            <Button
              variant={lang === "en" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setLang("en")}
            >
              English
            </Button>
            <Button
              variant={lang === "as" ? "default" : "ghost"}
              size="sm"
              className="rounded-none border-l"
              onClick={() => setLang("as")}
            >
              অসমীয়া
            </Button>
          </div>
        </div>

        <Tabs defaultValue="prevention" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="prevention">{lang === "en" ? "Prevention" : "প্ৰতিৰোধ"}</TabsTrigger>
            <TabsTrigger value="ors">{lang === "en" ? "ORS Recipe" : "ORS"}</TabsTrigger>
            <TabsTrigger value="warning">{lang === "en" ? "Warning Signs" : "সতৰ্কতা"}</TabsTrigger>
            <TabsTrigger value="diseases">{lang === "en" ? "Diseases" : "ৰোগ"}</TabsTrigger>
          </TabsList>

          {/* Prevention */}
          <TabsContent value="prevention" className="space-y-4">
            {preventionTips.map((tip, i) => (
              <Card key={i} className="shadow-card">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg ${tip.priority === "High" ? "bg-danger/10 text-danger" : "bg-warning/10 text-warning"}`}>
                        <tip.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="font-display text-lg">{tip.title}</CardTitle>
                    </div>
                    <Badge variant={tip.priority === "High" ? "destructive" : "secondary"}>
                      {tip.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{tip[lang]}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* ORS */}
          <TabsContent value="ors">
            <Card className="shadow-card border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-lg">
                  <Droplets className="w-5 h-5 text-primary" />
                  {orsContent[lang].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="font-semibold text-sm mb-3">
                    {lang === "en" ? "Ingredients:" : "উপাদানসমূহ:"}
                  </p>
                  <ul className="space-y-2">
                    {orsContent[lang].ingredients.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-sm mb-3">
                    {lang === "en" ? "Steps:" : "পদক্ষেপসমূহ:"}
                  </p>
                  <ol className="space-y-2">
                    {orsContent[lang].steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="p-4 rounded-lg bg-warning/8 border border-warning/20 flex gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-warning/90">{orsContent[lang].warning}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Warning signs */}
          <TabsContent value="warning">
            <Card className="shadow-card border-l-4 border-l-danger">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-lg">
                  <AlertTriangle className="w-5 h-5 text-danger" />
                  {warningSigns[lang].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {warningSigns[lang].signs.map((sign, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-danger/5 border border-danger/15">
                    <AlertTriangle className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{sign}</p>
                  </div>
                ))}
                <div className="mt-4 p-4 rounded-lg bg-accent flex gap-3">
                  <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{warningSigns[lang].contacts}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Diseases */}
          <TabsContent value="diseases" className="space-y-4">
            {diseases.map((disease, i) => (
              <Card key={i} className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 font-display text-lg">
                    <Thermometer className="w-5 h-5 text-primary" />
                    {disease.name[lang]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      {lang === "en" ? "Symptoms" : "লক্ষণসমূহ"}
                    </p>
                    <p className="text-sm">{disease.symptoms[lang]}</p>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      {lang === "en" ? "Prevention" : "প্ৰতিৰোধ"}
                    </p>
                    <p className="text-sm">{disease.prevention[lang]}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default HealthAwareness;
