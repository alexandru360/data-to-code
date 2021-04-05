import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Product} from './product';

@Injectable()
export class ProductService {

  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  productNames: string[] = [
    'Bamboo Watch',
    'Black Watch',
    'Blue Band',
    'Blue T-Shirt',
    'Bracelet',
    'Brown Purse',
    'Chakra Bracelet',
    'Galaxy Earrings',
    'Game Controller',
    'Gaming Set',
    'Gold Phone Case',
    'Green Earbuds',
    'Green T-Shirt',
    'Grey T-Shirt',
    'Headphones',
    'Light Green T-Shirt',
    'Lime Band',
    'Mini Speakers',
    'Painted Phone Case',
    'Pink Band',
    'Pink Purse',
    'Purple Band',
    'Purple Gemstone Necklace',
    'Purple T-Shirt',
    'Shoes',
    'Sneakers',
    'Teal T-Shirt',
    'Yellow Earbuds',
    'Yoga Mat',
    'Yoga Set',
  ];

  constructor(private http: HttpClient) {
  }

  getProductsSmall(): Promise<Product[]> {
    return this.http.get<any>('assets/products-small.json')
      .toPromise()
      .then(res => res.data as Product[])
      .then(data => {
        return data;
      });
  }

  getProducts(): any {
    return this.http.get<any>('assets/products.json')
      .toPromise()
      .then(res => res.data as Product[])
      .then(data => {
        return data;
      });
  }

  getProductsWithOrdersSmall(): any {
    return this.http.get<any>('assets/products-orders-small.json')
      .toPromise()
      .then(res => res.data as Product[])
      .then(data => {
        return data;
      });
  }

  generatePrduct(): Product {
    const product: Product = {
      id: this.generateId(),
      name: this.generateName() || '',
      description: 'Product Description',
      price: this.generatePrice(),
      quantity: this.generateQuantity(),
      category: 'Product Category',
      inventoryStatus: this.generateStatus(),
      rating: this.generateRating()
    };

    // @ts-ignore
    product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-') + '.jpg';
    return product;
  }

  generateId(): any {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  generateName(): any {
    return this.productNames[Math.floor(Math.random() * Math.floor(30))];
  }

  generatePrice(): any {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }

  generateQuantity(): any {
    return Math.floor(Math.random() * Math.floor(75) + 1);
  }

  generateStatus(): any {
    return this.status[Math.floor(Math.random() * Math.floor(3))];
  }

  generateRating(): any {
    return Math.floor(Math.random() * Math.floor(5) + 1);
  }
}
