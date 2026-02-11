"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

export default function Contact({ contact }: { contact: any }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert("Xabaringiz yuborildi! Rahmat.");
                setFormData({ name: "", email: "", message: "" });
            } else {
                alert("Xatolik yuz berdi. Keyinroq urinib ko'ring.");
            }
        } catch (error) {
            alert("Server bilan bog'lanishda xatolik.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!contact) return null;

    return (
        <section id="contact" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Have a project in mind or just want to say hi?
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <Card className="glass-card border-border bg-muted/30 h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-lg text-foreground">Email</h4>
                                    <a href={`mailto:${contact.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                                        {contact.email}
                                    </a>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg text-foreground">Phone</h4>
                                    <p className="text-muted-foreground">{contact.phone}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg text-foreground">Socials</h4>
                                    <div className="flex gap-4 mt-2">
                                        <a href={contact.instagram} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-pink-500 transition-colors">Instagram</a>
                                        <a href={contact.telegram} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-blue-500 transition-colors">Telegram</a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="bg-muted/30 border-border focus:border-purple-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="bg-muted/30 border-border focus:border-purple-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="How can I help you?"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="bg-muted/30 border-border focus:border-purple-500"
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Sending..." : "Send Message"} <Send className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
