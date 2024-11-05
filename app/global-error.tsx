'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
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
                            <Button onClick={() => reset()} size='sm'>
                                Try again
                            </Button>
                        </div>
                    </div>

                </section>

            </body>
        </html>
    )
}