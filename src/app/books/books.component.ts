import { Component } from '@angular/core';
import { Book } from './book.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  books: Book[]= [];
  formGroupBook : FormGroup
  isEditing: boolean=false;


  constructor(private service: BookService,
              private formBuilder:  FormBuilder
  ){
      this.formGroupBook = formBuilder.group({
          id : [''],
          titulo : [''],
          autor : [''],
          editora : [''],
          preco : ['']
      });

}
ngOnInit(): void {
  this.loadBooks();
}

loadBooks(){
  this.service.getAll().subscribe({
    next: json => this.books = json
 });
}
save() {
  this.service.save(this.formGroupBook.value).subscribe(
    {
      next: json => {
        this.books.push(json);
        this.formGroupBook.reset()
      }
    }
  )
}
delete(book: Book) {
  this.service.delete(book).subscribe({
    next: ()  => this.loadBooks()
      
    
  }
)
}
onClickupdate(book: Book) {
  this.isEditing=true;
 this.formGroupBook.setValue(book);
  }
clear(){

  this.isEditing=false;
  this.formGroupBook.reset()
}
update() {
  this.service.update(this.formGroupBook.value).subscribe(
   {
     next: () =>{ this.loadBooks();
       
     this.formGroupBook.reset()
     }
   }
  )
   }
}
