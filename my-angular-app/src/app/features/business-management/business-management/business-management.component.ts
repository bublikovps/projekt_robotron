import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-business-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './business-management.component.html',
  styleUrls: ['./business-management.component.css']
})
export class BusinessManagementComponent {

  modules = [

    {
      icon: '🗂️',
      title: 'Categories',
      route: '/business-management/categories',
      description:
        'Produktkategorien verwalten.'
    },

    {
      icon: '📦',
      title: 'Products',
      route: '/business-management/products',
      description:
        'Produktkatalog verwalten.'
    },

    {
      icon: '📊',
      title: 'Reports',
      route: '/business-management/reports',
      description:
        'Bestände, Margen und Kennzahlen analysieren.'
    }

  ];

}