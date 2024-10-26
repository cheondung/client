import { useUserModal } from '@/hooks/use-modal';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { UserPasswordForm } from '@/components/user';

export default function UserPasswordDialog() {
  const { isPasswordDialogOpen, closePasswordDialog } = useUserModal();

  return (
    <Dialog open={isPasswordDialogOpen} onOpenChange={closePasswordDialog}>
      <DialogContent>
        <DialogTitle>비밀번호 변경</DialogTitle>
        <DialogDescription>비밀번호를 변경하시려면 아래 폼에 새로운 비밀번호를 입력하세요.</DialogDescription>
        <UserPasswordForm />
      </DialogContent>
    </Dialog>
  );
}
