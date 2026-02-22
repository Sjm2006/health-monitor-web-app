import { useState } from "react";
import Homepage from "@/components/Homepage";
import RiskCalculator from "@/components/RiskCalculator";
import Dashboard from "@/components/Dashboard";
import HealthAwareness from "@/components/HealthAwareness";
import ReportCase from "@/components/ReportCase";

type Page = "home" | "calculator" | "dashboard" | "awareness" | "report";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const goHome = () => setCurrentPage("home");

  switch (currentPage) {
    case "calculator":
      return <RiskCalculator onBack={goHome} />;
    case "dashboard":
      return <Dashboard onBack={goHome} />;
    case "awareness":
      return <HealthAwareness onBack={goHome} />;
    case "report":
      return <ReportCase onBack={goHome} />;
    default:
      return <Homepage onNavigate={(page) => setCurrentPage(page as Page)} />;
  }
};

export default Index;
