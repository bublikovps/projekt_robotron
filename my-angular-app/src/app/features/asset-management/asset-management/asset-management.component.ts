import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-asset-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './asset-management.component.html',
  styleUrls: ['./asset-management.component.css']
})
export class AssetManagementComponent {

  modules = [

    {
      icon: '🏛️',
      title: 'Departments',
      route: '/asset-management/departments',
      description:
        'Verwaltung von Abteilungen und Organisationsstrukturen.'
    },

    {
      icon: '👥',
      title: 'Employees',
      route: '/asset-management/employees',
      description:
        'Mitarbeiterstammdaten und Zuordnungen verwalten.'
    },

    {
      icon: '📄',
      title: 'Employment Contracts',
      route: '/asset-management/contracts',
      description:
        'Arbeitsverträge und Vertragsinformationen verwalten.'
    },

    {
      icon: '💻',
      title: 'Devices',
      route: '/asset-management/devices',
      description:
        'IT-Geräte, Inventarnummern und Status verwalten.'
    },

    {
      icon: '🔑',
      title: 'Software Licenses',
      route: '',
      description:
        'Softwarelizenzen und Nutzungsrechte verwalten.'
    },

    {
      icon: '📦',
      title: 'Device Assignments',
      route: '',
      description:
        'Geräte Mitarbeitern zuweisen und Rückgaben verfolgen.'
    },

    {
      icon: '🔗',
      title: 'License Assignments',
      route: '',
      description:
        'Softwarelizenzen Mitarbeitern zuweisen und verwalten.'
    }

  ];

}