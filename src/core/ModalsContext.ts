import { createContext, Dispatch, SetStateAction } from 'react';
import { Modal } from './types';

const ModalsContext = createContext<Dispatch<SetStateAction<Modal[]>> | undefined>(undefined);
export default ModalsContext;

