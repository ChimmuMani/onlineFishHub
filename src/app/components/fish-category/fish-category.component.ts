import { Component, OnInit } from '@angular/core';
import { FishCatergory } from '../../common/fish-catergory.model';
import { FishService} from '../../services/fish.service';

@Component({
  selector: 'app-fish-category',
  templateUrl: './fish-category.component.html',
  styleUrls: ['./fish-category.component.css']
})
export class FishCategoryComponent implements OnInit {

 
  fishCategories: FishCatergory[];

  constructor(private _fishService: FishService) { }

  ngOnInit() {
    this.listFishCategories();
  }

  listFishCategories(){
    this._fishService.getFishCategories().subscribe(
      data => this.fishCategories = data
    );
  }

}
