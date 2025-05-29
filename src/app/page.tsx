"use client";
import Logo from "@/components/global/logo";
import { ModeToggle } from "@/components/global/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  DollarSign,
  Github,
  Globe,
  Instagram,
  Key,
  Layers,
  Linkedin,
  Zap,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "AI-Powered Data Extraction",
    description:
      "Extract structured data from any webpage using advanced AI models",
    icon: Bot,
  },
  {
    title: "Interactive Web Automation",
    description: "Automate clicks, form fills, and scrolling with precision",
    icon: Globe,
  },
  {
    title: "Workflow Builder",
    description: "Create complex automation workflows with our visual editor",
    icon: Layers,
  },
  {
    title: "Real-time Monitoring",
    description: "Track execution status and performance in real-time",
    icon: Zap,
  },
  {
    title: "Credential Management System",
    description:
      "Manage all your credentials at one place, encrytpreed with advanced algorithms.",
    icon: Key,
  },
  {
    title: "One time Payment",
    description:
      "Pay as you Go model allows you to buy once and use without bothering about reccuring payments.",
    icon: DollarSign,
  },
];

const pricingPlans = [
  {
    name: "Small Pack",
    credits: 1000,
    price: 100,
    features: ["Basic automation", "Standard support", "1 workflow"],
  },
  {
    name: "Medium Pack",
    credits: 5000,
    price: 500,
    features: [
      "Advanced automation",
      "Priority support",
      "5 workflows",
      "AI extraction",
    ],
    highlighted: true,
  },
  {
    name: "Large Pack",
    credits: 10000,
    price: 1000,
    features: [
      "Enterprise automation",
      "24/7 support",
      "Unlimited workflows",
      "Custom solutions",
    ],
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Data Analyst",
    content:
      "This platform has revolutionized our data collection process. The AI extraction is incredibly accurate!",
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    content:
      "The workflow builder is intuitive and powerful. We've automated tasks that used to take hours.",
  },
  {
    name: "Emily Rodriguez",
    role: "Developer",
    content:
      "The API integration was seamless. We've built custom solutions that save us countless hours.",
  },
  {
    name: "David Kim",
    role: "Business Owner",
    content:
      "The ROI has been incredible. We've cut our data collection costs by 70%.",
  },
  {
    name: "Lisa Patel",
    role: "Marketing Director",
    content:
      "The automation capabilities have transformed our marketing data collection process.",
  },
  {
    name: "James Wilson",
    role: "CTO",
    content:
      "Enterprise-grade reliability with the flexibility we needed. Highly recommended!",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Automate Your Web Data Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Powerful web automation and data extraction platform powered by AI.
            Build workflows, extract data, and automate tasks with ease.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center items-center"
          >
            <SignedOut>
              <Link
                href={"/sign-in"}
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Get Started
                <ArrowRight className="size-4 stroke-background" />
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href={"/home"}
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Dashboard
                <ArrowRight className="size-4 stroke-background" />
              </Link>
            </SignedIn>
            <Link
              href={"/docs"}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Documentation
              <ArrowRight className="size-4 stroke-foreground" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 text-primary mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full ${
                    plan.highlighted ? "border-primary shadow-lg" : ""
                  }`}
                >
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">
                        Rs. {plan.price}
                      </span>
                      <span className="text-muted-foreground">/pack</span>
                    </div>
                    <CardDescription>{plan.credits} Credits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={"/sign-up"}
                      className={cn(
                        "w-full",
                        buttonVariants({
                          variant: plan.highlighted ? "default" : "outline",
                        })
                      )}
                    >
                      Get Started
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-4">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo />
              <p className="mt-4 text-muted-foreground">
                Powerful web automation and data extraction platform powered by
                AI.
              </p>
            </div>
            <div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs/quickstart"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://github.com/n1shan1"
                    className="text-muted-foreground hover:text-foreground flex gap-2 items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="size-4" />
                    Github
                  </Link>
                  <Link
                    href="https://linkedin.com/in/nishantdev"
                    className="text-muted-foreground hover:text-foreground flex gap-2 items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="size-4" />
                    Linkedin
                  </Link>
                  <Link
                    href="https://instagram.com/niishantdev"
                    className="text-muted-foreground hover:text-foreground flex gap-2 items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="size-4" />
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>© 2025 Flow Scrape. All rights reserved.</p>
            <p>github.com/n1shan1</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/docs"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <SignedOut>
            <Link
              href={"/sign-in"}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Login
            </Link>
            <Link
              href={"/sign-up"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Get Started
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href={"/home"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Dashboard
              <ArrowRight className="size-4 stroke-background" />
            </Link>
            <UserButton />
          </SignedIn>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
