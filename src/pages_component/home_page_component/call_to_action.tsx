import { Button } from "@/src/micro-components/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Call_to_action() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-5xl text-white mb-4">
        Ready to take control of your taxes?
      </h2>
      <p className="text-gray-400 text-lg mb-8">
        Join thousands of Nigerians who trust Taxora for their tax monitoring
      </p>
      <Button
        size="lg"
        className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg"
      >
        Start Free Trial
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </motion.div>
  </div>
</section>
  );
}
