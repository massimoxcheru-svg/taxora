"use client";

import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Lock, Eye, Server, Globe, BadgeCheck } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "NDPR Compliant" },
  { icon: Lock, label: "256-bit AES Encryption" },
  { icon: Eye, label: "SOC 2 Type II" },
  { icon: Server, label: "99.9% Uptime SLA" },
];

const partners = [
  "FIRS",
  "GTBank",
  "Access Bank",
  "Zenith Bank",
  "Flutterwave",
  "Paystack",
];

export default function TrustSignals() {
  return (
    <section className="relative py-24 bg-card/30 border-y border-border/30">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            Security & Trust
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Your data is protected by{" "}
            <span className="text-primary">bank-level security</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We take security seriously. Your financial data is encrypted,
            protected, and never shared with third parties.
          </p>
        </motion.div>

        {/* Security Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center gap-4 p-6 rounded-xl bg-background/60 border border-border/40 hover:border-primary/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground text-center">
                  {badge.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Partner Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium mb-8">
            Trusted by leading Nigerian institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span className="text-lg font-semibold tracking-wide">
                  {partner}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
