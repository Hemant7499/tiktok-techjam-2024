import { database, storage, ID } from "@/libs/AppWriteClient"
import { driver } from "@/libs/Neo4jDriver"

const useCreatePost = async (file: File, userId: string, caption: string) => {
    let videoId = Math.random().toString(36).slice(2, 22)

    try {
        const id = ID.unique()
        await database.createDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST), 
            id, 
        {
            user_id: userId,
            text: caption,
            video_url: videoId,
            created_at: new Date().toISOString(),
        });
        await storage.createFile(String(process.env.NEXT_PUBLIC_BUCKET_ID), videoId, file)

        handleNeo4jCreate(userId, id, caption);
    } catch (error) {
        throw error
    }

}

const handleNeo4jCreate = async (userId: string, postId: string, desc: string) => {
    try {
        const session = driver.session()

        const cypher = `
        MERGE (a:Post {user_id: $u_id,post_id: $p_id, desc: $d})
           `
        const res = await session.run(cypher,{u_id:userId,p_id:postId,d:desc})
        session.close()
    } catch (error) {
        console.error('Error running Neo4j query:', error);
    }
};

export default useCreatePost