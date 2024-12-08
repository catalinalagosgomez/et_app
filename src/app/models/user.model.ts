export interface User {
    uid: string;
    email: string;
    password: string;
    name: string;
    role: 'user' | 'profesor';  // El campo 'role' define el rol del usuario (alumno o profesor)
  }
  
