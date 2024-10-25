interface PageItemCountProps {
  name: string;
  totalItems: number;
}

export default function PageItemCount({ name, totalItems }: Readonly<PageItemCountProps>) {
  return (
    <p className="text-right text-sm text-muted-foreground">
      {totalItems}개의 {name}이(가) 검색되었습니다.
    </p>
  );
}
