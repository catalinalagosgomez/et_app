export interface Asistencia {
  date: Date | string;  // Puede ser Date o string dependiendo de cómo manejes las fechas
  status: string;       // Para los estados 'Presente' o 'Ausente'
  // ... otras propiedades que necesites
} 