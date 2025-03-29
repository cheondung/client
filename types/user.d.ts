interface UserWishlist {
  id: number;
  keyword: string;
}

interface UserNotification {
  id: number;
  content: string;
  path: string;
  read: boolean;
  createdAt: string;
}

interface EditUserPassword {
  oldPassword: string;
  newPassword: string;
}
