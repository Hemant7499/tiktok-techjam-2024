import { database, ID } from "@/libs/AppWriteClient"
import { driver } from "@/libs/Neo4jDriver"

const useCreateLike = async (userId: string, postId: string) => {
    try {
        await database.createDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE), 
            ID.unique(), 
        {
            user_id: userId,
            post_id: postId,
        });

        handleNeo4jCreate(userId, postId);
    } catch (error) {
        throw error
    }
}

const handleNeo4jCreate = async (userId: string, postId: string) => {
    try {
        const session = driver.session()

        const cypher = `
        MATCH (a:User {user_id: $u_id}) MATCH (b:Post {post_id: $p_id})
        MERGE (a) - [:LIKES] -> (b)
           `
        const res = await session.run(cypher,{u_id:userId,p_id:postId})
        session.close()
    } catch (error) {
        console.error('Error running Neo4j query:', error);
    }
};

export default useCreateLike