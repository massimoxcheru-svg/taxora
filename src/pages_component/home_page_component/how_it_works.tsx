"use client";

import React from "react";
import { motion } from "motion/react";
import { Upload, Calculator, FileCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Your Data",
    description:
      "Import your income details, payslips, or connect your bank account. Our system auto-categorises all income streams and deductions for you.",
    color: "from-[#3ECF8E] to-emerald-400",
  },
  {
    step: "02",
    icon: Calculator,
    title: "Instant Calculation",
    description:
      "Our PIT/CIT engine applies the latest 2026 Nigerian tax brackets, identifies your deductions (NHIS, NHF, Rent Relief), and computes your exact liability.",
    color: "from-blue-400 to-cyan-400",
  },
  {
    step: "03",
    icon: FileCheck,
    title: "File & Pay",
    description:
      "Download your FIRS-compliant tax return, file directly through our platform, or schedule a payment. Done in minutes - not weeks.",
    color: "from-purple-400 to-pink-400",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Three steps to{" "}
            <span className="text-primary">tax freedom</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            No tax expertise required. Our platform guides you from start to
            finish with intelligent automation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[calc(50%+60px)] w-[calc(100%-60px)] h-px">
                    <div className="w-full h-full bg-gradient-to-r from-border/60 to-border/20 relative">
                      <ArrowRight className="absolute -right-2 -top-2 w-4 h-4 text-border/60" />
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-center text-center">
                  {/* Step number + icon */}
                  <div className="relative mb-8">
                    <div
                      className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow duration-500`}
                    >
                      <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    {/* Step badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-lg shadow-primary/30">
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
