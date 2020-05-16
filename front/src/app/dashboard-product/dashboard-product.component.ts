import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardProductService} from './dashboard-product.service';
// import {ModalDirective} from 'ng-uikit-pro-standard'; package under license , can't be published on public , check mdb for more details
import {Product} from './Product';
import {DictionaryService} from '../dictionary/dictionary.service';

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss']
})
export class DashboardProductComponent implements OnInit {

  products = [];
  @ViewChild('ProductEditModal') ProductEditModal: ModalDirective;
  selectedProcuct = new Product();
  finalProductSet = [];
  dictionaires = [];
  constructor(private dashboardProductService: DashboardProductService, private dictionaryService: DictionaryService) { }

  ngOnInit() {
    this.dashboardProductService.getProducts().subscribe((products: any) => {
      this.finalProductSet = products;
    });

  }

  showProductEditModal(product: any) {
    this.ProductEditModal.show();
    this.selectedProcuct = product;
  }

  addPoduct() {
    this.selectedProcuct.name = '';
    this.selectedProcuct.color = '';
    this.selectedProcuct.price = '';
    this.ProductEditModal.show();
  }

  updateProduct() {
    this.dashboardProductService.saveProduct(this.selectedProcuct).subscribe((result) => {this.loadProducts();});

  }

  deleteProduct() {
    this.dashboardProductService.deleteProduct(this.selectedProcuct).subscribe((result) => {this.loadProducts(); });

  }

  closeProductEditModal() {
    this.ProductEditModal.hide();
    this.selectedProcuct = new Product();
  }

  loadProducts() {
    this.dashboardProductService.getProducts().subscribe((products: any) => {
      this.finalProductSet = products;
    });
    this.ProductEditModal.hide();
  }

  showOriginalData() {
    this.dashboardProductService.getProducts().subscribe((products: any) => {
      this.finalProductSet = products;
    });
  }

  showStandardisedData() {
    console.log('showStandardisedData()');
    console.log(this.finalProductSet.length);
    this.dictionaryService.getDictionaries().subscribe((dictionaires: any) => {
      this.dictionaires = dictionaires.filter((row) => row.status === 'Validated');
      console.log(this.dictionaires);
      this.finalProductSet.forEach((product: any) => {
        const item = this.dictionaires.find((dictionary) => dictionary.domain === product.color);
        if (item) {
          product.color = item.range;
        }
      });
    });

  }
}
