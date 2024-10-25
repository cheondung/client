import { useContext } from 'react';
import { ProductModalContext } from '@/providers/product-modal';

const useProductModal = () => useContext(ProductModalContext);

export { useProductModal };
