import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { Post, PostWithProfile } from '../types';
import useGetAllPosts from '../hooks/useGetAllPosts';
import useGetPostsByUser from '../hooks/useGetPostsByUserId';
import useGetPostById from '../hooks/useGetPostById';
  
interface PostStore {
    allPosts: PostWithProfile[];
    postsByUser: Post[];
    postById: PostWithProfile | null;
    // setAllPosts: () => void;
    setPostsByUser: (userId: string) => void;
    setPostById: (postId: string) => void;
}

interface ForYouPostStore {
    allPosts: PostWithProfile[];
    setAllPosts: (limit : number, offset : number) => void;
}


export const usePostStore = create<PostStore>()( 
    devtools(
        persist(
            (set) => ({
                allPosts: [],
                postsByUser: [],
                postById: null,

                // setAllPosts: async () => {
                //     const result = await useGetAllPosts()
                //     set({ allPosts: result });
                // },
                setPostsByUser: async (userId: string) => {
                    const result = await useGetPostsByUser(userId)
                    set({ postsByUser: result });
                },
                setPostById: async (postId: string) => {
                    const result = await useGetPostById(postId)
                    set({ postById: result })
                },
            }),
            { 
                name: 'store', 
                storage: createJSONStorage(() => localStorage) 
            }
        )
    )
)

export const useForYouStore = create<ForYouPostStore>()( 
    devtools(
        persist(
            (set) => ({
                allPosts: [],
                setAllPosts: async (limit : number, offset : number) => {
                    const result = await useGetAllPosts(limit, offset)
                    set((state) => { 
                        result.concat(state.allPosts);
                        return {allPosts : result}; 
                    });
                }
            }),
            { 
                name: 'store', 
                storage: createJSONStorage(() => localStorage) 
            }
        )
    )
)



