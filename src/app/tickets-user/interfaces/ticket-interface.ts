export interface ticket {
  _id?: string | undefined | null;
  CreatedAt?: Date | undefined;
  userId: string | undefined | null;
  problemType: string | undefined | null;
  description: string | undefined | null;
  status: string | undefined | null;
  imagenUrl?: string | undefined | null;  // Usado para mostrar la URL de la imagen
  image?: { data: number[]; type: string } | null; // Agregamos el campo image
}
