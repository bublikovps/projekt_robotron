import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  ViewChild
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
import { ExportService } from '../../../../shared/services/export.service';



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

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

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

  activeActionMenuId:
    number | null = null;

  sortColumn:
    'id'
    | 'name'
    | 'productCount'
    | 'active'
    = 'name';

  sortDirection:
    'asc'
    | 'desc'
    = 'asc';

  categoryForm:
    CategoryCreateRequest = {
      name: ''
    };

  constructor(
    private categoryService:
      CategoryService,

    private exportService:
      ExportService,

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

    let result =
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
          matchesSearch &&
          matchesStatus
        );
      });

    result.sort((a, b) => {

      let comparison = 0;

      switch (
        this.sortColumn
      ) {

        case 'id':
          comparison =
            a.id - b.id;
          break;

        case 'name':
          comparison =
            a.name.localeCompare(
              b.name
            );
          break;

        case 'productCount':
          comparison =
            a.productCount -
            b.productCount;
          break;

        case 'active':
          comparison =
            Number(a.active) -
            Number(b.active);
          break;
      }

      return this.sortDirection === 'asc'
        ? comparison
        : -comparison;
    });

    this.filteredCategories =
      result;
  }

  sortBy(
    column:
      'id'
      | 'name'
      | 'productCount'
      | 'active'
  ): void {

    if (
      this.sortColumn === column
    ) {

      this.sortDirection =
        this.sortDirection === 'asc'
          ? 'desc'
          : 'asc';

    } else {

      this.sortColumn = column;

      this.sortDirection = 'asc';
    }

    this.applyFilters();
  }

  setStatusFilter(
    filter:
      'active'
      | 'archived'
      | 'all'
  ): void {

    this.statusFilter =
      filter;

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
          },

          error: () => {
            this.errorMessage =
              'Aktualisierung fehlgeschlagen.';
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
        },

        error: () => {

          this.errorMessage =
            'Erstellung fehlgeschlagen.';
        }
      });
  }

  editCategory(
    category: CategoryResponse
  ): void {

    this.activeActionMenuId =
      null;

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

    this.activeActionMenuId =
      null;

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

          this.successMessage =
            'Kategorie archiviert.';

          this.loadCategories();
        }
      });
  }

  restoreCategory(
    category: CategoryResponse
  ): void {

    this.activeActionMenuId =
      null;

    this.categoryService
      .restoreCategory(
        category.id
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Kategorie wiederhergestellt.';

          this.loadCategories();
        }
      });
  }

  toggleActionMenu(
    categoryId: number
  ): void {

    this.activeActionMenuId =
      this.activeActionMenuId === categoryId
        ? null
        : categoryId;
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

    const exportData =
      this.filteredCategories.map(
        category => ({

          ID:
            category.id,

          Name:
            category.name,

          Products:
            category.productCount,

          Status:
            category.active
              ? 'Active'
              : 'Archived'
        })
      );

    switch (format) {

      case 'csv':

        this.exportService
          .exportToCsv(
            exportData,
            'categories'
          );

        break;

      case 'excel':

        this.exportService
          .exportToExcel(
            exportData,
            'categories'
          );

        break;

      case 'pdf':

        this.exportService
          .exportToPdf(
            exportData,
            'categories'
          );

        break;
    }
  }

  openImportDialog(): void {

    this.fileInput
      ?.nativeElement
      .click();
  }

  onFileSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (
      !input.files ||
      input.files.length === 0
    ) {
      return;
    }

    const file =
      input.files[0];

    this.categoryService
      .importCategories(file)
      .subscribe({

        next: (response) => {

          this.successMessage =
            response.message;

          this.loadCategories();

          input.value = '';
        },

        error: () => {

          this.errorMessage =
            'Import fehlgeschlagen.';
        }
      });
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