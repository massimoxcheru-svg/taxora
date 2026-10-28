"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is my financial data secure with Taxora?",
    answer:
      "Absolutely. We use 256-bit AES encryption (the same standard used by major banks) to protect all your data. We are fully NDPR compliant, undergo regular security audits, and never share your information with third parties. Your data is stored in SOC 2 Type II certified data centres.",
  },
  {
    question: "How much does Taxora cost?",
    answer:
      "Taxora offers a completely free Starter plan that includes 1 tax return per year and access to our PAYE calculator. Our Professional plan at ₦4,999/month unlocks unlimited returns, bank integration, and FIRS direct filing. Enterprise pricing is custom - contact our sales team for a quote.",
  },
  {
    question: "Is Taxora compliant with FIRS regulations?",
    answer:
      "Yes. Taxora is built specifically for the Nigerian tax system. Our calculation engine is fully updated for the 2026 Personal Income Tax (PIT) and Corporate Income Tax (CIT) laws, including the new ₦800K minimum threshold. All generated reports meet FIRS filing requirements.",
  },
  {
    question: "Can I connect my bank account?",
    answer:
      "Yes. Taxora integrates securely with major Nigerian banks including GTBank, Access Bank, Zenith Bank, and more. Transactions are auto-imported and categorised, saving you hours of manual data entry. All connections use read-only access via encrypted APIs.",
  },
  {
    question: "How long does it take to file my taxes with Taxora?",
    answer:
      "Most users complete their tax filing in under 15 minutes. Simply upload your income data (or connect your bank), let our engine calculate your liability and optimize deductions, then download or directly submit your FIRS-compliant return. It's that fast.",
  },
  {
    question: "Can I use Taxora for my business as well?",
    answer:
      "Yes. Taxora supports both Personal Income Tax (PIT) and Corporate Income Tax (CIT). Our Professional and Enterprise plans include VAT calculations, multi-entity management, and team collaboration features designed for businesses of all sizes.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="border-b border-border/30 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-base font-medium text-foreground pr-4 group-hover:text-primary transition-colors">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm leading-relaxed text-muted-foreground max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 bg-card/20 border-t border-border/30">
      <div className="relative max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Frequently asked{" "}
            <span className="text-primary">questions</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about Taxora.
          </p>
        </motion.div>

        <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/40 p-2 sm:p-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
