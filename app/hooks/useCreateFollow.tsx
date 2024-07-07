import { database, ID } from "@/libs/AppWriteClient"
import { driver } from "@/libs/Neo4jDriver"

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

        handleNeo4jCreate(user_id, poster_id);
    } catch (error) {
        throw error
    }
    
}

const handleNeo4jCreate = async (userId: string, posterId: string) => {
    try {
        const session = driver.session()

        const cypher = `
           MATCH (a:User {user_id: $u_id}) 
           MATCH (b:User {user_id: $p_id})
           MERGE (a) - [:FOLLOWS] -> (b)
           `
        const res = await session.run(cypher,{u_id:userId,p_id:posterId})
        session.close()
    } catch (error) {
        console.error('Error running Neo4j query:', error);
    }
};

export default useCreateFollow