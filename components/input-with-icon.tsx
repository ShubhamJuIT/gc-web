"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const InputwithIcon = (props: {
    query?: string
}) => {
    const router = useRouter();
    const handleOnChange = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Enter') {
            let finalData;
            if (e?.currentTarget?.value?.trim()?.length > 0) {
                finalData = {
                    q: e?.currentTarget?.value,
                    p: 1,
                }
            } else {
                finalData = {
                    p: 1,
                }
            }
            const searchParams = new URLSearchParams(finalData as any)?.toString()
            router.push(`/courses?${searchParams}`);
            router.refresh();


        }

    }
    return (
        <div className=" flex items-center h-10 overflow-hidden w-full px-3  rounded-md border text-lg  ">
            <Image src='/svgs/search.svg' alt="search icon" width={24} height={27} className=" flex-none opacity-70" />
            <input defaultValue={props?.query} onKeyDown={handleOnChange} placeholder="Serach..." className=" px-3 w-full h-full ring-offset-background bg-background  placeholder:text-white/70 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50" />
        </div>
    )
}

export default InputwithIcon