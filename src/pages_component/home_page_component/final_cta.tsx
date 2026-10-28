"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/src/micro-components/button";

export default function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a10] via-[#0d1f14] to-background" />
      
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
            Ready to get started?
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Take control of your{" "}
            <br className="hidden sm:block" />
            <span className="text-primary">taxes today</span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join 12,000+ Nigerian professionals and businesses who trust Taxora
            to simplify their tax obligations. Start free - no credit card
            required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button
              asChild
              size="lg"
              className="h-14 px-10 text-base font-semibold rounded-md shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all"
            >
              <Link href="/signup">
                Start Filing for Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 px-10 text-base font-semibold rounded-md border-border/50 hover:bg-secondary/40 transition-colors"
            >
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Free forever on the Starter plan &middot; Upgrade anytime &middot;
            Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
