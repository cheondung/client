import { ReactNode } from 'react';

interface TradeListProps {
  children: ReactNode;
}

export default function TradeList({ children }: Readonly<TradeListProps>) {
  return (
    <div role="list" className="space-y-4">
      {children}
    </div>
  );
}
