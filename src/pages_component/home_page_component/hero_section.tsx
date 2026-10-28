"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";
import { Button } from "@/src/micro-components/button";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 blur-[150px] rounded-full pointer-events-none z-[1]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-primary/8 blur-[100px] rounded-full pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24 lg:pt-32 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 w-fit"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>2026 Nigerian Tax Laws Fully Supported</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.08] font-bold text-foreground">
              Taxes Simplified{" "}
              <br />
              <span className="text-primary">for Nigerians</span>
            </h1>

            <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Calculate your exact tax liability, discover eligible deductions,
              and generate FIRS-compliant reports all in minutes, not days.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Button
                asChild
                size="lg"
                className="h-13 px-8 text-base font-semibold rounded-md transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
              >
                <Link href="/signup">
                  Start Filing for Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-13 px-8 text-base font-semibold rounded-md border-border/60 hover:bg-secondary/50 backdrop-blur-sm transition-colors"
              >
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>

            {/* Trust micro-badges */}
            <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>NDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>256-bit encryption</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10">
              {/* Browser Chrome */}
              <div className="bg-card/80 backdrop-blur-sm border-b border-border/40 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <div className="ml-4 flex-1 bg-secondary/60 rounded-md h-6 flex items-center px-3">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    app.taxora.ng/dashboard
                  </span>
                </div>
              </div>
              <Image
                src="/images/hero-dashboard.png"
                alt="Taxora Dashboard - Tax calculations, compliance meter, and income breakdown"
                width={700}
                height={480}
                className="w-full h-auto"
                priority
              />
            </div>
            {/* Floating glow behind image */}
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
