import { useUserModal } from '@/hooks/use-modal';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserWithdrawForm } from '@/components/user';

export default function UserWithdrawDialog() {
  const { isWithdrawDialogOpen, closeWithdrawDialog } = useUserModal();

  return (
    <Dialog open={isWithdrawDialogOpen} onOpenChange={closeWithdrawDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>회원 탈퇴</DialogTitle>
          <DialogDescription>회원 탈퇴를 하시려면 아래 폼에 비밀번호를 입력해주세요.</DialogDescription>
        </DialogHeader>
        <UserWithdrawForm />
      </DialogContent>
    </Dialog>
  );
}
