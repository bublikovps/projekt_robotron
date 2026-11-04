import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogProductResponse } from '../models/catalog-product-response.model';
import { CatalogCategoryResponse } from '../models/catalog-category-response.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private readonly productsApiUrl = 'http://localhost:8080/api/catalog/products';
  private readonly categoriesApiUrl = 'http://localhost:8080/api/catalog/categories';

  // 1. Создаем приватный Сигнал для хранения массива категорий
  private readonly categoriesSignal = signal<CatalogCategoryResponse[]>([]);

  // 2. Экспонируем readonly версию сигнала наружу для компонентов (Паттерн: State Management)
  public readonly categories = this.categoriesSignal.asReadonly();

  constructor(private http: HttpClient) {}

  /**
   * Проверяет кэш сигналов. Если он пуст — выполняет один контролируемый запрос к бэкенду.
   */
  loadCategoriesIfNeeded(): void {
    if (this.categoriesSignal().length > 0) {
      return; // Данные уже на месте — блокируем лишний сетевой трафик
    }

    this.http.get<CatalogCategoryResponse[]>(this.categoriesApiUrl).subscribe({
      next: (data) => this.categoriesSignal.set(data),
    });
  }

  getProducts(
    search: string = '',
    categoryId: number | null = null
  ): Observable<CatalogProductResponse[]> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    if (categoryId !== null) {
      params = params.set('categoryId', categoryId);
    }

    return this.http.get<CatalogProductResponse[]>(this.productsApiUrl, { params });
  }

  getProductById(
    id: number
  ): Observable<CatalogProductResponse> {

        return this.http.get<CatalogProductResponse>(
      `${this.productsApiUrl}/${id}`
    );
  }

  // Оставлен для обратной совместимости, если используется в других гвардах или резолверах
  getCategories(): Observable<CatalogCategoryResponse[]> {
    return this.http.get<CatalogCategoryResponse[]>(this.categoriesApiUrl);
  }
}
