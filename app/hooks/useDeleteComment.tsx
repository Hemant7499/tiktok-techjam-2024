import { database } from "@/libs/AppWriteClient"
import { driver } from "@/libs/Neo4jDriver" 

const useDeleteComment = async (id: string) => {
    try {
        const comment = await database.getDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_COMMENT), 
            id
        );
        await database.deleteDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_COMMENT), 
            id
        );
        handleNeo4jDelete(comment?.user_id,comment?.post_id)
    } catch (error) {
        throw error
    }
}
const handleNeo4jDelete = async (userId: string, postId: string) => {
    try {
        const session = driver.session()
       
        const cypher = `
           MATCH (a:User {user_id: $u_id}) 
           - [r:COMMENTS] -> (b:Post {post_id: $p_id})
           DETACH DELETE r
           `
        const res = await session.run(cypher,{u_id:userId, p_id:postId})
        session.close()
    } catch (error) {
        console.error('Error running Neo4j query:', error);
    }
};
export default useDeleteComment