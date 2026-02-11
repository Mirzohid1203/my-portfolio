
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

export default function Experience({ experience, education }: { experience: any[], education: any[] }) {
    if (!experience && !education) return null;

    return (
        <section id="experience" className="py-20 bg-muted/20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Experience & Education</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Experience */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <Briefcase className="h-6 w-6 text-purple-500" /> Experience
                        </h3>
                        <div className="space-y-8 relative pl-6 border-l border-border">
                            {experience.map((item: any, index: number) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-6 before:absolute before:left-[-29px] before:top-1 before:h-4 before:w-4 before:rounded-full before:bg-purple-500 before:border-4 before:border-background"
                                >
                                    <h4 className="text-lg font-bold">{item.role}</h4>
                                    <span className="text-sm text-purple-400">{item.company}</span>
                                    <div className="flex items-center text-xs text-muted-foreground mt-1 mb-2">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {item.dates}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <Briefcase className="h-6 w-6 text-blue-500" /> Education
                        </h3>
                        <div className="space-y-8 relative pl-6 border-l border-border">
                            {education.map((item: any, index: number) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-6 before:absolute before:left-[-29px] before:top-1 before:h-4 before:w-4 before:rounded-full before:bg-blue-500 before:border-4 before:border-background"
                                >
                                    <h4 className="text-lg font-bold">{item.school}</h4>
                                    <span className="text-sm text-blue-400">{item.degree}</span>
                                    <div className="flex items-center text-xs text-muted-foreground mt-1 mb-2">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {item.dates}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
