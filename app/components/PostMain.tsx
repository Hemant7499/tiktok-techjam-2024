"use client";

import { AiFillHeart } from "react-icons/ai";
import { ImMusic } from "react-icons/im";
import Link from "next/link";
import { useEffect } from "react";
import PostMainLikes from "./PostMainLikes";
import useCreateBucketUrl from "../hooks/useCreateBucketUrl";
import { PostMainCompTypes } from "../types";
import ClientOnly from "./ClientOnly"
import { BiChevronLeft } from "react-icons/bi";
import React from "react";

export default function PostMain({ post, ordKey }: PostMainCompTypes) {

    useEffect(() => {
        const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement;
        const postMainElement = document.getElementById(`PostMain-${post.id}`);
        
        if (postMainElement) {
            let observer = new IntersectionObserver((entries) => {
                entries[0].isIntersecting ? video?.play() : video?.pause();
                
                if (ordKey !== undefined && ordKey % 5 == 0) {
                    console.log(ordKey);
                }
            }, { threshold: [0.6] });
        
            observer.observe(postMainElement);
        }

    }, []);

    return (
        <>
            <div id={`PostMain-${post.id}`} className="flex border-b relative">
                <div 
                    id="PostPage" 
                    className="lg:flex justify-between w-full h-screen bg-black overflow-auto"
                >
                    <div className="lg:w-[calc(100%-540px)] h-full relative">
                        <Link
                            href={`/profile/${post.profile.user_id}`}
                            className="absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
                        >
                            <BiChevronLeft size="27"/>
                        </Link>
                        <ClientOnly>
                            <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
                                {post?.video_url ? (
                                    <div className="relative">
                                        <video 
                                            autoPlay
                                            loop
                                            muted
                                            className="h-screen mx-auto" 
                                            src={useCreateBucketUrl(post.video_url)}
                                            // onTouchMove={(event) => handleTouchMove(event)}
                                            // onTouchStart={(event) => handleTouchStart(event)}
                                            // onTouchEnd={(event) => handleTouchEnd(event)}
                                        />
                                        <div className="absolute bottom-5 right-5">
                                            <PostMainLikes post={post}/>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </ClientOnly>
                    </div>
                </div>
            </div>
        </>
    );
}