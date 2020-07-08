import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  isLoading = false;
  constructor(
    private httpService: HttpService
  ) { }
  // Below method fetches all categories from cat API
  getAllCategories(): Observable<any> {
    return this.httpService.get(environment.url + '/v1/categories');
  }
  // Below method fetch random cat Image
  getRandomImage(): Observable<any> {
    return this.httpService.get(environment.url + '/v1/images/search');
  }
  // Below method fetch images based on the category id provided
  getImagesByCategory(id: number): Observable<any> {
    return this.httpService.get(environment.url + '/v1/images/search?category'+'ids'+ id +'&'+'limit='+ '11');
  }

}
