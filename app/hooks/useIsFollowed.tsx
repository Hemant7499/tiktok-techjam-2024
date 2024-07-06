import { Follow } from "../types";
import { database, Query } from "@/libs/AppWriteClient"

const useIsFollowed = async (userId: string, posterId: string) => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_FOLLOWS), 
            [
                Query.equal('user_id', userId),
                Query.equal('poster_id', posterId)
            ]
        );
        return response
    } catch (error) {
        throw error
    }
}

export default useIsFollowed