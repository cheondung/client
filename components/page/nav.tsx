'use client';

import { useCallback, useMemo } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ListNavProps {
  currentPage: number;
  totalPages: number;
}

export default function PageNav({ currentPage, totalPages }: ListNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setPage = useCallback(
    (page: number) => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (page > 1) {
        newSearchParams.set('page', page.toString());
      } else {
        newSearchParams.delete('page');
      }
      router.replace(`${pathname}?${newSearchParams}`);
    },
    [router, pathname, searchParams]
  );

  const paginationItems = useMemo(() => {
    const items = [];
    const blockSize = 5;
    const currentBlock = Math.ceil(currentPage / blockSize);
    const startPage = (currentBlock - 1) * blockSize + 1;
    const endPage = Math.min(totalPages, currentBlock * blockSize);

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={currentPage === i} onClick={() => setPage(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  }, [currentPage, totalPages, setPage]);

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage(currentPage - 1)}>Previous</PaginationPrevious>
          </PaginationItem>
        )}
        {paginationItems}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => setPage(currentPage + 1)}>Next</PaginationNext>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
