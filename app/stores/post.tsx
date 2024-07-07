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
    setAllPosts: (limit : number, offset : number, allPosts: PostWithProfile[]) => void;
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
                setAllPosts: async (limit : number, offset : number, postList: PostWithProfile[]) => {
                    const result = await useGetAllPosts(limit, offset)
                    result.forEach( pos => postList.push(pos))
                    console.log("Retrieved " + result.length + " new posts")
                    if (result.length == limit){
                        let adv : PostWithProfile = {
                            "id": "66830e611dd472b91492",
                            "user_id": "668307b2a7c8064553ac",
                            "video_url": "v7iehywdli",
                            "text": "Send ittttttt 🔥🔥🔥 #racing #carting",
                            "created_at": "2024-07-01T20:15:28.414+00:00",
                            "profile": {
                                "user_id": "668307b2a7c8064553ac",
                                "name": "Zorro",
                                "image": "667e1ed6001b0c4e53a6"
                            }
                        }
                        postList.push(adv)
                    }
                    
                    set({ allPosts: postList })
                }
            }),
            { 
                name: 'store', 
                storage: createJSONStorage(() => localStorage) 
            }
        )
    )
)



