import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class RestProvider {
	apiUrl = 'https://jsonplaceholder.typicode.com';
  constructor(public http: HttpClient) {
  	
    // console.log('Hello RestProvider Provider');
  }


  daily(fecha, ayer){
    let daily = new FormData();
    daily.append('fecha',String( fecha));
    daily.append('ayer',String( ayer));



    return new Promise((resolve, reject) => {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://www.womportal.info/sasyr-sample/api/RepoApp/dailyRepo', daily)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  dailyweek(week, year){
    let weekdaily = new FormData();
    weekdaily.append('semana',String( week));
    weekdaily.append('anno', String(year)); 

    console.log("week : "+week);
    console.log("año : "+year);
    return new Promise((resolve, reject) => {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://www.womportal.info/sasyr-sample/api/RepoApp/weekRepo', weekdaily)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }


    getUsersv2v(email, pass) {
    let params1 = new FormData();
    console.log(email);
    params1.append('authUser', email);
    params1.append('authPass', pass);    
    params1.append('authSyst','17');

    console.log(params1);

    return new Promise((resolve, reject) => {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://www.womportal.info/sasyr-sample/api/AppLogIn/logv2', params1)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
 
  }

}
