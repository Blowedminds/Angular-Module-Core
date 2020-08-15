import {HttpRequest} from '@angular/common/http';
import {Subject} from 'rxjs';

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

export interface Roomable {
  getTextroomId(): number;

  getVideoroomId(): number;
}

export interface CoturnToken {
  username: string;
  password: string;
}

export interface JoinTokenResponse {
  janus: TokenRespose;
  coturn: CoturnToken;
}

export interface RetryRequest {
  req: HttpRequest<any>;
  subject: Subject<any>;
}
