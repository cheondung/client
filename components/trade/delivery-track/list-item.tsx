import { getRelativeDate } from '@/lib/parse';
import { Badge } from '@/components/ui/badge';

interface TradeDeliveryTrackListItemProps {
  track: DeliveryTrack;
}

export default function TradeDeliveryTrackListItem({ track }: Readonly<TradeDeliveryTrackListItemProps>) {
  const { time, description, statusLabel } = track;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="outline">{statusLabel}</Badge>
      <p>{description}</p>
      <p className="ml-auto text-sm text-muted-foreground">{getRelativeDate(new Date(time))}</p>
    </div>
  );
}
