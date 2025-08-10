import { Profesor } from "./profesor.interface";

export interface Materia {
    id?: number;
    nombre: string;
    codigo: string;
    creditos: number;
    profesorId?: number;
    estudianteId?: number | null;
    fechaCreacion?: string;
}

export interface MateriaRequest {
   idMateria: number;
   idEstudiante: number;
}

export interface MateriaAsignada {
    id?: number;
    nombre: string;
    codigo: string;
    creditos: number;
    profesor?: Profesor;
    fechaCreacion?: string;
}