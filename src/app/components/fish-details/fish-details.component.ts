
import { Fish } from 'src/app/common/fish.model';
import { Component, OnInit } from '@angular/core';

import { Route,ActivatedRoute} from '@angular/router';
import {FishService } from '../../services/fish.service';
import {CartService } from '../../services/cart.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

import { CartItem } from 'src/app/common/cart-item.model';

@Component({
  selector: 'app-fish-details',
  templateUrl: './fish-details.component.html',
  styleUrls: ['./fish-details.component.css']
})
export class FishDetailsComponent implements OnInit {

  
  fish: Fish = new Fish();

  constructor(private _fishService: FishService,
    private _activatedRoute: ActivatedRoute,
    private _cartService: CartService,
    config: NgbPaginationConfig) {
      config.boundaryLinks = true;
      config.maxSize = 3;
    }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getFishInfo();
      }
    )
  }

  getFishInfo(){
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');

    this._fishService.get(id).subscribe(
      data => {
        this.fish = data;
      }
    );
  }

  addToCart(){
    console.log(`fish name: ${this.fish.name}, and price: ${this.fish.unitPrice}`);
    const cartItem = new CartItem(this.fish);
    this._cartService.addToCart(cartItem);
  }

}
