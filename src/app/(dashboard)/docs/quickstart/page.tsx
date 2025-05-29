"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

function QuickstartPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Quick Start Guide</h1>
                <p className="text-muted-foreground text-base">
                    Get started with Flow Scrape in minutes
                </p>
            </div>

            <div className="space-y-8">
                {/* Prerequisites */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-medium">Modern Web Browser</h3>
                                        <p className="text-muted-foreground">Chrome, Firefox, or Edge for the best experience</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-medium">Flow Scrape Account</h3>
                                        <p className="text-muted-foreground">Sign up for a free account to get started</p>
                                    </div>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {/* Getting Started */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>1. Create Your First Workflow</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                    <li>Click the "New Workflow" button in the dashboard</li>
                                    <li>Give your workflow a descriptive name</li>
                                    <li>Choose a template or start from scratch</li>
                                </ol>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>2. Add Your First Node</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4">In the workflow editor:</p>
                                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                    <li>Click the "+" button in the toolbar</li>
                                    <li>Select "Launch Browser" from the node menu</li>
                                    <li>Configure the browser settings</li>
                                    <li>Click "Save" to add the node</li>
                                </ol>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>3. Run Your Workflow</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                    <li>Click the "Run" button in the top right</li>
                                    <li>Monitor the execution in real-time</li>
                                    <li>View the results in the output panel</li>
                                </ol>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Basic Example */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Basic Example: Web Scraping</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle>Simple Web Scraping Workflow</CardTitle>
                            <CardDescription>
                                This example shows how to scrape data from a website
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-muted-foreground">
                                    Create a workflow with these steps:
                                </p>
                                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                    <li>Add a "Launch Browser" node</li>
                                    <li>Add a "Navigate URL" node and set the target website</li>
                                    <li>Add an "Extract Text" node to get the data you need</li>
                                    <li>Add a "Save Data" node to store the results</li>
                                </ol>
                                <Alert>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Pro Tip</AlertTitle>
                                    <AlertDescription>
                                        Use the visual workflow editor to connect nodes and configure their settings. The editor provides real-time validation and suggestions.
                                    </AlertDescription>
                                </Alert>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Next Steps */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Learn More</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/docs/concepts" className="text-primary hover:underline">
                                            Understanding Core Concepts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/docs/nodes" className="text-primary hover:underline">
                                            Explore Available Nodes
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/docs/examples" className="text-primary hover:underline">
                                            View More Examples
                                        </Link>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Need Help?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/contact" className="text-primary hover:underline">
                                            Contact Support
                                        </Link>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default QuickstartPage; 