import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-asistencia',
  templateUrl: './historial-asistencia.page.html',
  styleUrls: ['./historial-asistencia.page.scss'],
})
export class HistorialAsistenciaPage {
  selectedDate: string = '';  
  attendanceRecords: { date: string, status: string }[] = [];  
  constructor(private router: Router) {}


  fetchAttendance() {
    
    this.attendanceRecords = [
      { date: '2024-09-18', status: 'Presente' },
      { date: '2024-09-17', status: 'Ausente' },
      { date: '2024-09-16', status: 'Presente' },
    ];
  }

 
  navigateToHomeAlumno() {
    this.router.navigate(['/home-alumno']);
  }
}
