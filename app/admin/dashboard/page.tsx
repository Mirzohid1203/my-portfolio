
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Save, ArrowLeft } from "lucide-react";

// Since the user wants to edit everything: Owner info, Skills, Projects, Experience.

export default function AdminDashboard() {
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check auth
        const token = localStorage.getItem("admin_token");
        if (!token) {
            router.push("/admin");
            return;
        }

        // Fetch data
        fetch("/api/data")
            .then((res) => res.json())
            .then((json) => {
                setData(json);
            });

        // Fetch messages
        fetch("/api/contact")
            .then((res) => res.json())
            .then((json) => {
                setMessages(json);
                setLoading(false);
            });
    }, [router]);

    const handleSave = async () => {
        try {
            const res = await fetch("/api/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                alert("Saved successfully!");
            } else {
                alert("Failed to save.");
            }
        } catch (error) {
            alert("Error saving data");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        router.push("/admin");
    };

    const deleteMessage = async (id: string) => {
        if (!confirm("O'chirilsinmi?")) return;
        try {
            const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMessages(messages.filter(m => m.id !== id));
            }
        } catch (error) {
            alert("Xato");
        }
    };

    // Generic handlers
    const handleOwnerChange = (field: string, value: string) => {
        setData({ ...data, owner: { ...data.owner, [field]: value } });
    };

    const handleContactChange = (field: string, value: string) => {
        setData({ ...data, owner: { ...data.owner, contact: { ...data.owner.contact, [field]: value } } });
    };

    // Array handlers
    const deleteItem = (section: string, index: number) => {
        const newData = { ...data };
        newData[section].splice(index, 1);
        setData(newData);
    };

    const addItem = (section: string, template: any) => {
        const newData = { ...data };
        newData[section].push({ ...template, id: Date.now().toString() });
        setData(newData);
    };

    const updateArrayItem = (section: string, index: number, field: string, value: any) => {
        const newData = { ...data };
        newData[section][index][field] = value;
        setData(newData);
    };

    if (loading) return <div className="p-10 text-white">Loading Admin...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => router.push("/")}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                            <Save className="mr-2 h-4 w-4" /> Save Changes
                        </Button>
                        <Button variant="destructive" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-5 bg-white/5 text-white">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                        <TabsTrigger value="messages">Messages</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-4 text-white">
                        <Card className="bg-white/5 border-white/10">
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Edit your details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-muted-foreground">Name</label>
                                        <Input value={data.owner.name} onChange={(e) => handleOwnerChange("name", e.target.value)} className="bg-black/20" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground">Title</label>
                                        <Input value={data.owner.title} onChange={(e) => handleOwnerChange("title", e.target.value)} className="bg-black/20" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground">Bio</label>
                                    <Textarea value={data.owner.bio} onChange={(e) => handleOwnerChange("bio", e.target.value)} className="bg-black/20" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-muted-foreground">Email</label>
                                        <Input value={data.owner.contact.email} onChange={(e) => handleContactChange("email", e.target.value)} className="bg-black/20" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground">Phone</label>
                                        <Input value={data.owner.contact.phone} onChange={(e) => handleContactChange("phone", e.target.value)} className="bg-black/20" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground">Instagram</label>
                                        <Input value={data.owner.contact.instagram} onChange={(e) => handleContactChange("instagram", e.target.value)} className="bg-black/20" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground">Telegram</label>
                                        <Input value={data.owner.contact.telegram} onChange={(e) => handleContactChange("telegram", e.target.value)} className="bg-black/20" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="skills" className="space-y-4">
                        <Card className="bg-white/5 border-white/10">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Skills</CardTitle>
                                    <CardDescription>Manage your technical skills.</CardDescription>
                                </div>
                                <Button size="sm" onClick={() => addItem('skills', { name: "New Skill", category: "Other" })}>
                                    <Plus className="mr-2 h-4 w-4" /> Add Skill
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {data.skills.map((skill: any, index: number) => (
                                    <div key={skill.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-md">
                                        <Input value={skill.name} onChange={(e) => updateArrayItem('skills', index, 'name', e.target.value)} className="bg-black/20 w-1/3" placeholder="Skill Name" />
                                        <Input value={skill.category} onChange={(e) => updateArrayItem('skills', index, 'category', e.target.value)} className="bg-black/20 w-1/3" placeholder="Category" />
                                        <Button variant="destructive" size="icon" onClick={() => deleteItem('skills', index)}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="projects" className="space-y-4">
                        <Card className="bg-white/5 border-white/10">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Projects</CardTitle>
                                    <CardDescription>Showcase your work.</CardDescription>
                                </div>
                                <Button size="sm" onClick={() => addItem('projects', { title: "New Project", description: "Desc", tools: [], link: "#" })}>
                                    <Plus className="mr-2 h-4 w-4" /> Add Project
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {data.projects.map((project: any, index: number) => (
                                    <div key={project.id} className="space-y-3 bg-white/5 p-4 rounded-md border border-white/10">
                                        <div className="flex gap-4">
                                            <Input value={project.title} onChange={(e) => updateArrayItem('projects', index, 'title', e.target.value)} className="bg-black/20 font-bold" placeholder="Project Title" />
                                            <Button variant="destructive" size="icon" onClick={() => deleteItem('projects', index)}>
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs text-muted-foreground">Tools (comma separated)</label>
                                                <Input
                                                    value={project.tools?.join(", ") || ""}
                                                    onChange={(e) => updateArrayItem('projects', index, 'tools', e.target.value.split(",").map(s => s.trim()))}
                                                    className="bg-black/20"
                                                    placeholder="React, Next.js, Tailwind"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-muted-foreground">Link</label>
                                                <Input
                                                    value={project.link || ""}
                                                    onChange={(e) => updateArrayItem('projects', index, 'link', e.target.value)}
                                                    className="bg-black/20"
                                                    placeholder="https://github.com/..."
                                                />
                                            </div>
                                        </div>
                                        <Textarea value={project.description} onChange={(e) => updateArrayItem('projects', index, 'description', e.target.value)} className="bg-black/20" placeholder="Description" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="experience" className="space-y-4">
                        <Card className="bg-white/5 border-white/10">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Experience</CardTitle>
                                    <CardDescription>Work history.</CardDescription>
                                </div>
                                <Button size="sm" onClick={() => addItem('experience', { role: "Role", company: "Company", dates: "2023-Present", description: "..." })}>
                                    <Plus className="mr-2 h-4 w-4" /> Add Experience
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {data.experience.map((exp: any, index: number) => (
                                    <div key={exp.id} className="bg-white/5 p-4 rounded-md space-y-3 border border-white/10">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input value={exp.role} onChange={(e) => updateArrayItem('experience', index, 'role', e.target.value)} className="bg-black/20" placeholder="Role" />
                                            <Input value={exp.company} onChange={(e) => updateArrayItem('experience', index, 'company', e.target.value)} className="bg-black/20" placeholder="Company" />
                                        </div>
                                        <div className="flex justify-between items-center gap-4">
                                            <Input value={exp.dates} onChange={(e) => updateArrayItem('experience', index, 'dates', e.target.value)} className="bg-black/20 w-1/2" placeholder="Dates" />
                                            <Button variant="destructive" size="icon" onClick={() => deleteItem('experience', index)}>
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Textarea value={exp.description} onChange={(e) => updateArrayItem('experience', index, 'description', e.target.value)} className="bg-black/20" placeholder="Description" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                        <Card className="bg-white/5 border-white/10 mt-8">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Education</CardTitle>
                                    <CardDescription>Academic background.</CardDescription>
                                </div>
                                <Button size="sm" onClick={() => addItem('education', { school: "School", degree: "Degree", dates: "2020-2024", description: "..." })}>
                                    <Plus className="mr-2 h-4 w-4" /> Add Education
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {data.education.map((edu: any, index: number) => (
                                    <div key={edu.id} className="bg-white/5 p-4 rounded-md space-y-3 border border-white/10">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input value={edu.school} onChange={(e) => updateArrayItem('education', index, 'school', e.target.value)} className="bg-black/20" placeholder="School" />
                                            <Input value={edu.degree} onChange={(e) => updateArrayItem('education', index, 'degree', e.target.value)} className="bg-black/20" placeholder="Degree" />
                                        </div>
                                        <div className="flex justify-between items-center gap-4">
                                            <Input value={edu.dates} onChange={(e) => updateArrayItem('education', index, 'dates', e.target.value)} className="bg-black/20 w-1/2" placeholder="Dates" />
                                            <Button variant="destructive" size="icon" onClick={() => deleteItem('education', index)}>
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Textarea value={edu.description} onChange={(e) => updateArrayItem('education', index, 'description', e.target.value)} className="bg-black/20" placeholder="Description" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="messages" className="space-y-4">
                        <Card className="bg-white/5 border-white/10">
                            <CardHeader>
                                <CardTitle>Messages</CardTitle>
                                <CardDescription>Messages from your portfolio contact form.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {messages.length === 0 ? (
                                    <p className="text-muted-foreground text-center py-10">No messages yet.</p>
                                ) : (
                                    messages.map((msg: any) => (
                                        <div key={msg.id} className="bg-white/5 p-4 rounded-md space-y-2 border border-white/10 relative group">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold">{msg.name}</h4>
                                                    <p className="text-xs text-purple-400">{msg.email}</p>
                                                    <p className="text-[10px] text-muted-foreground">{new Date(msg.date).toLocaleString()}</p>
                                                </div>
                                                <Button variant="destructive" size="icon" onClick={() => deleteMessage(msg.id)}>
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <p className="text-sm mt-3 text-gray-300 italic">"{msg.message}"</p>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
