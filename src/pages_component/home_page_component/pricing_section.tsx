"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Check, ArrowRight, Sparkles, Zap, Building2 } from "lucide-react";
import { Button } from "@/src/micro-components/button";

const plans = [
  {
    name: "Starter",
    price: "Free",
    priceSuffix: "",
    description: "Perfect for individuals starting out",
    icon: Sparkles,
    highlight: false,
    features: [
      "1 tax return per year",
      "PAYE calculator",
      "Basic deduction discovery",
      "PDF report download",
      "Email support",
    ],
    cta: "Get Started Free",
    href: "/signup",
  },
  {
    name: "Professional",
    price: "₦4,999",
    priceSuffix: "/month",
    description: "For freelancers and small businesses",
    icon: Zap,
    highlight: true,
    features: [
      "Unlimited tax returns",
      "PIT + CIT + VAT engines",
      "Full deduction optimization",
      "Bank account integration",
      "FIRS direct filing",
      "Priority support",
      "Compliance health score",
    ],
    cta: "Start 14-Day Free Trial",
    href: "/signup",
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceSuffix: "",
    description: "For accounting firms and large teams",
    icon: Building2,
    highlight: false,
    features: [
      "Everything in Professional",
      "Multi-entity management",
      "Team collaboration tools",
      "Custom API access",
      "Dedicated account manager",
      "SLA guarantee",
      "Audit trail & compliance logs",
    ],
    cta: "Contact Sales",
    href: "#",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-28 bg-background overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Simple, transparent{" "}
            <span className="text-primary">pricing</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when ready. No hidden fees, no surprises.
            Cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className={`relative flex flex-col p-8 rounded-xl border transition-all duration-500 ${
                  plan.highlight
                    ? "bg-card/60 border-primary/50 shadow-xl shadow-primary/10 scale-[1.02]"
                    : "bg-card/30 border-border/40 hover:border-border/60"
                }`}
              >
                {/* Popular badge */}
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/30">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      plan.highlight
                        ? "bg-primary/20"
                        : "bg-secondary/60"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        plan.highlight
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {plan.name}
                  </h3>
                </div>

                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.priceSuffix && (
                    <span className="text-muted-foreground text-sm ml-1">
                      {plan.priceSuffix}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-8">
                  {plan.description}
                </p>

                <ul className="flex flex-col gap-3 mb-10 flex-1">
                  {plan.features.map((feature, fi) => (
                    <li
                      key={fi}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  className={`w-full justify-center font-semibold rounded-md h-12 ${
                    plan.highlight
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                      : "bg-secondary text-foreground hover:bg-secondary/80 border border-border/40"
                  }`}
                >
                  <Link href={plan.href}>
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          All plans include NDPR compliance, data encryption, and 24/7
          monitoring. No hidden fees - ever.
        </motion.p>
      </div>
    </section>
  );
}
