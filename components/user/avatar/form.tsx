'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface UserAvatarFormProps {
  avatar: string;
  name: string;
}

export default function UserAvatarForm({ avatar, name }: Readonly<UserAvatarFormProps>) {
  const [avatarFile, setAvatarFile] = useState<File>();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const handleAvatarClick = () => avatarInputRef.current?.click();
  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      toast.error('No file selected');
      return;
    }
    setAvatarFile(files[0]);
  };

  useEffect(() => {
    if (!avatarFile) return;
    // TODO: Update user avatar
  }, [avatarFile]);

  return (
    <>
      <Avatar className="w-32 h-32 cursor-pointer transition-opacity hover:opacity-50" onClick={handleAvatarClick}>
        <AvatarImage src={`https://github.com/${avatar}`} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <Input type="file" accept="image/*" className="hidden" ref={avatarInputRef} onChange={handleAvatarChange} />
    </>
  );
}
