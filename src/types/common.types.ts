/**
 * Common/shared type definitions
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location extends Coordinates {
  altitude?: number;
  heading?: number;
}

export interface Timestamp {
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
