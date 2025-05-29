"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Lightbulb, GitBranch, Database, Settings } from "lucide-react";

function ConceptsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Core Concepts</h1>
                <p className="text-muted-foreground text-base">
                    Understanding the fundamental concepts of Flow Scrape
                </p>
            </div>

            <div className="space-y-8">
                {/* Workflows */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Workflows</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GitBranch className="w-5 h-5" />
                                What are Workflows?
                            </CardTitle>
                            <CardDescription>
                                The building blocks of automation in Flow Scrape
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-muted-foreground">
                                    A workflow is a sequence of connected nodes that perform specific tasks. Each workflow represents a complete automation process, from data collection to processing and storage.
                                </p>
                                <div className="bg-muted p-4 rounded-lg">
                                    <pre className="text-sm">
                                        {`// Example workflow structure
{
  "name": "Product Scraper",
  "nodes": [
    {
      "id": "browser-1",
      "type": "launch-browser",
      "next": "navigate-1"
    },
    {
      "id": "navigate-1",
      "type": "navigate-url",
      "next": "extract-1"
    }
  ]
}`}
                                    </pre>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Nodes */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Nodes</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="w-5 h-5" />
                                Understanding Nodes
                            </CardTitle>
                            <CardDescription>
                                The individual components that make up a workflow
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-muted-foreground">
                                    Nodes are the fundamental building blocks of workflows. Each node performs a specific function and can be connected to other nodes to create complex automation processes.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <h3 className="font-medium">Input Nodes</h3>
                                        <ul className="list-disc list-inside text-muted-foreground">
                                            <li>Launch Browser</li>
                                            <li>Navigate URL</li>
                                            <li>Click Element</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-medium">Processing Nodes</h3>
                                        <ul className="list-disc list-inside text-muted-foreground">
                                            <li>Extract Data</li>
                                            <li>Transform Data</li>
                                            <li>Filter Results</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Data Flow */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Data Flow</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="w-5 h-5" />
                                How Data Flows Through Nodes
                            </CardTitle>
                            <CardDescription>
                                Understanding how data moves through your workflow
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-muted-foreground">
                                    Data flows through nodes in a sequential manner. Each node can:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Receive data from previous nodes</li>
                                    <li>Process or transform the data</li>
                                    <li>Pass the results to the next node</li>
                                    <li>Store data for later use</li>
                                </ul>
                                <Alert>
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>Data Persistence</AlertTitle>
                                    <AlertDescription>
                                        Data can be stored at any point in the workflow using storage nodes, allowing you to save and retrieve information as needed.
                                    </AlertDescription>
                                </Alert>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Best Practices */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lightbulb className="w-5 h-5" />
                                Workflow Design Tips
                            </CardTitle>
                            <CardDescription>
                                Guidelines for creating efficient and maintainable workflows
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <h3 className="font-medium">1. Modular Design</h3>
                                    <p className="text-muted-foreground">
                                        Break down complex workflows into smaller, reusable components. This makes your workflows easier to maintain and debug.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-medium">2. Error Handling</h3>
                                    <p className="text-muted-foreground">
                                        Always include error handling nodes to gracefully handle unexpected situations and prevent workflow failures.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-medium">3. Data Validation</h3>
                                    <p className="text-muted-foreground">
                                        Validate data at each step to ensure the quality and integrity of your results.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-medium">4. Performance Optimization</h3>
                                    <p className="text-muted-foreground">
                                        Use parallel processing where possible and optimize data storage to improve workflow performance.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Advanced Concepts */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Advanced Concepts</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Conditional Logic</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Use conditional nodes to create dynamic workflows that adapt to different scenarios and data conditions.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Loops and Iterations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Implement loops to process multiple items or repeat actions until certain conditions are met.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Parallel Processing</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Run multiple nodes simultaneously to improve performance and handle complex data processing tasks.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Error Recovery</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Implement robust error handling and recovery mechanisms to ensure your workflows can handle unexpected situations.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ConceptsPage; 