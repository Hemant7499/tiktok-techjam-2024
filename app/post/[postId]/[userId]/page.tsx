"use client"

import Comments from "@/app/components/post/Comments"
import CommentsHeader from "@/app/components/post/CommentsHeader"
import Link from "next/link"
import { useEffect } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BiChevronDown, BiChevronLeft, BiChevronUp } from "react-icons/bi"
import { useRouter } from "next/navigation"
import ClientOnly from "@/app/components/ClientOnly"
import { Post, PostPageTypes } from "@/app/types"
import { usePostStore } from "@/app/stores/post"
import { useLikeStore } from "@/app/stores/like"
import { useCommentStore } from "@/app/stores/comment"
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"


export default function Post({ params }: PostPageTypes) {

    let { postById, postsByUser, setPostById, setPostsByUser } = usePostStore()
    let { setLikesByPost } = useLikeStore()
    let { setCommentsByPost } = useCommentStore()

    let lastTouchY : number = 0;
    let restrict : boolean = false;
    let delta : number = 0;

    const router = useRouter()

    useEffect(() => { 
        setPostById(params.postId)
        setCommentsByPost(params.postId) 
        setLikesByPost(params.postId)
        setPostsByUser(params.userId) 
    }, [])

    const loopThroughPostsUp = () => {
        postsByUser.forEach(post => {
            console.log("New Post")
            if (post.id > params.postId) {
                router.push(`/post/${post.id}/${params.userId}`)
            }
        });
    }

    const handleScrollCapture = (event: any) => {
        console.log('Scroll event during capturing phase:', event.target.scrollTop);
    };

    const handleTouchStart = (event: any) => {
        console.log("touches start length = " + event.touches.length);
        //console.log(event);
        //event.preventDefault();
        lastTouchY = event.touches[0].clientY;
    }

    const handleTouchMove = (event: any) => {
        console.log("touches move length = " + event.touches.length);
        //console.log(event);
        //event.preventDefault();
        delta = lastTouchY - event.touches[0].clientY;
        console.log(delta);
    }

    const handleTouchEnd = (event: any) => {

        if (delta > 0) {
            loopThroughPostsDown();
        } else if (delta < 0){
            loopThroughPostsUp();
        }
        delta = 0;
    }

    const loopThroughPostsDown = () => {
        console.log(postsByUser);
        var idx : string = postsByUser[0].id;
        postsByUser.forEach(post => {
            if (post.id < params.postId) {
                idx = idx < post.id ? post.id : idx;
            }
        });
        router.push(`/post/${idx}/${params.userId}`)
    }

    return (
        <>
            <div 
                id="PostPage" 
                className="lg:flex justify-between w-full h-screen bg-black overflow-auto"
            >
                <div className="lg:w-[calc(100%-540px)] h-full relative"
               >
                    <Link
                        href={`/profile/${params?.userId}`}
                        className="absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
                    >
                        <BiChevronLeft size="27"/>
                    </Link>


                    {/* <img 
                        className="absolute z-20 top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto" 
                        width="45" 
                        src="/images/tiktok-logo-small.png"
                    /> */}

                    <ClientOnly>
                        {postById?.video_url ? (
                            <video 
                                className="fixed object-cover w-full my-auto z-[0] h-screen" 
                                src={useCreateBucketUrl(postById?.video_url)}
                            />
                        ) : null}

                        <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
                            {postById?.video_url ? (
                                <video 
                                    autoPlay
                                    controls
                                    loop
                                    muted
                                    className="h-screen mx-auto" 
                                    src={useCreateBucketUrl(postById.video_url)}
                                    onTouchMove={(event) => handleTouchMove(event)}
                                    onTouchStart={(event) => handleTouchStart(event)}
                                    onTouchEnd={(event) => handleTouchEnd(event)}
                                />
                            ) : null}
                        </div>
                    </ClientOnly>

                </div>

                {/* <div id="InfoSection" className="lg:max-w-[550px] relative w-full h-full bg-white">
                    <div className="py-7" />

                        <ClientOnly>
                            {postById ? (
                                <CommentsHeader post={postById} params={params}/>
                            ) : null}
                        </ClientOnly>
                        <Comments params={params}/>

                </div> */}
            </div>
        </>
    )
}
