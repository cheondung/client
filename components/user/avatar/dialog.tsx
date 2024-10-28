import { useUserModal } from '@/hooks/use-modal';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { UserAvatarForm } from '@/components/user';

export default function UserAvatarDialog() {
  const { avatar, closeAvatarDialog } = useUserModal();

  return (
    <Dialog open={!!avatar} onOpenChange={closeAvatarDialog}>
      <DialogContent>
        <DialogTitle>프로필 사진 변경</DialogTitle>
        <DialogDescription>프로필 사진을 변경하시려면 사진을 선택해주세요.</DialogDescription>
        {avatar && <UserAvatarForm avatar={avatar} />}
      </DialogContent>
    </Dialog>
  );
}
