import { useProductModal } from '@/hooks/use-modal';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { parseProductImageSrc } from '@/lib/parse';
import Image from 'next/image';

export default function ProductImageDialog() {
  const { image, closeImageDialog } = useProductModal();

  return (
    <Dialog open={!!image} onOpenChange={closeImageDialog}>
      <DialogContent className="fixed aspect-square p-0 border-none">
        <DialogTitle className="hidden" />
        Hello
        {image && <Image src={parseProductImageSrc(image)} alt="상품 이미지" fill className="rounded-lg" />}
      </DialogContent>
    </Dialog>
  );
}
