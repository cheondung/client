'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ImagePlusIcon } from 'lucide-react';
import { CheckIcon } from '@radix-ui/react-icons';
import { useUserModal } from '@/hooks/use-modal';
import { useAuth } from '@/hooks/use-auth';
import { refreshToken } from '@/lib/auth';
import { uploadImage } from '@/lib/image';
import { editSelfShopAvatar } from '@/lib/shop';
import { parseImagePath } from '@/lib/parse';

interface UserAvatarFormProps {
  avatar: string;
}

export default function UserAvatarForm({ avatar }: Readonly<UserAvatarFormProps>) {
  const { registerSession, unregisterSession } = useAuth();
  const { closeAvatarDialog } = useUserModal();
  const [avatarFile, setAvatarFile] = useState<File>();
  const [avatarPreview, setAvatarPreview] = useState(parseImagePath(avatar, 'VERCEL'));
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      toast.error('사진을 선택해주세요.');
      return;
    }
    setAvatarFile(files[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!avatarFile) {
      toast.error('프로필 사진을 선택해주세요.');
      return;
    }

    uploadImage(avatarFile)
      .then(({ pathname }) => {
        refreshToken().then(registerSession).catch(unregisterSession);
        editSelfShopAvatar(pathname)
          .then((body) => toast.success(body.message))
          .catch((err) => toast.error(err.message));
        closeAvatarDialog();
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    if (!avatarFile) return;

    const url = URL.createObjectURL(avatarFile);
    setAvatarPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Avatar className="mx-auto size-64 border">
        <AvatarImage src={avatarPreview} />
      </Avatar>
      <input type="file" accept="image/*" className="hidden" ref={avatarInputRef} onChange={handleAvatarChange} />
      <div className="flex gap-4">
        <Button type="button" variant="outline" className="w-full" onClick={() => avatarInputRef.current?.click()}>
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
