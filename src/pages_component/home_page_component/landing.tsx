import React from "react";
import { MoveRight, Zap, Target, BookOpen, Layers } from "lucide-react";
import { Button } from "@/src/micro-components/button";

const features = [
  {
    title: "Income & Deduction API",
    description: "Easily log all your income streams and eligible deductions. Our AI suggests deductions to maximize your tax savings automatically.",
    icon: <Layers className="w-6 h-6 text-primary" />,
  },
  {
    title: "2026 Nigerian Tax Engine",
    description: "Fully compliant with the 2026 Personal Income Tax (PIT) and Corporate Income Tax (CIT) laws, including the ₦800k threshold.",
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    title: "Automated Edge Calculation",
    description: "Instantly calculate your tax liability across all progressive bands and instantly see your effective tax rate.",
    icon: <Target className="w-6 h-6 text-primary" />,
  },
  {
    title: "Smart Filing Assistant",
    description: "Get step-by-step guidance on how to become fully compliant, generate filing-ready reports, and export compliance data.",
    icon: <BookOpen className="w-6 h-6 text-primary" />,
  },
];

const FeatureCard = ({ feature }: { feature: any }) => (
  <div className="flex flex-col flex-1 p-8 bg-card/30 backdrop-blur-[2px] border border-border/50 hover:border-primary/30 transition-all duration-300 rounded-lg group shadow-sm">
    <div className="w-12 h-12 rounded-md bg-transparent flex items-center justify-center border border-border/80 group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors">
      {feature.icon}
    </div>
    <h3 className="mt-6 text-xl font-semibold text-foreground">
      {feature.title}
    </h3>
    <div className="mt-3 text-sm leading-relaxed text-muted-foreground">
      {feature.description}
    </div>
  </div>
);

const TaxLandingPage = () => {
  return (
    <main className="flex flex-col bg-background pt-24 pb-32 border-t border-border/40">
      <section className="flex flex-col items-center w-full px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          The Developer's Tax Platform
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Taxora replaces complex spreadsheets and confusing tax laws with a dedicated suite of tools specifically built for Nigerian professionals and businesses.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-16 text-left">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </section>

      <section className="flex flex-col mt-40 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col">
            <div className="text-primary font-mono text-sm tracking-wider uppercase mb-3">AI Discovery</div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Transform Your Tax Filing Experience from Reactive to Proactive
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Don't leave money on the table. Taxora's engine automatically analyzes your profile against available Nigerian tax deductions like NHIS, NHF, Life Assurance, and Rent Relief to minimize your liability.
            </p>
            <div className="mt-10">
               <Button asChild size="lg" className="rounded-md font-medium text-base h-12 px-6">
                 <a href="/dashboard" className="flex items-center">
                   Launch Simulator <MoveRight className="ml-2 w-4 h-4" />
                 </a>
               </Button>
            </div>
          </div>
          
          {/* Visual placeholder for the landing page dashboard preview matching Supabase console look */}
          <div className="flex bg-card/50 backdrop-blur-md shadow-2xl rounded-lg border border-border/60 overflow-hidden lg:h-[500px] w-full relative group">
             {/* Fake terminal / editor header */}
             <div className="absolute top-0 w-full h-10 border-b border-border/50 bg-muted/20 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-primary/60"></div>
                <div className="ml-4 font-mono text-[10px] uppercase text-muted-foreground tracking-widest opacity-80">taxora-console ~ main</div>
             </div>
             {/* Content */}
             <div className="w-full h-full bg-background/40 flex flex-col p-8 mt-10">
                <div className="h-6 w-1/3 bg-muted/40 rounded-md mb-8 animate-pulse"></div>
                <div className="grid grid-cols-2 gap-6 mb-8">
                   <div className="h-28 bg-card/40 border border-border/40 rounded-lg p-5 flex flex-col gap-2">
                      <div className="h-3 w-1/2 bg-muted/50 rounded"></div>
                      <div className="h-8 w-3/4 bg-primary/10 border border-primary/20 rounded-sm mt-auto"></div>
                   </div>
                   <div className="h-28 bg-card/40 border border-border/40 rounded-lg p-5 flex flex-col gap-2">
                      <div className="h-3 w-1/2 bg-muted/50 rounded"></div>
                      <div className="h-8 w-3/4 bg-blue-500/10 border border-blue-500/20 rounded-sm mt-auto"></div>
                   </div>
                </div>
                <div className="flex-1 border border-border/40 rounded-lg bg-card/20 p-6 flex flex-col gap-4">
                   <div className="h-4 w-1/4 bg-muted/30 rounded"></div>
                   <div className="flex-1 flex items-end gap-3">
                      {/* Fake bars */}
                      <div className="flex-1 h-[40%] bg-muted/20 rounded-t-sm transition-all group-hover:h-[45%]"></div>
                      <div className="flex-1 h-[75%] bg-primary/40 rounded-t-sm transition-all group-hover:h-[80%]"></div>
                      <div className="flex-1 h-[55%] bg-muted/20 rounded-t-sm transition-all group-hover:h-[60%]"></div>
                      <div className="flex-1 h-[90%] bg-primary/40 rounded-t-sm transition-all group-hover:h-[95%]"></div>
                      <div className="flex-1 h-[30%] bg-muted/20 rounded-t-sm transition-all group-hover:h-[35%]"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TaxLandingPage;
