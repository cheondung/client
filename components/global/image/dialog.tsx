import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { useGlobalModal } from '@/hooks/use-modal';

export default function GlobalImageDialog() {
  const { image, closeImageDialog } = useGlobalModal();

  return (
    <Dialog open={!!image} onOpenChange={closeImageDialog}>
      <DialogContent className="aspect-square border-none p-0">
        <DialogTitle className="hidden" />
        {image && <Image src={image} alt="상품 이미지" fill className="rounded-lg object-contain" />}
      </DialogContent>
    </Dialog>
  );
}
