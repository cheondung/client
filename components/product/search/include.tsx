import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface ProductSearchIncludeProps {
  excludeUsed: boolean;
  excludeSoldOut: boolean;
}

export default function ProductSearchInclude({ excludeUsed, excludeSoldOut }: Readonly<ProductSearchIncludeProps>) {
  return (
    <>
      <Card className="flex w-full justify-between rounded-md shadow-none">
        <CardHeader className="p-4">
          <CardTitle className="text-sm">중고 상품 제외</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center pb-0">
          <Switch name="excludeUsed" defaultChecked={excludeUsed} />
        </CardContent>
      </Card>
      <Card className="flex w-full justify-between rounded-md shadow-none">
        <CardHeader className="p-4">
          <CardTitle className="text-sm">품절 상품 제외</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center pb-0">
          <Switch name="excludeSoldOut" defaultChecked={excludeSoldOut} />
        </CardContent>
      </Card>
    </>
  );
}
