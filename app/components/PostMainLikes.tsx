import { AiFillHeart } from "react-icons/ai"
import { FaShare, FaCommentDots, FaPlus } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useUser } from "../context/user"
import { BiLoaderCircle } from "react-icons/bi"
import { useGeneralStore } from "../stores/general"
import { useRouter } from "next/navigation"
import { Comment, Like, PostMainLikesCompTypes } from "../types"
import useCreateBucketUrl from "../hooks/useCreateBucketUrl"
import useGetCommentsByPostId from "../hooks/useGetCommentsByPostId"
import useGetLikesByPostId from "../hooks/useGetLikesByPostId"
import useIsLiked from "../hooks/useIsLiked"
import useCreateLike from "../hooks/useCreateLike"
import useDeleteLike from "../hooks/useDeleteLike"
import useIsFollowed from "../hooks/useIsFollowed"
import useCreateFollow from "../hooks/useCreateFollow"
import useDeleteFollow from "../hooks/useDeleteFollow"

export default function PostMainLikes({ post }: PostMainLikesCompTypes) {

    let { setIsLoginOpen } = useGeneralStore();

    // const router = useRouter()
    const contextUser = useUser()
    const [hasClickedLike, setHasClickedLike] = useState<boolean>(false)
    const [userLiked, setUserLiked] = useState<boolean>(false)
    const [comments, setComments] = useState<Comment[]>([])
    const [likes, setLikes] = useState<Like[]>([])

    const [hasClickedFollow, setHasClickedFollow] = useState<boolean>(false)
    const [userFollowed, setUserFollowed] = useState<boolean>(false)
    const [followId, setFollowId] = useState<string>("")

    useEffect(() => { 
        getAllLikesByPost()
        getAllCommentsByPost()
    }, [post])

    useEffect(() => { hasUserLikedPost() }, [likes, contextUser])

    useEffect(() => { hasUserFollowed()}, [contextUser])


    const hasUserFollowed = async () => {
        if (!contextUser) return
        let id = contextUser?.user?.id;
        let res = await useIsFollowed(id ? id : "", post?.profile?.user_id)
        if(res.documents.length == 0)
            setUserFollowed(false)
        else{
            setUserFollowed(true)
            setFollowId(res.documents[0].$id)
        }
    }


    const getAllCommentsByPost = async () => {
        let result = await useGetCommentsByPostId(post?.id)
        setComments(result)
    }

    const getAllLikesByPost = async () => {
        let result = await useGetLikesByPostId(post?.id)
        setLikes(result)
    }

    const hasUserLikedPost = () => {
        if (!contextUser) return

        if (likes?.length < 1 || !contextUser?.user?.id) {
            setUserLiked(false)
            return
        }
        let res = useIsLiked(contextUser?.user?.id, post?.id, likes)
        setUserLiked(res ? true : false)
    }

    const like = async () => {
        setHasClickedLike(true)
        await useCreateLike(contextUser?.user?.id || '', post?.id)
        await getAllLikesByPost()
        hasUserLikedPost()
        setHasClickedLike(false)
    }

    const unlike = async (id: string) => {
        setHasClickedLike(true)
        await useDeleteLike(id)
        await getAllLikesByPost()
        hasUserLikedPost()
        setHasClickedLike(false)
    }

    const likeOrUnlike = () => {
        if (!contextUser?.user?.id) {
            setIsLoginOpen(true)
            return
        }
        
        let res = useIsLiked(contextUser?.user?.id, post?.id, likes)

        if (!res) {
            like()
        } else {
            likes.forEach((like: Like) => {
                if (contextUser?.user?.id == like?.user_id && like?.post_id == post?.id) {
                    unlike(like?.id) 
                }
            })
        }
    }

    // follow

    const follow = async () => {
        setHasClickedFollow(true)
        let id = contextUser?.user?.id;
        await useCreateFollow(id ? id : "" , post?.profile?.user_id)
        hasUserFollowed()
        setHasClickedFollow(false)
    }

    const unfollow = async (id: string) => {
        setHasClickedFollow(true)
        // console.log(id)
        await useDeleteFollow(id)
        hasUserFollowed()
        setHasClickedFollow(false)
    }

    const followOrUnfollow = async () => {
        if (!contextUser?.user?.id) {
            setIsLoginOpen(true)
            return
        }
        
        let res = await useIsFollowed(contextUser?.user?.id, post?.profile?.user_id)
        if (res.documents.length == 0) {
            follow()
        } else {
            unfollow(followId)
        }
    }

    return (
        <>
            <div id={`PostMainLikes-${post?.id}`} className="relative mr-[50px]">
                <div className="absolute bottom-0 pl-2">
                    <div className="pb-8 text-center">
                        <button 
                            disabled={hasClickedFollow}
                            onClick={() => followOrUnfollow()} 
                            className="rounded-full bg-gray-200/50 p-2 cursor-pointer"
                        >
                            {!userFollowed ? (
                                <div className="cursor-pointer">
                                    <FaPlus color='#ff2626' size="15"/>
                                </div>
                            ) : (
                                <div className="cursor-pointer">
                                    <img className="rounded-full max-h-[60px]" width="70" src={useCreateBucketUrl(post?.profile?.image)} />
                                </div>
                            )}
                        </button>
                    </div>
                    <div className="pb-4 text-center">
                        <button 
                            disabled={hasClickedLike}
                            onClick={() => likeOrUnlike()} 
                            className="rounded-full bg-gray-200/50 p-2 cursor-pointer"
                        >
                            {!hasClickedLike ? (
                                <AiFillHeart color={likes?.length > 0 && userLiked ? '#ff2626' : ''} size="15"/>
                            ) : (
                                <BiLoaderCircle className="animate-spin" size="15"/>
                            )}
                            
                        </button>
                        <span className="rounded-full bg-gray-200/50 p-1 cursor-pointer">
                            {likes?.length}
                        </span>
                    </div>

                    <button 
                        // onClick={() => router.push(`/post/${post?.id}/${post?.profile?.user_id}`)} 
                        className="pb-4 text-center"
                    >
                        <div className="rounded-full bg-gray-200/50 p-2 cursor-pointer">
                            <FaCommentDots size="15"/>
                        </div>
                        <span className="rounded-full bg-gray-200/50 p-1 cursor-pointer">{comments?.length}</span>
                    </button>

                    <button className="text-center">
                        <div className="rounded-full bg-gray-200/50 p-2 cursor-pointer">
                            <FaShare size="15"/>
                        </div>
                        <span className="rounded-full bg-gray-200/50 p-1 cursor-pointer">55</span>
                    </button>
                </div>
            </div>
        </>
    )
}
