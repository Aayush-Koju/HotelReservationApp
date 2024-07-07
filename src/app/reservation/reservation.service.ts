import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = "http://localhost:3001"

  private reservations: Reservation[] = [];

  constructor(private http: HttpClient) {}

  //CRUD

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + "/reservations");
  }

  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUrl + "/reservation/"+id);
  }

  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();

    this.reservations.push(reservation);
    console.log(this.reservations);
  }

  deleteReservation(id: String): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/reservation/"+id);
  }

  updateReservation(id: String, updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === id)
    this.reservations[index] = updatedReservation;
  }
}
