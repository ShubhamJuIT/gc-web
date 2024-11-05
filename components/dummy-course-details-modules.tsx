'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import SpecialTitle from "./specialTitle";



const DummyCourseDetailsModules = (props: {
    data: any[]
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {

        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && <Swiper

                spaceBetween={24}

                modules={[FreeMode]}
                freeMode={false}

                slidesPerView={2}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 5.6,
                    },
                }}
            >

                {props?.data?.map((item, i) => {
                    return <SwiperSlide key={i} >
                        <>
                            <figure className={`overflow-hidden flex-none relative bg-gray-600 rounded-lg   h-28 mb-3`}>
                                <Image
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    fill
                                    className="w-auto h-auto object-cover"
                                    src={item?.poster} alt={item?.title} />


                            </figure>

                            <p className=" text-white/70  font-light text-sm">
                                <SpecialTitle
                                    text={item?.title}
                                    className=' font-semibold text-white'
                                />
                            </p>

                        </>





                    </SwiperSlide>
                })}


            </Swiper>}</>
    )
}

export default DummyCourseDetailsModules