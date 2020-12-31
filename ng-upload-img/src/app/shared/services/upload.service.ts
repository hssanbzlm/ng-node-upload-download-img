import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  upload(idUser: string, formData: FormData) {
    const url = `http://localhost:3000/user/post/${idUser}`;
    return this.http.post(url, formData);
  }

  download(idUser: string) {
    const url = `http://localhost:3000/user/get/${idUser}`;
    console.log('HEREE');
    return this.http.get<User>(url);
  }
}
