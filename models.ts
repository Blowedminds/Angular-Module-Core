export interface SuccessResponse {
  message: string;
}

export interface TokenRespose {
  token: string;
}

export interface EducationField {
  id: number;
  name: string;
}

export interface EducationLevel {
  id: number;
  name: string;
}

export interface Pagination<T> {
  perPage: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];
}

export interface PaginationParams {
  perPage: number;
  page: number;
}
