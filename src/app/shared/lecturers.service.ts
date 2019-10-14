import { Injectable } from '@angular/core';
import { Lecturer } from './lecturer.model';

@Injectable({
  providedIn: 'root'
})
export class LecturersService {
  formData: Lecturer;

  constructor() { }
}
