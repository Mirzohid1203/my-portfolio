
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";

export default function Projects({ projects }: { projects: any[] }) {
    if (!projects) return null;

    return (
        <section id="projects" className="py-20 relative bg-muted/20">
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
                            <a
                                href={project.link || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full cursor-pointer group/card"
                            >
                                <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 border-border group-hover/card:border-purple-500/50">
                                    {/* Image placeholder could go here */}
                                    <div className="h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 w-full relative overflow-hidden">
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium border border-white/20">
                                                Loyiha ko'rish <ExternalLink className="inline-block ml-1 h-3 w-3" />
                                            </span>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="group-hover/card:text-purple-500 transition-colors">{project.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tools?.map((tool: string) => (
                                                <span key={tool} className="text-xs px-2 py-1 rounded-full bg-muted border border-border">
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter />
                                </Card>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
