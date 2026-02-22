import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Droplets, Phone } from "lucide-react";

interface LayoutProps {
  onBack: () => void;
  children: ReactNode;
  title?: string;
}

const Layout = ({ onBack, children, title }: LayoutProps) => (
  <div className="min-h-screen bg-background">
    {/* Nav */}
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5 -ml-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          {title && (
            <>
              <span className="text-border">|</span>
              <span className="text-sm font-medium text-muted-foreground">{title}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
            <Droplets className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-display text-sm hidden sm:block">HealthWatch NE</span>
        </div>
      </div>
    </header>

    <main>{children}</main>

    {/* Footer emergency strip */}
    <div className="border-t border-border bg-muted/30 py-3 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <Phone className="w-3.5 h-3.5 text-danger flex-shrink-0" />
        <span>Emergency: Ambulance <strong className="text-foreground">108</strong> · Medical <strong className="text-foreground">102</strong></span>
      </div>
    </div>
  </div>
);

export default Layout;
