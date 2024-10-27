import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

interface HomeServiceListItemProps {
  subject: string;
  description: string;
  icon: ReactNode;
}

export default function HomeServiceListItem({ subject, description, icon }: Readonly<HomeServiceListItemProps>) {
  return (
    <Card role="listitem" className="flex flex-col h-full">
      <CardContent className="p-6">
        <CardTitle className="flex items-center gap-2">
          <span className="p-2 text-primary-foreground bg-primary rounded-full">{icon}</span>
          <span className="text-2xl">{subject}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
