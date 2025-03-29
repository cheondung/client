'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { MenuIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ProductSearchCategoryProps {
  categories: ProductCategoryTree[];
  category?: number;
}

export default function ProductSearchCategory({ categories, category }: Readonly<ProductSearchCategoryProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const setCategory = useCallback(
    (categoryId: number) => {
      const newSearchParams = new URLSearchParams();
      if (categoryId) {
        newSearchParams.set('category', categoryId.toString());
      } else {
        newSearchParams.delete('category');
      }
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    },
    [router, pathname]
  );

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="px-1.5">
          <MenuIcon size={16} />
        </MenubarTrigger>
        <MenubarContent>
          {categories.map((categoryL1) =>
            categoryL1.subCategories.length > 0 ? (
              <MenubarSub key={categoryL1.id}>
                <MenubarSubTrigger
                  className={cn(categoryL1.id === category && 'bg-secondary text-secondary-foreground')}
                  onClick={() => setCategory(categoryL1.id)}
                >
                  {categoryL1.name}
                </MenubarSubTrigger>
                <MenubarSubContent>
                  {categoryL1.subCategories.map((categoryL2) =>
                    categoryL2.subCategories.length > 0 ? (
                      <MenubarSub key={categoryL2.id}>
                        <MenubarSubTrigger
                          className={cn(categoryL2.id === category && 'bg-secondary text-secondary-foreground')}
                          onClick={() => setCategory(categoryL2.id)}
                        >
                          {categoryL2.name}
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                          {categoryL2.subCategories.map((categoryL3) => (
                            <MenubarItem
                              key={categoryL3.id}
                              className={cn(categoryL3.id === category && 'bg-secondary text-secondary-foreground')}
                              onClick={() => setCategory(categoryL3.id)}
                            >
                              {categoryL3.name}
                            </MenubarItem>
                          ))}
                        </MenubarSubContent>
                      </MenubarSub>
                    ) : (
                      <MenubarItem
                        key={categoryL2.id}
                        className={cn(categoryL2.id === category && 'bg-secondary text-secondary-foreground')}
                        onClick={() => setCategory(categoryL2.id)}
                      >
                        {categoryL2.name}
                      </MenubarItem>
                    )
                  )}
                </MenubarSubContent>
              </MenubarSub>
            ) : (
              <MenubarItem
                key={categoryL1.id}
                className={cn(categoryL1.id === category && 'bg-secondary text-secondary-foreground')}
                onClick={() => setCategory(categoryL1.id)}
              >
                {categoryL1.name}
              </MenubarItem>
            )
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
