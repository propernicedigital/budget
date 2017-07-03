import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { BoardService } from '../services/board.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {

  board = {};
  boards = [];
  isLoading = true;
  isEditing = false;

  addBoardForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private boardService: BoardService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getBoards();
    this.addBoardForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });
  }

  getBoards() {
    this.boardService.getBoards().subscribe(
      data => this.boards = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addBoard() {
    this.boardService.addBoard(this.addBoardForm.value).subscribe(
      res => {
        const newBoard = res.json();
        this.boards.push(newBoard);
        this.addBoardForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(board) {
    this.isEditing = true;
    this.board = board;
  }

  cancelEditing() {
    this.isEditing = false;
    this.board = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the boards to reset the editing
    this.getBoards();
  }

  editBoard(board) {
    this.boardService.editBoard(board).subscribe(
      res => {
        this.isEditing = false;
        this.board = board;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteBoard(board) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.boardService.deleteBoard(board).subscribe(
        res => {
          const pos = this.boards.map(elem => elem._id).indexOf(board._id);
          this.boards.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
