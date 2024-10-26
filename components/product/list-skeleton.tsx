import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductListSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="relative p-0 mb-6 aspect-square">
        <Skeleton className="w-full h-full rounded-b-none" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="w-1/2 h-8" />
        <div className="flex flex-wrap items-start gap-1">
          <Skeleton className="w-1/6 h-5 rounded-full" />
          <Skeleton className="w-1/6 h-5 rounded-full" />
          <Skeleton className="w-1/4 h-6 ml-auto" />
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Skeleton className="w-full h-9" />
      </CardFooter>
    </Card>
  );
}
