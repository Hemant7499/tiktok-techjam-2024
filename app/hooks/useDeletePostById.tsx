import { database, Query, storage } from "@/libs/AppWriteClient"
import useDeleteComment from "./useDeleteComment";
import useDeleteLike from "./useDeleteLike";
import useGetCommentsByPostId from "./useGetCommentsByPostId";
import useGetLikesByPostId from "./useGetLikesByPostId";
import { driver } from "@/libs/Neo4jDriver"

const useDeletePostById = async (postId: string, currentImage: string) => {
    try {
        const likes = await useGetLikesByPostId(postId)
        likes.forEach(async like => { await useDeleteLike(like?.id) })
        
        const comments = await useGetCommentsByPostId(postId)
        comments.forEach(async comment => { await useDeleteComment(comment?.id) })

        await database.deleteDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST), 
            postId
        );
        await storage.deleteFile(String(process.env.NEXT_PUBLIC_BUCKET_ID), currentImage);
        handleNeo4jDelete(postId);
    } catch (error) {
        throw error
    }
}

const handleNeo4jDelete = async ( postId: string) => {
    try {
        const session = driver.session()
       
        const cypher = `
           MATCH (b:Post {post_id: $p_id})
           DETACH DELETE b
           `
        const res = await session.run(cypher,{p_id:postId})
        console.log(res.records[0])
        session.close()
    } catch (error) {
        console.error('Error running Neo4j query:', error);
    }
};

export default useDeletePostById