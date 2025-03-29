import { useContext } from 'react';
import { SupportContext } from '@/providers/support';

const useSupport = () => useContext(SupportContext);

export { useSupport };
