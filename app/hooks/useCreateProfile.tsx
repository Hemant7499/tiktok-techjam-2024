import { database, ID } from "@/libs/AppWriteClient"
import { driver } from "@/libs/Neo4jDriver"

const useCreateProfile = async (userId: string, name: string, image: string, bio: string) => {
    try {
        await database.createDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
            ID.unique(), 
        {
            user_id: userId,
            name: name,
            image: image,
            bio: bio,
        });
        handleNeo4jCreate(userId,name,bio);
    } catch (error) {
        throw error
    }
}

const handleNeo4jCreate = async (userId: string, name: string, bio: string) => {
    try {
        const session = driver.session()

        const cypher = `
           MERGE (a:User {user_id: $u_id,name: $n, bio: $b})
           `
        const res = await session.run(cypher,{u_id:userId,n:name,b:bio})
        session.close()
    } catch (error) {
        console.error('Error running Neo4j query:', error);
    }
};

export default useCreateProfile