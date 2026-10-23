import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

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
export class CategoriesComponent implements OnInit {

  categories: CategoryResponse[] = [];

  successMessage = '';

  errorMessage = '';

  isEditMode = false;

  editingCategoryId: number | null = null;

  categoryForm: CategoryCreateRequest = {

    name: ''

  };

  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    this.loadCategories();
  }

  loadCategories(): void {

    this.categoryService
      .getAllCategories()
      .subscribe({

        next: (data) => {

          this.categories = data;
        },

        error: () => {

          this.errorMessage =
            'Fehler beim Laden der Kategorien.';
        }

      });
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

            this.cancelEdit();

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

          this.resetForm();

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

      name: category.name

    };
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
      .archiveCategory(category.id)
      .subscribe({

        next: (res) => {

          this.successMessage =
            res.message;

          this.loadCategories();
        }

      });
  }

  cancelEdit(): void {

    this.isEditMode = false;

    this.editingCategoryId = null;

    this.resetForm();
  }

  private resetForm(): void {

    this.categoryForm = {

      name: ''

    };
  }

}