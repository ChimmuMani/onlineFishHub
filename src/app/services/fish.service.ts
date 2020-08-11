import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FishCatergory } from '../common/fish-catergory.model';
import { Fish} from '../common/fish.model';

@Injectable({
  providedIn: 'root'
})
export class FishService {


  private baseUrl = "http://localhost:8080/api/v1/fish";
  private categoryUrl = "http://localhost:8080/api/v1/fish-category";

  constructor(private httpClient: HttpClient) { }

  getFish(theCategoryId: number): Observable<Fish[]>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
    return this.getFishList(searchUrl);
  }

  getFishPaginate(theCategoryId: number, currentPage: number, pageSize: number): Observable<GetResponseFish>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseFish>(searchUrl);
  }

  getFishCategories(): Observable<FishCatergory[]>{
    return this.httpClient.get<GetResponseFishCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.fishCateogry)
    );
  }

  searchFish(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseFish>{
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    //return this.getBooksList(searchUrl);
    return this.httpClient.get<GetResponseFish>(searchUrl);
  }

  private getFishList(searchUrl: string): Observable<Fish[]> {
    return this.httpClient.get<GetResponseFish>(searchUrl).pipe(
      map(response => response._embedded.fish)
    );
  }

  get(fishId: number): Observable<Fish> {
    const fishDetailsUrl = `${this.baseUrl}/${fishId}`;
    return this.httpClient.get<Fish>(fishDetailsUrl);
  }
}

interface GetResponseFish{
  _embedded: {
    fish: Fish[];
  },
  page: {
    //cureent page
    size: number,
    //total number of records in database
    totalElements: number,
    //total number of pages, starts from 0 index
    totalPages: number,
    //current page
    number: number
  }
}

interface GetResponseFishCategory{
  _embedded: {
    fishCateogry: FishCatergory[];
  }
}
