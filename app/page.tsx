"use client"

import { useEffect } from "react"
import MainLayout from "./layouts/MainLayout"
import { useForYouStore } from "@/app/stores/post"
import ClientOnly from "./components/ClientOnly"
import PostMain from "./components/PostMain"

export default function Home() {
  let { allPosts, setAllPosts } = useForYouStore();
  let limit : number = 5;
  let offset_unit : number = 0;
  useEffect(() => { 
    allPosts = [];
    setAllPosts(limit, offset_unit, allPosts)
  }, [])

  const fivePostsScrolled = (num: any) => {
    console.log("Received " + allPosts.length + " posts previously");
    if (num === allPosts.length*5/6) {
      setAllPosts(limit, allPosts.length*5/6, allPosts);
    }
  };

  return (
    <>
      <MainLayout>
        <div className="max-w-[690px]" >
          <ClientOnly>
            {allPosts.map((post, index) => (
              <PostMain post={post} key={index} ordKey={index + 1} callbackAfterScroll={fivePostsScrolled}/>
            ))}
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  )
}

