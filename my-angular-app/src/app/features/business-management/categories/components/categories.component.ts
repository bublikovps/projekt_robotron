import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import { CategoryService }
from '../services/category.service';

import { CategoryResponse }
from '../models/category-response.model';

import { CategoryCreateRequest }
from '../models/category-create-request.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent
implements OnInit {

  categories:
    CategoryResponse[] = [];

  filteredCategories:
    CategoryResponse[] = [];

  searchTerm = '';

  statusFilter:
    'active'
    | 'archived'
    | 'all'
    = 'active';

  successMessage = '';

  errorMessage = '';

  showDialog = false;

  isEditMode = false;

  editingCategoryId:
    number | null = null;

  exportMenuOpen = false;

  categoryForm:
    CategoryCreateRequest = {
      name: ''
    };

  constructor(
    private categoryService:
      CategoryService,

    private cdr:
      ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadCategories();
  }

  loadCategories(): void {

    this.categoryService
      .getAllCategories()
      .subscribe({

        next: data => {

          this.categories = data;

          this.applyFilters();

          this.cdr.detectChanges();
        },

        error: () => {

          this.errorMessage =
            'Fehler beim Laden der Kategorien.';

          this.cdr.detectChanges();
        }

      });
  }

  applyFilters(): void {

    const term =
      this.searchTerm
        .toLowerCase()
        .trim();

    this.filteredCategories =
      this.categories.filter(category => {

        const matchesSearch =
          category.name
            .toLowerCase()
            .includes(term);

        const matchesStatus =

          this.statusFilter === 'all'

          ||

          (
            this.statusFilter === 'active'
            &&
            category.active
          )

          ||

          (
            this.statusFilter === 'archived'
            &&
            !category.active
          );

        return (
          matchesSearch
          &&
          matchesStatus
        );
      });
  }

  setStatusFilter(
    filter:
      'active'
      | 'archived'
      | 'all'
  ): void {

    this.statusFilter = filter;

    this.applyFilters();
  }

  openCreateDialog(): void {

    this.resetForm();

    this.isEditMode = false;

    this.editingCategoryId =
      null;

    this.showDialog = true;
  }

  closeDialog(): void {

    this.showDialog = false;

    this.cancelEdit();
  }

  saveCategory(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (
      this.isEditMode &&
      this.editingCategoryId !== null
    ) {

      this.categoryService
        .updateCategory(
          this.editingCategoryId,
          this.categoryForm
        )
        .subscribe({

          next: () => {

            this.successMessage =
              'Kategorie aktualisiert.';

            this.closeDialog();

            this.loadCategories();
          }

        });

      return;
    }

    this.categoryService
      .createCategory(
        this.categoryForm
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Kategorie erstellt.';

          this.closeDialog();

          this.loadCategories();
        }

      });
  }

  editCategory(
    category: CategoryResponse
  ): void {

    this.isEditMode = true;

    this.editingCategoryId =
      category.id;

    this.categoryForm = {

      name:
        category.name

    };

    this.showDialog = true;
  }

  archiveCategory(
    category: CategoryResponse
  ): void {

    if (
      !confirm(
        `Kategorie "${category.name}" archivieren?`
      )
    ) {

      return;
    }

    this.categoryService
      .archiveCategory(
        category.id
      )
      .subscribe({

        next: () => {

          this.loadCategories();
        }

      });
  }

  restoreCategory(
  category: CategoryResponse
): void {

  this.categoryService
    .restoreCategory(
      category.id
    )
    .subscribe({

      next: () => {

        this.loadCategories();
      }

    });
}

  toggleExportMenu(): void {

    this.exportMenuOpen =
      !this.exportMenuOpen;
  }

  exportAs(
    format:
      'csv'
      | 'excel'
      | 'pdf'
  ): void {

    this.exportMenuOpen = false;

    alert(
      `${format.toUpperCase()} export coming soon`
    );
  }

  importCategories(): void {

    alert(
      'Import coming soon'
    );
  }

  cancelEdit(): void {

    this.isEditMode = false;

    this.editingCategoryId =
      null;

    this.resetForm();
  }

  private resetForm(): void {

    this.categoryForm = {

      name: ''

    };
  }

}