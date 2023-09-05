export interface VideoData {
  id: number;
  attributes: {
    title: string;
    duration: number;
    description: string;
    video_url: string;
    video_id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
  };
}

export interface Category {
  id: number;
  attributes?: {
    name?: string;
    createdAt?: string;
    updatedAt?: string;
    locale?: string;
    order?: number;
  };
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface CategoriesResponse {
  data: Category[];
  meta: Meta;
}

export interface VideoResponse {
  data: VideoData[];
  meta: Meta;
}
