import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { Product } from '../types';
import useGetProductById from '../hooks/useGetProductById';

interface ProductStore {
    productById: Product | null;
    setProductById: (productId: string) => void;
}

export const useProductStore = create<ProductStore>()( 
    devtools(
        persist(
            (set) => ({
                productById: null,

                setProductById: async (productId: string) => {
                    const result = await useGetProductById(productId)
                    set({ productById: result })
                },
            }),
            { 
                name: 'store', 
                storage: createJSONStorage(() => localStorage) 
            }
        )
    )
)
