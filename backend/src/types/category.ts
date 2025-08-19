export interface ICategoryProductDto {
  id: string;
  image: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  discountPrice: number;
}

export interface ICategoryDto {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export interface ICategoryBreadcrumb {
  name: string;
  path: string;
}
