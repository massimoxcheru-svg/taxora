"use client";

import Navbar from "./navbar";
import HeroSection from "./hero_section";
import FeaturesSection from "./features_section";
import HowItWorks from "./how_it_works";
import TrustSignals from "./trust_signals";
import SocialProof from "./social_proof";
import PricingSection from "./pricing_section";
import FAQSection from "./faq_section";
import FinalCTA from "./final_cta";
import Footer from "./footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Hero */}
      <section id="home">
        <HeroSection />
      </section>

      {/* Key Features */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Trust & Security */}
      <TrustSignals />

      {/* Social Proof & Testimonials */}
      <SocialProof />

      {/* Pricing */}
      <PricingSection />

      {/* FAQ */}
      <FAQSection />

      {/* Final Call to Action */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
