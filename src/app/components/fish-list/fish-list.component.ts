import { Component, OnInit } from '@angular/core';
import { Fish } from 'src/app/common/fish.model';
import { Route,ActivatedRoute} from '@angular/router';
import {FishService } from '../../services/fish.service';
import {CartService } from '../../services/cart.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

import { CartItem } from 'src/app/common/cart-item.model';

@Component({
  selector: 'app-fish-list',
  templateUrl: './fish-grid.component.html',
  styleUrls: ['./fish-list.component.css']
})
export class FishListComponent implements OnInit {

  fish: Fish[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  
  //properties for client side paging

  //pageOfItems: Array<Fish>;
  //pageSize: number = 5;

  //new properties for server-side paging
  currentPage: number = 1;
  pageSize: number = 6;
  totalRecords: number = 0;

  constructor(private _fishService: FishService,
              private _activatedRoute: ActivatedRoute,
              private _cartService: CartService,
              config: NgbPaginationConfig) {
                config.boundaryLinks = true;
                config.maxSize = 3;
              }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listfish();
    })
  }

  /*client side paging
  pageClick(pageOfItems: Array<Fish>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  } */

  listfish(){
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      //do search work
      this.handleSearchFish();
    }else {
      //display fish based on category
      this.handleListFish();
    }
  }

  handleListFish(){
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
    
    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }else {
      this.currentCategoryId = 1;
    }

    //setting up the page number to 1
    //if user navigates to other category
    if (this.previousCategoryId != this.currentCategoryId) {
      this.currentPage = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log('current page size', this.currentPage-1);
    
    this._fishService.getFishPaginate(this.currentCategoryId, 
                                        this.currentPage - 1, 
                                        this.pageSize)
                                        .subscribe(this.processResult());
  }

  handleSearchFish(){
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

    this._fishService.searchFish(keyword,
                                  this.currentPage - 1,
                                  this.pageSize)
                                  .subscribe(this.processResult());
  }

  //client side paging and server side paging
  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listfish();
  }

  processResult(){
    return data => {
      this.fish = data._embedded.fish;
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }

  addToCart(fish: Fish){
    console.log(`fish name: ${fish.name}, and price: ${fish.unitPrice}`);
    const cartItem = new CartItem(fish);
    //this._cartService.addToCart(cartItem);
  }


}
