import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './books/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiurl = "http://localhost:3000/books"; 

  constructor(private http: HttpClient ) { }

  getAll() : Observable <Book[]>{
    return this.http.get<Book[]>(this.apiurl)
}
save(book: Book): Observable<Book>{
  return this.http.post<Book>(this.apiurl,book);
}
delete(book: Book): Observable<void>{
  return this.http.delete<void>(`${this.apiurl}/${book.id}`);
}

update(book: Book) : Observable<Book>{
  return this.http.put<Book>(`${this.apiurl}/${book.id}`,book);
}
}