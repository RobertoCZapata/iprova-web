/**
 * Data Configuration File - Main Entry Point
 *
 * Este archivo re-exporta todos los datos desde los módulos organizados.
 * Los módulos originales están en lib/data/* para mejor organización.
 *
 * Los imports siguen funcionando igual:
 * import { services, teamMembers, contactInfo } from "@/lib/data"
 */

// Re-export everything from modular data files
export * from "./data/brand";
export * from "./data/navigation";
export * from "./data/contact";
export * from "./data/values";
export * from "./data/services";
export * from "./data/team";
export * from "./data/statistics";
export * from "./data/results";
export * from "./data/content";
