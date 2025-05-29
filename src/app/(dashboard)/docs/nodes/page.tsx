"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, MousePointer, Database, FileText, Code, Settings } from "lucide-react";

function NodesPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Nodes Reference</h1>
                <p className="text-muted-foreground text-base">
                    Comprehensive guide to all available nodes in Flow Scrape
                </p>
            </div>

            <Tabs defaultValue="browser" className="space-y-4">
                <TabsList className="grid grid-cols-3 md:grid-cols-6">
                    <TabsTrigger value="browser">Browser</TabsTrigger>
                    <TabsTrigger value="interaction">Interaction</TabsTrigger>
                    <TabsTrigger value="data">Data</TabsTrigger>
                    <TabsTrigger value="file">File</TabsTrigger>
                    <TabsTrigger value="logic">Logic</TabsTrigger>
                    <TabsTrigger value="utility">Utility</TabsTrigger>
                </TabsList>

                {/* Browser Nodes */}
                <TabsContent value="browser" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="w-5 h-5" />
                                Browser Nodes
                            </CardTitle>
                            <CardDescription>
                                Nodes for controlling browser instances and navigation
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Launch Browser</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Launches a new browser instance with specified configuration.
                                    </p>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <pre className="text-sm">
                                            {`{
  "type": "launch-browser",
  "config": {
    "headless": false,
    "browser": "chrome",
    "viewport": {
      "width": 1280,
      "height": 800
    }
  }
}`}
                                        </pre>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Navigate URL</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Navigates to a specified URL in the current browser instance.
                                    </p>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <pre className="text-sm">
                                            {`{
  "type": "navigate-url",
  "config": {
    "url": "https://example.com",
    "waitUntil": "networkidle0"
  }
}`}
                                        </pre>
                                    </div>
                                </div>

                                <Alert>
                                    <AlertTitle>Browser Management</AlertTitle>
                                    <AlertDescription>
                                        Always close browser instances when they're no longer needed to free up system resources.
                                    </AlertDescription>
                                </Alert>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Interaction Nodes */}
                <TabsContent value="interaction" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MousePointer className="w-5 h-5" />
                                Interaction Nodes
                            </CardTitle>
                            <CardDescription>
                                Nodes for interacting with web elements
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Click Element</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Clicks on a specified element using various selectors.
                                    </p>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <pre className="text-sm">
                                            {`{
  "type": "click-element",
  "config": {
    "selector": "#submit-button",
    "selectorType": "css",
    "waitForElement": true
  }
}`}
                                        </pre>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Type Text</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Types text into an input field or contenteditable element.
                                    </p>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <pre className="text-sm">
                                            {`{
  "type": "type-text",
  "config": {
    "selector": "input[name='search']",
    "text": "Search query",
    "delay": 100
  }
}`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Data Nodes */}
                <TabsContent value="data" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="w-5 h-5" />
                                Data Nodes
                            </CardTitle>
                            <CardDescription>
                                Nodes for extracting and processing data
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Extract Text</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Extracts text content from elements matching a selector.
                                    </p>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <pre className="text-sm">
                                            {`{
  "type": "extract-text",
  "config": {
    "selector": ".product-title",
    "multiple": true,
    "trim": true
  }
}`}
                                        </pre>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Extract Attributes</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Extracts attribute values from elements.
                                    </p>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <pre className="text-sm">
                                            {`{
  "type": "extract-attributes",
  "config": {
    "selector": "img",
    "attributes": ["src", "alt"],
    "multiple": true
  }
}`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* File Nodes */}
                <TabsContent value="file" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                File Nodes
                            </CardTitle>
                            <CardDescription>
                                Nodes for file operations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Save Data</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Saves extracted data to a file in various formats.
                                    </p>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <pre className="text-sm">
                                            {`{
  "type": "save-data",
  "config": {
    "format": "json",
    "path": "./data/output.json",
    "append": false
  }
}`}
                                        </pre>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Download File</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Downloads files from URLs or saves files from the browser.
                                    </p>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <pre className="text-sm">
                                            {`{
  "type": "download-file",
  "config": {
    "url": "https://example.com/file.pdf",
    "path": "./downloads/file.pdf"
  }
}`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Logic Nodes */}
                <TabsContent value="logic" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Code className="w-5 h-5" />
                                Logic Nodes
                            </CardTitle>
                            <CardDescription>
                                Nodes for controlling workflow logic
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Condition</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Evaluates conditions and branches workflow execution.
                                    </p>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <pre className="text-sm">
                                            {`{
  "type": "condition",
  "config": {
    "condition": "data.length > 0",
    "trueNode": "process-data",
    "falseNode": "handle-empty"
  }
}`}
                                        </pre>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Loop</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Repeats a sequence of nodes for each item in a collection.
                                    </p>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <pre className="text-sm">
                                            {`{
  "type": "loop",
  "config": {
    "items": "data.items",
    "node": "process-item",
    "maxIterations": 100
  }
}`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Utility Nodes */}
                <TabsContent value="utility" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="w-5 h-5" />
                                Utility Nodes
                            </CardTitle>
                            <CardDescription>
                                Helper nodes for common tasks
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Wait</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Pauses workflow execution for a specified duration.
                                    </p>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <pre className="text-sm">
                                            {`{
  "type": "wait",
  "config": {
    "duration": 5000,
    "unit": "milliseconds"
  }
}`}
                                        </pre>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Log</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Logs messages and data for debugging purposes.
                                    </p>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <pre className="text-sm">
                                            {`{
  "type": "log",
  "config": {
    "message": "Processing complete",
    "level": "info",
    "data": "extractedData"
  }
}`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default NodesPage; 