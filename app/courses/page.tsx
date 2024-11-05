import CoursesBanner from '@/components/courses-banner'
import CoursesList from '@/components/courses-list'
import SimpleLoader from '@/components/simple-loader'
import { Suspense } from 'react'


const Courses = async ({
    searchParams,
}: {
    searchParams: {
        q: string,
        p: string,
    }
}) => {
    return (
        <>
            <CoursesBanner />
            <Suspense fallback={
                <div className=' container my-10'>
                    <SimpleLoader wrapperClassName='!h-[60vh] ' />
                </div>

            }>
                <CoursesList searchParams={searchParams} />
            </Suspense>

        </>
    )
}

export default Courses