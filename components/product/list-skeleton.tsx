import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductListSkeleton() {
  return (
    <Card className="gap-6 overflow-hidden">
      <Skeleton className="aspect-square rounded-b-none" />
      <CardContent className="space-y-4 pt-6">
        <Skeleton className="h-8 w-1/2 flex-col" />
        <div className="flex flex-wrap items-start gap-1">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="ml-auto h-6 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}
