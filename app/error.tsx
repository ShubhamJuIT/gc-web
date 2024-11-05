'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <section className=" pt-28">
            <div className=' md:p-8 p-6'>
                <div className=' flex justify-center items-center flex-col'>
                    <figure className=' mb-5'>
                        <Image

                            src="/svgs/404.svg"
                            height={32}
                            width={32}
                            className=' w-full lg:h-96 h-auto'
                            alt="404"

                        />
                    </figure>

                    <h1 className=' text-lg font-semibold'>Something went wrong</h1>

                    <p className=' text-sm text-black/80 mb-3'>Please try again</p>
                    {/* // Attempt to recover by trying to re-render the segment */}
                    <Button onClick={() => reset()} size='sm'>
                        Try again

                    </Button>
                </div>
            </div>

        </section>
    )
}