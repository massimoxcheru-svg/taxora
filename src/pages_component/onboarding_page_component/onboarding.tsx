import { useState } from "react";
import { Button } from "@/src/micro-components/button";
import { Card, CardContent } from "@/src/micro-components/card";
import { Progress } from "@/src/micro-components/progress";
import {
  Shield,
  Building2,
  Calculator,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { motion } from "motion/react";

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Taxora",
      description: "Your personal tax monitoring assistant for Nigeria",
      icon: Shield,
      color: "blue",
      features: [
        "Monitor all your income sources in one place",
        "Automatic tax calculations based on 2026 PIT law",
        "Real-time tax liability estimates",
        "Secure and encrypted data storage",
      ],
    },
    {
      title: "Connect Your Banks",
      description: "Link your bank accounts for automatic transaction tracking",
      icon: Building2,
      color: "green",
      features: [
        "Secure bank account integration",
        "Automatic transaction import",
        "Multi-bank support (GTBank, Access, Zenith, etc.)",
        "Your credentials are never stored",
      ],
    },
    {
      title: "Smart Tax Estimation",
      description:
        "Get accurate tax estimates with automatic deduction calculations",
      icon: Calculator,
      color: "purple",
      features: [
        "Progressive tax band calculations",
        "Rent relief automatically applied",
        "Pension and insurance deductions",
        "Monthly, quarterly, and annual reports",
      ],
    },
    {
      title: "You're All Set!",
      description: "Start monitoring your tax obligations today",
      icon: CheckCircle2,
      color: "green",
      features: [
        "Dashboard with real-time insights",
        "Transaction history and classification",
        "Export reports for tax filing",
        "Notification for important deadlines",
      ],
    },
  ];

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const colorClasses = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      button: "bg-green-600 hover:bg-green-700",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      button: "bg-purple-600 hover:bg-purple-700",
    },
  };

  const colors =
    colorClasses[currentStepData.color as keyof typeof colorClasses];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </p>
            <p className="text-sm text-gray-600">
              {Math.round(progress)}% Complete
            </p>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-xl border-0">
            <CardContent className="pt-12 pb-8 px-8">
              {/* Icon */}
              <div
                className={`w-20 h-20 rounded-2xl ${colors.bg} flex items-center justify-center mx-auto mb-6 shadow-lg`}
              >
                <Icon className={`w-10 h-10 ${colors.text}`} />
              </div>

              {/* Title */}
              <h2 className="text-3xl text-center mb-3 text-gray-900">
                {currentStepData.title}
              </h2>
              <p className="text-center text-gray-600 mb-8">
                {currentStepData.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {currentStepData.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`w-6 h-6 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${colors.text}`} />
                    </div>
                    <p className="text-sm text-gray-700">{feature}</p>
                  </motion.div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className={`${currentStep === 0 ? "w-full" : "flex-1"} ${colors.button}`}
                >
                  {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                  {currentStep < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 ml-2" />
                  )}
                </Button>
              </div>

              {/* Skip Option */}
              {currentStep < steps.length - 1 && (
                <div className="text-center mt-4">
                  <Button
                    variant="link"
                    onClick={onComplete}
                    className="text-gray-500"
                  >
                    Skip onboarding
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentStep
                  ? "w-8 bg-blue-600"
                  : index < currentStep
                    ? "w-2 bg-green-600"
                    : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
