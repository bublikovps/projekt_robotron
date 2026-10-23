import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent {

  modules = [

    {
      icon: '🗂️',
      title: 'Categories',
      route: '/lager-management/categories',
      description:
        'Produktkategorien verwalten.'
    },

    {
      icon: '📦',
      title: 'Products',
      route: '/lager-management/products',
      description:
        'Produktkatalog verwalten.'
    }

  ];

}