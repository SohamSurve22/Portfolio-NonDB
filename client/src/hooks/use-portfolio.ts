import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { projects, skills, experience, certifications } from "../lib/data";
import type { InsertMessage } from "@shared/schema";

// Projects Hook
export function useProjects() {
  return useQuery({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      return projects;
    },
  });
}

// Skills Hook
export function useSkills() {
  return useQuery({
    queryKey: [api.skills.list.path],
    queryFn: async () => {
      return skills;
    },
  });
}

// Experience Hook
export function useExperience() {
  return useQuery({
    queryKey: [api.experience.list.path],
    queryFn: async () => {
      return experience;
    },
  });
}

// Certifications Hook
export function useCertifications() {
  return useQuery({
    queryKey: [api.certifications.list.path],
    queryFn: async () => {
      return certifications;
    },
  });
}

// Contact Hook
export function useSendMessage() {
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      console.log("Message sent (simulated):", data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      return { success: true };
    },
  });
}
