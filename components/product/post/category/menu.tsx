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

interface ProductPostCategoryMenuProps {
  categories: ProductCategoryTree[];
  setCategory: React.Dispatch<React.SetStateAction<ProductCategory | undefined>>;
}

export default function ProductPostCategoryMenu({ categories, setCategory }: Readonly<ProductPostCategoryMenuProps>) {
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
                <MenubarSubTrigger onClick={() => setCategory(categoryL1)}>{categoryL1.name}</MenubarSubTrigger>
                <MenubarSubContent>
                  {categoryL1.subCategories.map((categoryL2) =>
                    categoryL2.subCategories.length > 0 ? (
                      <MenubarSub key={categoryL2.id}>
                        <MenubarSubTrigger onClick={() => setCategory(categoryL2)}>{categoryL2.name}</MenubarSubTrigger>
                        <MenubarSubContent>
                          {categoryL2.subCategories.map((categoryL3) => (
                            <MenubarItem key={categoryL3.id} onClick={() => setCategory(categoryL3)}>
                              {categoryL3.name}
                            </MenubarItem>
                          ))}
                        </MenubarSubContent>
                      </MenubarSub>
                    ) : (
                      <MenubarItem key={categoryL2.id} onClick={() => setCategory(categoryL2)}>
                        {categoryL2.name}
                      </MenubarItem>
                    )
                  )}
                </MenubarSubContent>
              </MenubarSub>
            ) : (
              <MenubarItem key={categoryL1.id} onClick={() => setCategory(categoryL1)}>
                {categoryL1.name}
              </MenubarItem>
            )
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
