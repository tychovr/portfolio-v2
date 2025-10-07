export type ProjectType = {
  title: string;
  description: string;
  imagePath: string;
  technologies: string[];
  github?: string;
  demo?: string;
};

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
