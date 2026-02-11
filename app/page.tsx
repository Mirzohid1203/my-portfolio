
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/data");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchData();
  }, []);

  if (!data || data.error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground px-6 text-center">
        {data?.error ? (
          <div>
            <h1 className="text-2xl font-bold text-red-500 mb-2">Xatolik yuz berdi</h1>
            <p className="text-muted-foreground">{data.error}</p>
            <p className="text-sm mt-4 opacity-20">Firebase qoidalari (Rules) ochiq ekanligiga ishonch hosil qiling.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="animate-pulse text-muted-foreground">Yuklanmoqda...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-purple-500/30">
      <Navbar />
      <Hero data={data} />
      <Skills skills={data.skills || []} />
      <Experience experience={data.experience || []} education={data.education || []} />
      <Projects projects={data.projects || []} />
      <Contact contact={data.owner?.contact} />

      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border bg-background">
        <p>© {new Date().getFullYear()} {data.owner?.name}. Barcha huquqlar himoyalangan.</p>
      </footer>
    </main>
  );
}
