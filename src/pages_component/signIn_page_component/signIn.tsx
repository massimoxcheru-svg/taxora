"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Input } from "@/src/micro-components/input";
import { Button } from "@/src/micro-components/button";
import { Label } from "@/src/micro-components/label";
import { Checkbox } from "@/src/micro-components/checkbox";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left: Decorative Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-transparent" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 blur-[150px] rounded-full" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2da872] flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-black text-lg font-bold">T</span>
            </div>
            <span className="text-foreground text-xl font-semibold tracking-tight">
              Taxora
            </span>
          </Link>

          {/* Center quote */}
          <div className="max-w-md">
            <blockquote className="text-2xl font-semibold text-foreground leading-relaxed mb-6">
              &ldquo;Taxora cut our filing time from 3 weeks to 2 hours. The
              auto-deduction discovery alone saved us ₦2.4M last year.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
                <Image
                  src="/images/person-1.png"
                  alt="Chukwuemeka O."
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Chukwuemeka Okonkwo
                </p>
                <p className="text-xs text-muted-foreground">
                  CFO, TechBridges Nigeria
                </p>
              </div>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="flex gap-8">
            <div>
              <p className="text-2xl font-bold text-foreground">12,000+</p>
              <p className="text-xs text-muted-foreground">Active Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">₦4.2B</p>
              <p className="text-xs text-muted-foreground">Taxes Filed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">4.9/5</p>
              <p className="text-xs text-muted-foreground">User Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2da872] flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-black text-lg font-bold">T</span>
              </div>
              <span className="text-foreground text-xl font-semibold tracking-tight">
                Taxora
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to your account to manage your tax obligations
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-secondary/30 border-border/50 focus:border-primary/50 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 bg-secondary/30 border-border/50 focus:border-primary/50 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                  className="border-border/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Button
                variant="link"
                className="px-0 text-primary hover:text-primary/80 text-sm"
              >
                Forgot password?
              </Button>
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
            >
              Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs text-muted-foreground uppercase tracking-wider">
                or
              </span>
            </div>
          </div>

          {/* Google Sign In (placeholder) */}
          <Button
            variant="outline"
            className="w-full h-11 border-border/50 hover:bg-secondary/50 text-foreground font-medium"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign up for free
            </Link>
          </p>

          {/* Security badge */}
          <div className="mt-6 p-3 rounded-lg bg-primary/5 border border-primary/10 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary shrink-0" />
            <p className="text-xs text-muted-foreground">
              Protected by 256-bit encryption. NDPR compliant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
