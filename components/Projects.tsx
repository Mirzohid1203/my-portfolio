
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";

export default function Projects({ projects }: { projects: any[] }) {
    if (!projects) return null;

    return (
        <section id="projects" className="py-20 relative bg-black/40">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A selection of projects I've worked on.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project: any, index: number) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition-shadow duration-300 border-white/10">
                                {/* Image placeholder could go here */}
                                <div className="h-48 bg-gradient-to-br from-purple-900/50 to-blue-900/50 w-full relative group">
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <Button size="icon" variant="secondary" className="rounded-full">
                                            <Github className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="default" className="rounded-full">
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle>{project.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tools?.map((tool: string) => (
                                            <span key={tool} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter>

                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
