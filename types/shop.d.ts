interface Shop {
  id: number;
  name: string;
  introduction: string;
  avatar: string;
}

interface ShopDetail extends Shop {
  email: string;
}

interface EditShop {
  name: string;
  introduction: string;
}
