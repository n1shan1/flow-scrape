"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Book, FileText, Globe, Key } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const docSections = [
  {
    title: "Getting Started",
    description:
      "Learn the basics of Flow Scrape and set up your first workflow",
    icon: Book,
    links: [
      { title: "Quick Start Guide", href: "/docs/quickstart" },
      { title: "Basic Concepts", href: "/docs/concepts" },
    ],
  },
  {
    title: "Core Features",
    description: "Essential features for web automation and data extraction",
    icon: Globe,
    links: [
      { title: "Browser Automation", href: "/docs/nodes/browser" },
      { title: "Data Extraction", href: "/docs/nodes/extraction" },
      { title: "Workflow Management", href: "/docs/workflows" },
    ],
  },
  {
    title: "Security",
    description: "Manage credentials and ensure secure operations",
    icon: Key,
    links: [
      { title: "Credential Management", href: "/docs/credentials" },
      { title: "Security Best Practices", href: "/docs/security" },
    ],
  },
  {
    title: "Examples",
    description: "Practical examples and use cases",
    icon: FileText,
    links: [{ title: "Common Use Cases", href: "/docs/examples" }],
  },
];

export default function DocsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
          <p className="text-muted-foreground text-base">
            Everything you need to know about Flow Scrape
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button
              onClick={() => router.push("/dashboard")}
              size="sm"
              className="flex items-center gap-2"
            >
              Continue to Dashboard
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>

      {/* Mobile authentication buttons */}
      <div className="md:hidden flex justify-center gap-3 mt-4">
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="w-full">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Button onClick={() => router.push("/dashboard")} className="w-full">
            Continue to Dashboard
          </Button>
          <div className="flex justify-center items-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>

      <section className="mt-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <section.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.href}
                          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(link.href);
                          }}
                        >
                          <span>{link.title}</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
