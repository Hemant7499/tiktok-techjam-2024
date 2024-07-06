"use client"

import { AiOutlineHome } from "react-icons/ai"
import { RiGroupLine } from "react-icons/ri"
import { BsCameraVideo, BsHandbag } from "react-icons/bs"
import { MenuItemTypes } from "@/app/types"
import Link from "next/link"

export default function MenuItem({ iconString, colorString, sizeString }: MenuItemTypes) {

    const icons = () => {
        if (iconString == 'For You') return <AiOutlineHome size={sizeString} color={colorString} />
        if (iconString == 'Following') return <RiGroupLine size={sizeString} color={colorString} />
        if (iconString == 'LIVE') return <BsCameraVideo size={sizeString} color={colorString} />
        if (iconString == 'SHOP') return <BsHandbag size={sizeString} color={colorString} />
    }

    const links = () => {
        if (iconString == 'For You') return "/";
        if (iconString == 'SHOP') return "/product/123456789";
        return "/";
    }

    return (
        <>
            <div className="w-full flex items-center hover:bg-gray-100 p-2.5 rounded-md">
                <div className="flex items-center lg:mx-0 mx-auto">

                    <Link href={links()}>{icons()}</Link>
                    <Link href={links()}>
                    
                    <p className={`lg:block hidden pl-[9px] mt-0.5 font-semibold text-[17px] text-[${colorString}]`}>
                        {iconString}
                    </p>
                    </Link>
                </div>
            </div>
        </>
    )
}
