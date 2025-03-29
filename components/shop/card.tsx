import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { StoreIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { parseImagePath } from '@/lib/parse';

interface ShopCardProps {
  shop: Shop;
}

export default function ShopCard({ shop }: Readonly<ShopCardProps>) {
  const { id, name, introduction, avatar } = shop;

  return (
    <Card className="flex gap-4 p-4">
      <CardHeader className="p-0">
        <Avatar className="cursor-pointer">
          <AvatarImage src={parseImagePath(avatar, 'VERCEL')} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="flex w-full flex-col justify-between p-0">
        <CardTitle>{name}</CardTitle>
        <CardDescription className="line-clamp-1">
          {introduction ? introduction : '아직 상점 소개가 등록되지 않았습니다.'}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="px-3" asChild>
              <Link href={`/@${id}`}>
                <StoreIcon />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>방문하기</TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
