import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { Modal } from './types';

const ModalsContext = createContext<Dispatch<SetStateAction<Modal[]>> | undefined>(undefined);
export default ModalsContext;

