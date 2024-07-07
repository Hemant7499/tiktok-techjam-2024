import { database } from "@/libs/AppWriteClient"
import { driver } from "@/libs/Neo4jDriver"

const useDeleteLike = async (id: string) => {
    try {
        const like = await database.getDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE), 
            id
        );
        await database.deleteDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE), 
            id
        );

        handleNeo4jDelete(like?.user_id, like?.post_id);

    } catch (error) {
        throw error
    }
}
const handleNeo4jDelete = async (userId: string, postId: string) => {
    try {
        const session = driver.session()
       
        const cypher = `
           MATCH (a:User {user_id: $u_id}) 
           - [r:LIKES] -> (b:Post {post_id: $p_id})
           DETACH DELETE r
           `
        const res = await session.run(cypher,{u_id:userId, p_id:postId})
        session.close()
    } catch (error) {
        console.error('Error running Neo4j query:', error);
    }
};
export default useDeleteLike