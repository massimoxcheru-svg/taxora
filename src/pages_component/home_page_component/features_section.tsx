"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Calculator,
  ShieldCheck,
  Landmark,
  FileText,
  Zap,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    title: "Auto Tax Calculation",
    description:
      "Instantly compute your PAYE, CIT, and VAT obligations across all progressive bands with real-time liability tracking.",
    icon: Calculator,
    gradient: "from-[#3ECF8E]/20 to-[#3ECF8E]/5",
  },
  {
    title: "FIRS-Compliant Reports",
    description:
      "Generate filing-ready reports that meet all Federal Inland Revenue Service requirements - no more back-and-forth.",
    icon: FileText,
    gradient: "from-blue-500/20 to-blue-500/5",
  },
  {
    title: "Bank Integration",
    description:
      "Securely connect your Nigerian bank accounts to auto-import transactions and categorise income streams effortlessly.",
    icon: Landmark,
    gradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    title: "Smart Deductions Engine",
    description:
      "Automatically discover eligible deductions like NHIS, NHF, Life Assurance, and Rent Relief to minimize your tax bill.",
    icon: TrendingUp,
    gradient: "from-orange-500/20 to-orange-500/5",
  },
  {
    title: "Bank-Level Security",
    description:
      "Your data is encrypted with 256-bit AES encryption. We're fully NDPR compliant - your privacy is non-negotiable.",
    icon: ShieldCheck,
    gradient: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    title: "Instant Filing",
    description:
      "File directly with FIRS through our platform or download your completed returns for manual submission. It's that simple.",
    icon: Zap,
    gradient: "from-pink-500/20 to-pink-500/5",
  },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col p-8 bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/40 transition-all duration-500 overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div
        className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center border border-border/30 group-hover:border-primary/30 transition-colors`}
      >
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="relative mt-6 text-lg font-semibold text-foreground">
        {feature.title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
        {feature.description}
      </p>
    </motion.div>
  );
};

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 bg-background">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            Core Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Everything you need to{" "}
            <span className="text-primary">file with confidence</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Taxora replaces complex spreadsheets and confusing tax laws with a
            suite of intelligent tools built specifically for Nigerian
            professionals and businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
