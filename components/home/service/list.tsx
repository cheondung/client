import { ReactNode } from 'react';

interface HomeServiceListProps {
  children: ReactNode;
}

export default function HomeServiceList({ children }: Readonly<HomeServiceListProps>) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" role="list">
      {children}
    </div>
  );
}
