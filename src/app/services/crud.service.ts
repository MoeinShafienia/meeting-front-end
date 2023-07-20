import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProfessorStatus} from '../models/professor-status.model';
import {HttpClient} from '@angular/common/http';
import {DateStatus} from '../models/date-status.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private api = 'http://localhost:3000/api';
  private professorsStatus$ = new BehaviorSubject<Partial<ProfessorStatus>[]>([]);
  constructor(private http: HttpClient) { }

  loadProfessorStatus(id: string): void{
    this.http.get(`${this.api}/meeting/${id}/professorStatus`).subscribe(
        (res: any) => {
          this.getDateStatus(res, id);
        }
    );
  }

  getDateStatus(professorsStatus:  Partial<ProfessorStatus>[], id: string): void {
    this.http.get(`${this.api}/meeting/${id}/dateStatus`).subscribe(
        (res: any) => {
          const dateStatus = res as DateStatus[];
          professorsStatus.forEach(r => r.dateStatus = []);
          dateStatus.forEach(d => {
              professorsStatus.forEach(f => {
                  f.dateStatus.push({
                      id: d.id,
                      value: d.time,
                      canFinilize: d.canFinilize,
                      status: d.professorIds.includes(f.id),
                  });
              });
          });
          this.professorsStatus$.next(professorsStatus);
        },
    )
  }

  getProfessorsStatus$(): Observable<Partial<ProfessorStatus>[]> {
    return this.professorsStatus$.asObservable();
  }
}
