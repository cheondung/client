interface Trade {
  id: number;
  status: TradeStatus;
  statusLabel: string;
  productName: string;
  productThumbnail: ProductImage;
}

interface TradeDetail {
  id: number;
  status: TradeStatus;
  statusLabel: string;
  customer: Shop;
  seller: Shop;
  productName: string;
  productThumbnail: ProductImage;
  histories: TradeHistory[];
  delivery?: Delivery;
}

interface TradeHistory {
  id: number;
  status: TradeStatus;
  statusMessage: string;
  createdAt: Date;
}

interface Delivery {
  shippingCompany: ShippingCompany;
  shippingCompanyLabel: string;
  trackingNumber: string;
}

interface DeliveryTrack {
  time: string;
  description: string;
  statusLabel: string;
}

type TradeStatus = 'REQUESTED' | 'REJECTED' | 'CANCELED' | 'ACCEPTED' | 'SHIPPING' | 'SHIPPED' | 'COMPLETED';
