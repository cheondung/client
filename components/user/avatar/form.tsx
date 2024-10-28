'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ImagePlusIcon } from 'lucide-react';
import { CheckIcon } from '@radix-ui/react-icons';
import { uploadAvatar } from '@/actions/blob';
import { useAuth } from '@/hooks/use-auth';
import { editSelfShopAvatar } from '@/lib/shop';
import { refreshToken } from '@/lib/auth';
import { useUserModal } from '@/hooks/use-modal';

interface UserAvatarFormProps {
  avatar: string;
}

export default function UserAvatarForm({ avatar }: Readonly<UserAvatarFormProps>) {
  const { registerSession, unregisterSession } = useAuth();
  const { closeAvatarDialog } = useUserModal();
  const [avatarSrc, setAvatarSrc] = useState(`${process.env.NEXT_PUBLIC_BLOB_HOST}/avatars/${avatar}`);
  const [avatarFile, setAvatarFile] = useState<File>();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleSelectClick = () => avatarInputRef.current?.click();
  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      toast.error('사진을 선택해주세요.');
      return;
    }
    setAvatarFile(files[0]);
    setAvatarSrc(URL.createObjectURL(files[0]));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!avatarFile) {
      toast.error('프로필 사진을 선택해주세요.');
      return;
    }

    uploadAvatar(avatarFile).then((path) => {
      editSelfShopAvatar(path).then(() => refreshToken().then(registerSession).catch(unregisterSession));
      closeAvatarDialog();
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Avatar className="mx-auto w-64 h-64">
        <AvatarImage src={avatarSrc} />
      </Avatar>
      <Input type="file" accept="image/*" className="hidden" ref={avatarInputRef} onChange={handleAvatarChange} />
      <div className="flex gap-4">
        <Button type="button" variant="outline" className="w-full" onClick={handleSelectClick}>
          <ImagePlusIcon />
          <span>사진 선택</span>
        </Button>
        <Button type="submit" className="w-full">
          <CheckIcon />
          <span>사진 변경 완료</span>
        </Button>
      </div>
    </form>
  );
}
