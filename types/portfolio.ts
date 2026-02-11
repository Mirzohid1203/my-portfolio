
export interface PortfolioData {
    owner: {
        name: string;
        title: string;
        bio: string;
        contact: {
            email: string;
            instagram: string;
            telegram: string;
            phone: string;
        };
    };
    experience: ExperienceItem[];
    education: EducationItem[];
    skills: SkillItem[];
    projects: ProjectItem[];
}

export interface ExperienceItem {
    id: string;
    company: string;
    role: string;
    dates: string;
    description: string;
}

export interface EducationItem {
    id: string;
    school: string;
    degree: string;
    dates: string;
    description: string;
}

export interface SkillItem {
    id: string;
    name: string;
    category: string;
}

export interface ProjectItem {
    id: string;
    title: string;
    description: string;
    tools: string[];
    link: string;
}
