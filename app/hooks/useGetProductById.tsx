import { database, Query } from "@/libs/AppWriteClient"

const useGetProductById = async (product_id: string) => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_PRODUCT), 
            [
                Query.equal('product_id', product_id)
            ]
        );
        const product = response.documents;
        return {
            product_id: product_id, 
            image: product[0]?.image_url,
            title: product[0]?.title,
            brand: product[0]?.brand,
            rating: product[0]?.rating,
            price: product[0]?.price,
            description: product[0]?.description
        } 
    } catch (error) {
        throw error
    }
}

export default useGetProductById