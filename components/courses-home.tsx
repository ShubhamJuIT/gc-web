import React from 'react'
import CoursesCarousel from './courses-carousel'
import Image from 'next/image'
import { CourseService } from '@/app/_services/lms/course.service'
import { CourseModel } from '@/app/data/_models/course/course.model'




const CoursesHome = async (props: {
    showFeatured: boolean
}) => {


    const finalData = {
        query: "",
        page: 0,
        pageSize: 6,
        sortBy: "createdAt",
        sortType: "DESC",
        feature: props.showFeatured,

    }

    const data: {
        array: CourseModel[],
        total: number
    } = await CourseService.findPagiatedPublicCoursesSSR(finalData);


    return (
        <>

            {(data?.array && data?.array?.length > 0) ?
                <section >

                    <div className="container relative">

                        <figure className=' -z-10 absolute top-[14%]  lg:-left-[8%] sm:-left-[5%] -left-[12%] '>       <Image className=' lg:w-full w-1/2 h-full' width={256} height={257} src='/svgs/tl.svg' alt='bg design graphics' /></figure>
                        <figure className=' -z-10 absolute lg:top-[15%] lg:right-[4%] md:-right-[15%] sm:-right-[17%] -right-[39%]  top-[25%]  '>            <Image className='lg:w-full w-1/2 h-full' width={197} height={200} src='/svgs/tr.svg' alt='bg design graphics' /></figure>
                        <figure className=' -z-10 absolute lg:-bottom-[7%] lg:left-[10%] sm:left-[19%]  sm:bottom-[3%] left-[3%]  bottom-0'>            <Image className='  lg:w-full w-1/2 h-full' width={145} height={150} src='/svgs/bl.svg' alt='bg design graphics' /></figure>
                        <figure className=' -z-10 absolute lg:bottom-[7%] lg:-right-[10%] sm:-right-[15%] -right-[42%] bottom-[9%]  '>            <Image className=' lg:w-full w-1/2 h-full' width={238} height={238} src='/svgs/br.svg' alt='bg design graphics' /></figure>
                        <div className=" lg:py-14 md:py-12 sm:py-10 py-7 ">

                            <h2 className=" lg:mb-14 md:mb-12 sm:mb-10 mb-8 xl:text-[146px] lg:text-9xl md:text-7xl text-6xl   text-secondary font-semibold text-center">
                                {props.showFeatured ? 'Featured ' : "Courses"}
                            </h2>
                            <div>

                                <CoursesCarousel data={data?.array} />
                            </div>
                        </div>


                    </div>
                </section>
                : null}
        </>

    )
}

export default CoursesHome