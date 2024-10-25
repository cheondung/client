import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { StoreIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';

interface ShopCardProps {
  shop: Shop;
}

export default function ShopCard({ shop }: Readonly<ShopCardProps>) {
  const { id, name, introduction, avatar } = shop;

  return (
    <Card className="p-4 flex gap-4">
      <CardHeader className="p-0">
        <Avatar className="cursor-pointer">
          <AvatarImage src={`https://github.com/${avatar}`} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="p-0 w-full flex flex-col justify-between">
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
