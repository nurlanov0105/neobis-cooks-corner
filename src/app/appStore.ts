import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer } from './appReducer';
import { authApi } from '@/features/authentication';
import { recipeApi } from '@/entities/recipes';
import { searchApi } from '@/entities/search';
import { profileApi } from '@/entities/profile';

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
         authApi.middleware,
         recipeApi.middleware,
         searchApi.middleware,
         profileApi.middleware
      ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
