
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BadgeCheck } from "lucide-react";

export default function Skills({ skills }: { skills: any[] }) {
    if (!skills) return null;

    return (
        <section id="skills" className="py-20 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Skills</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        My technical proficiency and tools I use regularly.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {skills.map((skill: any, index: number) => (
                        <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="bg-white/5 border-white/10 hover:border-purple-500/50 transition-colors cursor-default group">
                                <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                                    <BadgeCheck className="h-8 w-8 text-purple-500 group-hover:text-purple-400 transition-colors" />
                                    <span className="font-semibold text-center">{skill.name}</span>
                                    <span className="text-xs text-muted-foreground">{skill.category}</span>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
