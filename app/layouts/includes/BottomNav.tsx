import Link from "next/link"
import { debounce } from "debounce";
import { useRouter, usePathname } from "next/navigation"
import { BiSearch, BiUser } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"
import { useEffect, useState } from "react"
import { useUser } from "@/app/context/user"
import { useGeneralStore } from "@/app/stores/general"
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"
import { RandomUsers } from "@/app/types"
import useSearchProfilesByName from "@/app/hooks/useSearchProfilesByName";
import ClientOnly from "@/app/components/ClientOnly";
import MenuItem from "./MenuItem";
import MenuItemFollow from "./MenuItemFollow";

export default function BottomNav() {
    const userContext = useUser()
    const router = useRouter()
    const pathname = usePathname()
    const contextUser = useUser()
    let { setRandomUsers, randomUsers } = useGeneralStore()

    const [searchProfiles, setSearchProfiles] = useState<RandomUsers[]>([])
    let [showMenu, setShowMenu] = useState<boolean>(false)
    let { setIsLoginOpen, setIsEditProfileOpen } = useGeneralStore()

    useEffect(() => { setIsEditProfileOpen(false) }, [])

    const handleSearchName = debounce(async (event: { target: { value: string } }) => {
        if (event.target.value == "") return setSearchProfiles([])

        try {
            const result = await useSearchProfilesByName(event.target.value)
            if (result) return setSearchProfiles(result)
            setSearchProfiles([])
        } catch (error) {
            console.log(error)
            setSearchProfiles([])
            alert(error)
        }
    }, 500)

    const goTo = () => {
        if (!userContext?.user) return setIsLoginOpen(true)
        router.push('/upload')
    }

    return (
        <>
            <div id="BottomNav" className="fixed bg-white z-30 flex items-center w-full border-t h-[40px] bottom-0">
                <div className={`flex items-center justify-between gap-6 w-full px-4 mx-auto max-w-[1150px]`}>
                    <MenuItem iconString="For You" colorString="#F02C56" sizeString="25"/>
                    <MenuItem iconString="Following" colorString="#000000" sizeString="25" />
                    <MenuItem iconString="LIVE" colorString="#000000" sizeString="25" />
                    <MenuItem iconString="SHOP"colorString="#000000" sizeString="25"/>
                </div>
            </div>
        </>
    )
}
