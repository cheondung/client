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
  priceHistories: ProductPriceHistory[];
  discount: ProductDiscount;
  shop: Shop;
}

interface ProductImage {
  path: string;
  source: 'VERCEL' | 'BUNJANG';
}

interface ProductPriceHistory {
  id: number;
  price: number;
  date: Date;
}

interface ProductCategory {
  id: number;
  name: string;
}

interface ProductCategoryTree extends ProductCategory {
  subCategories: ProductCategoryTree[];
}

interface ProductDiscount {
  price: number;
  duration: number;
  lastDiscountedAt: string;
}

interface ProductPos {
  street: string;
  lat: number;
  lng: number;
}

type ProductCondition = 'NEW' | 'USED';
type ProductSaleStatus = 'ON_SALE' | 'ON_TRADE' | 'SOLD_OUT';
type ProductStatus = 'POSTED' | 'DELETED' | 'HIDDEN';
