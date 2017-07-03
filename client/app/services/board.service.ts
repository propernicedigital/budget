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
    return this.http.get('/api/boards/count').map(res => res.json());
  }

  addBoard(board): Observable<any> {
    return this.http.post('/api/board', JSON.stringify(board), this.options);
  }

  getBoard(board): Observable<any> {
    return this.http.get(`/api/board/${board._id}`).map(res => res.json());
  }

  editBoard(board): Observable<any> {
    return this.http.put(`/api/board/${board._id}`, JSON.stringify(board), this.options);
  }

  deleteBoard(board): Observable<any> {
    return this.http.delete(`/api/board/${board._id}`, this.options);
  }

}
