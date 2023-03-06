import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from './types';

type AppDispatchFunc = () => AppDispatch | AppThunk;
export const useDispatch: AppDispatchFunc = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
