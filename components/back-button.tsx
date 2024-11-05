"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();
    return (
        <button onClick={() => router?.back()} className=" mr-2 text-secondary flex justify-center  font-semibold">

            <ChevronLeft />  Back
        </button>
    )
}

export default BackButton