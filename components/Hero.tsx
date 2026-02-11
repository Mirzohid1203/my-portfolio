
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Hero({ data }: { data: any }) {
    if (!data) return null;
    const { name, title, bio, contact } = data.owner;

    return (
        <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-muted-foreground">
                        Available for freelance work
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        I'm <span className="gradient-text">{name}</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-muted-foreground">
                        {title}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-lg">
                        {bio}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="#contact">
                            <Button size="lg" className="rounded-full">
                                Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="#projects">
                            <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/10">
                                View Work
                            </Button>
                        </Link>
                    </div>
                    <div className="flex gap-4 pt-4">
                        {contact.email && (
                            <a href={`mailto:${contact.email}`} className="text-muted-foreground hover:text-white transition-colors">
                                <Mail className="h-6 w-6" />
                            </a>
                        )}
                        {contact.github && (
                            <a href={contact.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                                <Github className="h-6 w-6" />
                            </a>
                        )}
                        {contact.linkedin && (
                            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                                <Linkedin className="h-6 w-6" />
                            </a>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex items-center justify-center h-[400px] md:h-[500px] w-full"
                >
                    <div className="relative w-full h-full max-w-[350px] md:max-w-[450px] aspect-square bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full border border-white/10 overflow-hidden">
                        <Image
                            src="/me.jpg"
                            alt={name}
                            fill
                            className="object-contain p-4"
                            priority
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
