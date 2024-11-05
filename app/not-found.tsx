import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
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

                    <h1 className=' text-lg font-semibold'>Not Found</h1>

                    <p className=' text-sm text-black/80 mb-3'>Could not find requested resource</p>
                    <Link href="/">
                        <Button size='sm'>
                            Return Home
                        </Button>
                    </Link>
                </div>
            </div>

        </section>

    )
}