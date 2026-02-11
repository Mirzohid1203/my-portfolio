
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, ArrowLeft, Loader2, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                localStorage.setItem("admin_token", "true");
                router.push("/admin/dashboard");
            } else {
                const data = await res.json();
                setError(data.message || "Email yoki parol noto'g'ri");
            }
        } catch (err) {
            setError("Server bilan bog'lanishda xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[150px]"
                />
                {/* Particle/Dot Mesh Grid */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="z-10 w-full max-w-md px-6"
            >
                <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-white/40 hover:text-white mb-8 transition-all duration-300 group"
                >
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center mr-3 group-hover:border-white/30 transition-colors">
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    Sahifaga qaytish
                </Link>

                <div className="relative group">
                    {/* Glow effect behind the card */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                    <Card className="border-white/10 bg-black/60 backdrop-blur-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] rounded-[1.8rem] relative overflow-hidden border-t-white/20">
                        <CardHeader className="space-y-4 pt-10 text-center">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mx-auto bg-gradient-to-b from-white/10 to-transparent w-16 h-16 rounded-[1.2rem] flex items-center justify-center border border-white/10 shadow-inner"
                            >
                                <ShieldCheck className="h-8 w-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                            </motion.div>

                            <div className="space-y-2">
                                <CardTitle className="text-3xl font-extrabold tracking-tight text-white">
                                    Xush Kelibsiz
                                </CardTitle>
                                <CardDescription className="text-white/50 text-base font-medium">
                                    Boshqaruv markaziga kirish
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="pb-10 px-8">
                            <form onSubmit={handleLogin} className="space-y-6">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="space-y-2.5"
                                >
                                    <label className="text-sm font-semibold text-white/70 ml-1">Email Manzil</label>
                                    <div className="relative group/field">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-4 w-4 text-white/30 group-focus-within/field:text-purple-400 transition-colors" />
                                        </div>
                                        <Input
                                            type="email"
                                            placeholder="nomi@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 h-14 pl-12 rounded-[1rem] transition-all text-white placeholder:text-white/20"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-2.5"
                                >
                                    <div className="flex items-center justify-between ml-1">
                                        <label className="text-sm font-semibold text-white/70">Parol</label>
                                    </div>
                                    <div className="relative group/field">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-4 w-4 text-white/30 group-focus-within/field:text-blue-400 transition-colors" />
                                        </div>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 h-14 pl-12 rounded-[1rem] transition-all text-white placeholder:text-white/20"
                                        />
                                    </div>
                                </motion.div>

                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium flex items-center justify-center gap-2"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                            {error}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    <Button
                                        type="submit"
                                        className="w-full h-14 bg-white text-black hover:bg-white/90 font-bold text-lg rounded-[1rem] transition-all shadow-[0_10px_30px_-10px_rgba(255,255,255,0.3)] relative overflow-hidden group/btn"
                                        disabled={loading}
                                    >
                                        <span className="relative z-10 flex items-center justify-center">
                                            {loading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    Tekshirilmoqda...
                                                </>
                                            ) : (
                                                "Tizimga Kirish"
                                            )}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                                    </Button>
                                </motion.div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12 space-y-4"
                >
                    <div className="flex items-center justify-center gap-6">
                        <div className="w-12 h-[1px] bg-white/10"></div>
                        <p className="text-white/20 text-[0.7rem] uppercase tracking-[0.2em] font-bold">Secure Access</p>
                        <div className="w-12 h-[1px] bg-white/10"></div>
                    </div>
                    <p className="text-white/30 text-xs">
                        © {new Date().getFullYear()} MM Portfolio. Boshqaruv faqat ruxsat etilgan shaxslar uchun.
                    </p>
                </motion.div>
            </motion.div>

            {/* Decorative Blur Orbs */}
            <div className="absolute top-[20%] right-[-5%] w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[20%] left-[-5%] w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
    );
}
