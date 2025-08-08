import { Materia } from './materia.interface';

export interface Profesor {
    id?: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono?: string;
    fechaCreacion?: string;
    materias?: Materia[];
}