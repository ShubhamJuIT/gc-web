"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';



import CourseCard from './course-card';
import { CourseModel } from '@/app/data/_models/course/course.model';



const CoursesCarousel = (props: {
    data: CourseModel[]
}) => {

    return (
        <div className=' relative courses'>
            <Swiper

                spaceBetween={28}
                slidesPerView={1}

                modules={[FreeMode, Pagination]}

                pagination={{
                    // dynamicBullets: true,
                    clickable: true,



                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
            >
                {props?.data?.map((item, i) => {
                    return <SwiperSlide className=' h-full sm:mb-20 mb-16' key={i} >
                        <CourseCard showLearnMore={true} item={item} />
                    </SwiperSlide>
                })}


            </Swiper>


        </div>

    )
}

export default CoursesCarousel