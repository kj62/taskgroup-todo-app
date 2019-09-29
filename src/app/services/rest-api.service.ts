import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  constructor(public httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getTaskGroupList<T>(url) {
      return this.httpClient.get<Array<T>>(url);
  }

  getUser<T>(url) {
    return this.httpClient.get<T>(url);
  }

  createTaskGroup<T>(url, body) {
    return this.httpClient.post<T>(url, body);
  }

  removeTaskGroup<T>(url) {
    return this.httpClient.delete<T>(url);
  }

  // That would be user if json-server supported query parameters for DELETE method
  // removeTask<T>(url) {
  //   return this.httpClient.delete<T>(url);
  // }

  removeTask<T>(url, body) {
    return this.httpClient.put<T>(url, body);
  }

  updateTask<T>(url, body) {
    return this.httpClient.put<T>(url, body);
  }

  addTask<T>(url, body) {
    return this.httpClient.put<T>(url, body);
  }
}
