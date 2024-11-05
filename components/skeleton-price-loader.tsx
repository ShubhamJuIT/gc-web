import React from 'react'
import { Skeleton } from './ui/skeleton'

const SkeletonPriceLoader = () => {
    return (
        <div className="flex items-center  space-x-4">
            <Skeleton className="h-12 w-12 rounded-full bg-[#444]" />
            <div className="space-y-2">
                <Skeleton className="h-4 md:w-[250px] w-[200px] bg-[#444]" />
                <Skeleton className="h-4 md:w-[200px] w-[180px] bg-[#444]" />
            </div>
        </div>
    )
}

export default SkeletonPriceLoader