"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink, Github, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { Navbar } from "../page";

const contactMethods = [
  {
    title: "Email",
    description: "For support and inquiries",
    icon: Mail,
    value: "nishantdev03@gmail.com",
    href: "mailto:nishantdev03@gmail.com",
    buttonText: "Send Email",
  },
  {
    title: "GitHub",
    description: "Follow my open source projects.",
    icon: Github,
    value: "github.com/n1shan1",
    href: "https://github.com/n1shan1",
    buttonText: "View GitHub",
  },
  {
    title: "Twitter",
    description: "Stay updated with the latest news",
    icon: Twitter,
    value: "@n1sh_an1",
    href: "https://twitter.com/n1sh_an1",
    buttonText: "Follow Me",
  },
];

function ContactPage() {
  return (
    <div className="flex flex-col h-full w-full min-h-screen p-6 overflow-auto">
      <Navbar />
      <div className="h-[80px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center max-w-3xl mx-auto p-4"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Have questions about Flow Scrape? We'd love to hear from you. Here's
            how you can reach us.
          </p>
        </div>

        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Contact Information
            </CardTitle>
            <CardDescription className="text-center">
              Choose your preferred way to connect with our team
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-4 rounded-lg border"
              >
                <method.icon className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-1">{method.title}</h3>
                <p className="text-muted-foreground text-xs mb-2">
                  {method.description}
                </p>
                <p className="font-medium mb-4">{method.value}</p>
                <Button asChild className="w-full">
                  <Link
                    href={method.href}
                    target="_blank"
                    className="flex items-center justify-center gap-2"
                  >
                    {method.buttonText}
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default ContactPage;
