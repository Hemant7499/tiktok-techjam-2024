import { database } from "@/libs/AppWriteClient"
import { driver } from "@/libs/Neo4jDriver"

const useDeleteFollow = async (id: string) => {
    try {
        const follow = await database.getDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_FOLLOWS), 
            id
        );
        await database.deleteDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_FOLLOWS), 
            id
        );

        handleNeo4jDelete(follow?.user_id, follow?.poster_id);

    } catch (error) {
        throw error
    }


}

const handleNeo4jDelete = async (userId: string, posterId: string) => {
    try {
        const session = driver.session();

        const cypher = `
           MATCH (a:User {user_id: $u_id}) 
           - [r:FOLLOWS] -> (b:User {user_id: $p_id})
           DETACH DELETE r
           `;
        await session.run(cypher, { u_id: userId, p_id: posterId });
        await session.close();
    } catch (error) {
        console.error('Error running Neo4j query:', error);
    }
};


export default useDeleteFollow