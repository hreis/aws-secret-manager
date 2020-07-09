import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Job, JobException, JobResponse } from '../models/Jobs';
import { Devs } from '../models/Devs';
import { Users } from '../models/Users';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  AUTH_SERVER = "http://manager-back.dev.rpa.container.btgpactual.net";
  // AUTH_SERVER = "http://manager-back.uat.rpa.container.btgpactual.net";
  // AUTH_SERVER = "http://manager-back.prod.rpa.container.btgpactual.net";
  // AUTH_SERVER = "http://localhost:3333";
  authSubject  =  new  BehaviorSubject(false); //This variable tracks the user's authentication state. false means the user is not authenticated yet.

  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {

    return this.http.get<Job[]>(`${this.AUTH_SERVER}/jobs`);

  }

  getJobsException(): Observable<JobException[]> {

    return this.http.get<JobException[]>(`${this.AUTH_SERVER}/jobsException`);

  }

  getDevs(): Observable<Devs[]> {

    return this.http.get<Devs[]>(`${this.AUTH_SERVER}/devs`);

  }

  getUsers(): Observable<Users[]> {

    return this.http.get<Users[]>(`${this.AUTH_SERVER}/users`);

  }

  // getUsers() {

  //     let promise = new Promise((resolve, reject) => {

  //       this.http.get<Users[]>(`${this.AUTH_SERVER}/users`).toPromise().then(res => {
  //         console.log(res);
  //           resolve();
  //       });
  //     });

  //     return promise;

  //   }


  search(word: any): Observable<Job[]> {

    return this.http.post<Job[]>(`${this.AUTH_SERVER}/search`, word).pipe(
      tap((res: Job[] ) => {

        // console.log(res);

      })
    );

  }

  postJob(job: Job): Observable<JobResponse> {

    return this.http.post<JobResponse>(`${this.AUTH_SERVER}/postJob`, job).pipe(
      tap((res: JobResponse ) => {

        // console.log(res);

      })
    );
  }

  update(job: Job): Observable<JobResponse> {

    return this.http.put<JobResponse>(`${this.AUTH_SERVER}/update`, job).pipe(
      tap((res: JobResponse) => {

        debugger
         console.log(res);

      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.AUTH_SERVER}/deleteJob/${id}`);
  }

}
