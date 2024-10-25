interface SearchProduct {
  category: number;
  query: string;
  includeUsed: boolean;
  includeSoldOut: boolean;
  page: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  condition: ProductCondition;
  conditionLabel: string;
  saleStatus: ProductSaleStatus;
  saleStatusLabel: string;
  status: ProductStatus;
  thumbnail: ProductImage;
}

interface ProductDetail {
  id: number;
  bunjangId: number;
  name: string;
  description: string;
  price: number;
  shippingFee: number;
  interestCount: number;
  condition: ProductCondition;
  conditionLabel: string;
  saleStatus: ProductSaleStatus;
  saleStatusLabel: string;
  status: ProductStatus;
  categories: ProductCategory[];
  images: ProductImage[];
  shop: Shop;
}

interface ProductImage {
  path: string;
  source: 'S3' | 'BUNJANG';
}

interface ProductCategory {
  id: number;
  name: string;
}

interface ProductCategoryTree extends ProductCategory {
  subCategories: ProductCategoryTree[];
}

type ProductCondition = 'NEW' | 'USED';
type ProductSaleStatus = 'ON_SALE' | 'ON_TRADE' | 'SOLD_OUT';
type ProductStatus = 'POSTED' | 'DELETED' | 'HIDDEN';
