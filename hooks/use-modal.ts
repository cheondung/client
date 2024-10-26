import { useContext } from 'react';
import { ProductModalContext } from '@/providers/product-modal';
import { UserModalContext } from '@/providers/user-modal';

const useProductModal = () => useContext(ProductModalContext);
const useUserModal = () => useContext(UserModalContext);

export { useProductModal, useUserModal };
