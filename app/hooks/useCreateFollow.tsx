import { database, ID } from "@/libs/AppWriteClient"

const useCreateFollow = async (user_id: string, poster_id: string) => {
    try {
        await database.createDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_FOLLOWS), 
            ID.unique(), 
        {
            user_id: user_id,
            poster_id: poster_id,
        });
    } catch (error) {
        throw error
    }
}

export default useCreateFollow