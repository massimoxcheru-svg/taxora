"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Star, Users, Award } from "lucide-react";

const testimonials = [
  {
    name: "Chukwuemeka Okonkwo",
    role: "CFO, TechBridges Nigeria",
    image: "/images/person-1.png",
    quote:
      "Taxora cut our filing time from 3 weeks to 2 hours. The auto-deduction discovery alone saved us ₦2.4M last year. It's the best investment we've made.",
    rating: 5,
  },
  {
    name: "Amara Nwachukwu",
    role: "Freelance Consultant",
    image: "/images/person-2.png",
    quote:
      "I used to dread tax season. Now I just upload my invoices and Taxora handles everything - calculations, deductions, even the FIRS report. Absolutely life-changing.",
    rating: 5,
  },
  {
    name: "Dr. Ibrahim Yusuf",
    role: "Director, Pinnacle Legal LLP",
    image: "/images/person-3.png",
    quote:
      "As a law firm handling complex income structures, we needed something that truly understands Nigerian tax law. Taxora delivers exactly that, with bank-level security.",
    rating: 5,
  },
];

const stats = [
  { value: "12,000+", label: "Active Users", icon: Users },
  { value: "₦4.2B", label: "Taxes Filed", icon: Award },
  { value: "4.9/5", label: "User Rating", icon: Star },
];

export default function SocialProof() {
  return (
    <section className="relative py-28 bg-background overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            Social Proof
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Loved by{" "}
            <span className="text-primary">thousands of Nigerians</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            From solo freelancers to enterprise finance teams - Taxora is the
            trusted choice for modern tax management in Nigeria.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-8 rounded-xl bg-card/40 border border-border/40 hover:border-primary/30 transition-colors"
              >
                <Icon className="w-6 h-6 text-primary mb-1" />
                <span className="text-3xl sm:text-4xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex flex-col p-8 rounded-xl bg-card/40 border border-border/40 hover:border-primary/20 transition-all duration-500 group"
            >
              {/* Quote accent */}
              <div className="absolute top-6 right-6 text-6xl font-serif text-primary/10 leading-none select-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground flex-1 mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-border/30">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
