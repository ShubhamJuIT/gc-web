'use client'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import SpecialTitle from "@/components/specialTitle";

import { showErrorToast } from "@/app/data/error.manager";
import SimpleLoader from "../../simple-loader";
import { User } from "@/app/data/_models/user";
import { CourseContentEnum } from "@/app/data/_enums/course.content.enum";
import DynamicImage from "../../dynamicImage";
import { CourseModel } from "@/app/data/_models/course/course.model";
import { CourseService } from "@/app/_services/lms/course.service";
import { ModuleService } from "@/app/_services/lms/module.service";
import { QuizService } from "@/app/_services/lms/quiz.service";
import { QuizModel } from "@/app/data/_models/course/quiz.model";
import { ModuleModel } from "@/app/data/_models/course/module.model";
import { CourseContentModel } from "@/app/data/_models/course/course.content.model";
import ModuleArea from "../module-area";
import QuizAreaPreview from "./quiz-area-preview";

export default function StudyAreaPreview(props: {
    courseId: string
}) {
    const [data, setData] = useState<{
        courseData?: CourseModel | null,
        moduleData?: ModuleModel | null,
        quizData?: QuizModel | null,
        certificateData?: any | null,
    } | null>(null);
    const [pageLoader, setPageLoader] = useState(false);
    const [contentLoader, setContentLoader] = useState(false);

    let activeContentId: string | null = null;

    if (data?.moduleData) {
        activeContentId = data.moduleData?.id;
    } else if (data?.quizData) {
        activeContentId = data.quizData?.id;
    }

    const getCertificateInfo = async (courseId: string) => {
        console.log('getCertificateInfo')
    }

    const getQuizInfo = async (quizId: string) => {
        setContentLoader(true);
        try {
            const res = await QuizService.getQuiz(quizId);


            setData(prev => {
                return {
                    ...prev,
                    quizData: res,
                    moduleData: null,
                    certificateData: null,
                }
            })


            setContentLoader(false);

        } catch (error) {
            showErrorToast(error);
            setContentLoader(false);

        }
    }

    const getModuleInfo = async (moduleId: string) => {
        setContentLoader(true);
        try {
            const res = await ModuleService.getModule(moduleId);
            setData(prev => {
                return {
                    ...prev,
                    moduleData: res,
                    quizData: null,
                    certificateData: null,
                }
            })
            setContentLoader(false);

        } catch (error) {
            showErrorToast(error);
            setContentLoader(false);

        }
    }

    useEffect(() => {
        const getCourse = async (courseId: string) => {

            setPageLoader(true);
            try {
                const res = await CourseService.getCourse(courseId);
                if (res?.contents && res?.contents?.length > 0) {
                    const firstContent: CourseContentModel = res?.contents[0];

                    switch (firstContent.type) {

                        case CourseContentEnum.MODULE:
                            getModuleInfo(firstContent?.contentId);
                            break;

                        case CourseContentEnum.QUIZ:
                            getQuizInfo(firstContent?.contentId);
                            break;

                        case CourseContentEnum.CERTIFICATE:
                            getCertificateInfo(firstContent?.contentId);
                            break;

                        default:
                            break;
                    }


                }

                setData({
                    courseData: res,
                    moduleData: null,
                    quizData: null,
                })

                setPageLoader(false);

            } catch (error) {
                showErrorToast(error);
                setPageLoader(false);

            }
        }
        if (props?.courseId && User?.isLoggedIn()) {
            getCourse(props?.courseId);
        }
    }, [props?.courseId]);



    const RenderContentType = () => {
        if (data?.moduleData) {
            return <ModuleArea data={data?.moduleData} />
        } else if (data?.quizData) {
            return <QuizAreaPreview data={data?.quizData} />

        } else if (data?.certificateData) {
            return null
        } else {
            return <span className=" no-data">
                No Information Available
            </span>
        }

    }

    const handleSlideClick = (content: CourseContentModel) => {
        if (contentLoader) {
            return;
        }

        switch (content.type) {

            case CourseContentEnum.MODULE:
                getModuleInfo(content?.contentId);
                break;

            case CourseContentEnum.QUIZ:
                getQuizInfo(content?.contentId);
                break;

            case CourseContentEnum.CERTIFICATE:
                getCertificateInfo(content?.contentId);
                break;

            default:
                break;
        }



    }
    return (
        <>
            {pageLoader && <SimpleLoader wrapperClassName="!h-[60vh]" />}
            {(!pageLoader && !data) && <div className="!h-[60vh] no-data">
                No Data Available

            </div>}


            {(!pageLoader && data) && <>


                {/* active content */}
                {contentLoader ? <SimpleLoader /> : <RenderContentType />}

                <div className={`${data?.courseData?.contents && data?.courseData?.contents?.length > 6 ? 'sm:ml-14  ml-10' : ""} 
                relative  lg:my-20 md:my-16 sm:my-14 my-10 `}>



                    <Swiper
                        className=" relative "
                        spaceBetween={24}

                        navigation={{
                            nextEl: '.next-btn',
                            prevEl: '.prev-btn',
                        }}
                        modules={[Navigation, FreeMode]}
                        freeMode={true}
                        slidesPerView={1.3}
                        breakpoints={{
                            425: {
                                slidesPerView: 2,
                            },
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


                        {data?.courseData?.contents?.map((item, i) => {
                            return <SwiperSlide onClick={() => handleSlideClick(item)} className={`${contentLoader ? " cursor-not-allowed opacity-40" : " cursor-pointer"}`} key={i} >
                                <>
                                    <figure className={`${activeContentId === item?.contentId ? 'border' : 'border-transparent'} overflow-hidden flex-none relative bg-gray-600 rounded-lg  h-28 mb-3`}>

                                        <DynamicImage
                                            wrapperClassName="pb-[56.25%]"
                                            alt={item?.contentTitle}
                                            src={item?.thumbnailUrl ?? '/svgs/image-placeholder.svg'}
                                            fallbackImage='/svgs/image-placeholder.svg'
                                        />

                                    </figure>

                                    <p className=" text-white/70  font-light text-sm">
                                        <SpecialTitle
                                            text={item?.contentTitle}
                                            className=' font-normal text-white'
                                        />
                                    </p>

                                </>


                            </SwiperSlide>
                        })}



                    </Swiper>


                    <div className=" absolute bottom-14  lg:-left-20 -left-16">
                        <div className="  flex flex-col gap-3">
                            <Button disabled className=" prev-btn" size='icon' variant='regular'>
                                <span className=" icon-md">
                                    <i className=" text-2xl icon-arrow-left"></i>
                                </span>
                            </Button>
                            <Button disabled className=" next-btn" size='icon' variant='regular'>
                                <span className=" icon-md">
                                    <i className=" text-2xl icon-arrow-right"></i>
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>




            </>}





        </>
    );
}
