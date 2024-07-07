import React from "react"
import SideNavMain from "./includes/SideNavMain"
import TopNav from "./includes/TopNav"
import { usePathname } from "next/navigation"
import BottomNav from "./includes/BottomNav"

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
	let offset : number = 0;
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
			<TopNav/>
			<div className={`justify-between mx-auto py-[50px] w-full lg:px-2.5 px-0 ${pathname == '/' ? 'max-w-[1140px]' : ''}`}
				onScrollCapture={handleScroll}
			>
			{/* <div> */}
				{/* <SideNavMain /> */}
				{children}
			</div>
			<BottomNav/>
      	</>
    )
}
  