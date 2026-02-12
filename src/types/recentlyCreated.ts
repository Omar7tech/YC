export interface ProjectCard {
  id: number;
  image: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface RecentlyCreatedData {
  projects: ProjectCard[];
}
