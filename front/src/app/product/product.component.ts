import { Component, OnInit } from '@angular/core';
import {DashboardProductService} from '../dashboard-product/dashboard-product.service';
import {DictionaryService} from '../dictionary/dictionary.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  finalProductSet = [];
  dictionaires = []
  constructor(private dashboardProductService: DashboardProductService, private dictionaryService: DictionaryService) { }

  ngOnInit() {
    this.dashboardProductService.getProductsForHome().subscribe((products: any) => {
      this.finalProductSet = products;
      this.dictionaryService.getDictionariesForHome().subscribe((dictionaires: any) => {
        this.dictionaires = dictionaires.filter((row) => row.status === 'Validated');
        console.log(this.dictionaires);
        this.finalProductSet.forEach((product: any) => {
          const item = this.dictionaires.find((dictionary) => dictionary.domain === product.color);
          if (item) {
            product.color = item.range;
          }
        });
      });
    });
  }

}
