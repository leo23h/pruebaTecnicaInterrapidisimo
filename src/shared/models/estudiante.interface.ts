import { Materia } from "./materia.interface";

export interface Estudiante{
    id?: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono?: string;
    fechaCreacion?: string;
    
    materias?: Materia[];
}