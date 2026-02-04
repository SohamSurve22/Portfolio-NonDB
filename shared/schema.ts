import { z } from "zod";

export const insertMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export const insertCertificationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  url: z.string().optional(),
  pdfData: z.string().optional(),
  pdfUrl: z.string().optional(),
  contentType: z.string().optional(),
});

// For backward compatibility with shared/routes.ts
export const projects = { $inferSelect: {} as Project };
export const skills = { $inferSelect: {} as Skill };
export const experience = { $inferSelect: {} as Experience };
export const certifications = { $inferSelect: {} as Certification };

// === EXPLICIT API TYPES ===

export type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string | null;
  repoUrl?: string | null;
  featured?: boolean | null;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  proficiency?: number | null;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string | null;
  imageUrl?: string | null;
  url?: string | null;
  pdfData?: string | null; // Base64 encoded PDF data
  pdfUrl?: string | null; // Static file path e.g. "/certifications/my-cert.pdf"
  contentType?: string | null; // e.g. "application/pdf"
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: Date | null;
};

export type InsertMessage = {
  name: string;
  email: string;
  message: string;
};

export type InsertCertification = z.infer<typeof insertCertificationSchema>;
