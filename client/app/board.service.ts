import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BoardService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getBoards(): Observable<any> {
    return this.http.get('/api/boards').map(res => res.json());
  }

  countBoards(): Observable<any> {
    return this.http.get('/api/board/count').map(res => res.json());
  }

  addBoards(board): Observable<any> {
    return this.http.post('/api/board', JSON.stringify(board), this.options);
  }

  getBoard(board): Observable<any> {
    return this.http.get(`/api/boards/${board._id}`).map(res => res.json());
  }

  editBoards(board): Observable<any> {
    return this.http.put(`/api/boards/${board._id}`, JSON.stringify(board), this.options);
  }

  deleteBoards(board): Observable<any> {
    return this.http.delete(`/api/boards/${board._id}`, this.options);
  }

}
