import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface ProductSearchIncludeProps {
  includeUsed: boolean;
  includeSoldOut: boolean;
}

export default function ProductSearchInclude({ includeUsed, includeSoldOut }: Readonly<ProductSearchIncludeProps>) {
  return (
    <>
      <Card className="w-full flex justify-between rounded-md shadow-none">
        <CardHeader className="p-4">
          <CardTitle className="text-sm">중고 상품 포함</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center pb-0">
          <Switch name="includeUsed" defaultChecked={includeUsed} />
        </CardContent>
      </Card>
      <Card className="w-full flex justify-between rounded-md shadow-none">
        <CardHeader className="p-4">
          <CardTitle className="text-sm">품절 상품 포함</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center pb-0">
          <Switch name="includeSoldOut" defaultChecked={includeSoldOut} />
        </CardContent>
      </Card>
    </>
  );
}
