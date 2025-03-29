import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TradeDeliveryTrackListProps {
  children: React.ReactNode;
  delivery: Delivery;
}

export default function TradeDeliveryTrackList({ children, delivery }: Readonly<TradeDeliveryTrackListProps>) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>배송 추적</CardTitle>
        <CardDescription>
          <strong>{delivery.shippingCompanyLabel}:</strong> {delivery.trackingNumber}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">{children}</CardContent>
    </Card>
  );
}
