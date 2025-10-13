export interface Project {
    title: string;
    imageUrl: string;
    date: string;
    tags: string[];
    description: string;
    links: {
        github?: string;
        winner?: string;
        report?: string;
        slides?: string;
    };
}
