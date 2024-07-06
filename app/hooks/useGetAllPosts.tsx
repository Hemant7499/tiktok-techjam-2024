import { database, Query } from "@/libs/AppWriteClient"
import useGetProfileByUserId from "./useGetProfileByUserId";
import { PostWithProfile } from "../types";

const useGetAllPosts = async (limit: number, offset: number) => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST), 
            [ Query.orderDesc("$id"), Query.limit(limit), Query.offset(offset) ]
        );
        const documents = response.documents;
        let result : PostWithProfile[] = [];
        const objPromises = documents.map(async doc => {
            let profile = await useGetProfileByUserId(doc?.user_id)
            
            return ({
                id: doc?.$id,
                user_id: doc?.user_id,
                video_url: doc?.video_url,
                text: doc?.text,
                created_at: doc?.created_at,
                profile: {
                    user_id: profile?.user_id,
                    name: profile?.name,
                    image: profile?.image,
                }
            } as PostWithProfile)
        })

        result = await Promise.all(objPromises)
        return result;
    } catch (error) {
        throw error
    }
}

export default useGetAllPosts