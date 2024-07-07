import { database, ID } from "@/libs/AppWriteClient"
import { driver } from "@/libs/Neo4jDriver" 

const useCreateComment = async (userId: string, postId: string, comment: string) => {
    try {
        await database.createDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_COMMENT), 
            ID.unique(), 
        {
            user_id: userId,
            post_id: postId,
            text: comment,
            created_at: new Date().toISOString(),
        });

        handleNeo4jCreate(userId,postId,comment)
    } catch (error) {
        throw error
    }

}

const handleNeo4jCreate = async (userId: string, postId: string, text: string) => {
    try {
        const session = driver.session()

        const cypher = `
            MATCH (a:User {user_id: $u_id}) 
            MATCH (b:Post {post_id: $p_id})
            MERGE (a) - [:COMMENTS {text : $t} ] -> (b)
           `
        const res = await session.run(cypher,{u_id:userId,p_id:postId,t:text})
        session.close()
    } catch (error) {
        console.error('Error running Neo4j query:', error);
    }
};

export default useCreateComment