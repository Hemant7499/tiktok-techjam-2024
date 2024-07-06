"use client"

import { useEffect } from "react"
import MainLayout from "./layouts/MainLayout"
import { useForYouStore, usePostStore } from "@/app/stores/post"
import ClientOnly from "./components/ClientOnly"
import PostMain from "./components/PostMain"

export default function Home() {
  let { allPosts, setAllPosts } = useForYouStore();
  let limit : number = 5;
  let offset : number = 0;
  useEffect(() => { setAllPosts(limit, offset)}, [])
	const handleScroll = (e : any) => {
		const bottom = Math.floor(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
		console.log("e.target.scrollHeight="+ e.target.scrollHeight);
		console.log("e.target.scrollTop="+ e.target.scrollTop);
		console.log("e.target.clientHeight="+ e.target.clientHeight);
      if (bottom) {
        offset += 5
      }
		console.log("offset "+ offset)
	  }
  return (
    <>
      <MainLayout>
        <div className="max-w-[690px]" 
          onScrollCapture={handleScroll}
        >
          <ClientOnly>
            {allPosts.map((post, index) => (
              <PostMain post={post} key={index} ordKey={index + 1} />
            ))}
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  )
}

