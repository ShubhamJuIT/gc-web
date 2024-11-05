'use client'
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { useEffect, useState } from "react";

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import SpecialTitle from "@/components/specialTitle";

import QuizArea from "@/components/study-areas/quiz-area";
import CertificateArea from "@/components/study-areas/certificate-area";
import { CourseEnrollmentService } from "@/app/_services/lms/course.enrollment.service";
import { showErrorToast } from "@/app/data/error.manager";
import SimpleLoader from "../simple-loader";
import { User } from "@/app/data/_models/user";
import { CourseContentEnum } from "@/app/data/_enums/course.content.enum";
import { StudyAreaModel } from "@/app/data/_models/study.area.model";
import DynamicImage from "../dynamicImage";
import { Loader2 } from "lucide-react";
import { CourseContentModel } from "@/app/data/_models/course/course.content.model";
import ModuleArea from "./module-area";



const getPrevContent = (data: StudyAreaModel) => {
    const currentContentId = data?.currentContentProgress?.contentId;
    const currentContentIndex = data?.courseModel?.contents?.findIndex((item) => item?.contentId === currentContentId);
    const previousItemInArray = data?.courseModel?.contents?.[(currentContentIndex ?? -1) - 1];
    return previousItemInArray;
}



export default function StudyAreaDetails(props: {
    courseId: string
}) {
    const [data, setData] = useState<StudyAreaModel | null>(null);
    const [pageLoader, setPageLoader] = useState(false);
    const [nextContentLoader, setNextContentLoader] = useState(false);
    const [prevContentLoader, setPrevContentLoader] = useState(false);
    const [prevContent, setPrevContent] = useState<CourseContentModel | null | undefined>(null);
    let disableContinueBtn;
    if (data?.currentContentType === CourseContentEnum.MODULE) {
        disableContinueBtn = false
    } else if (data?.currentContentType === CourseContentEnum.QUIZ) {
        disableContinueBtn = !data?.currentContentProgress?.quizPassed;


    } else if (data?.currentContentType === CourseContentEnum.CERTIFICATE) {
        disableContinueBtn = false;
    }


    let activeContent: any;

    if (data?.currentContentType === CourseContentEnum.MODULE) {
        activeContent = data?.moduleModel
    } else if (data?.currentContentType === CourseContentEnum.QUIZ) {
        activeContent = data?.quizModel
    }
    else if (data?.currentContentType === CourseContentEnum.CERTIFICATE) {
        activeContent = data?.certificateModel
    }


    const RenderContentType = () => {
        switch (data?.currentContentType) {
            case CourseContentEnum.MODULE:
                return <ModuleArea data={data?.moduleModel} />

            case CourseContentEnum.QUIZ:
                return <QuizArea nextContentLoader={nextContentLoader} onFinished={onQuizComplete} data={data} />

            case CourseContentEnum.CERTIFICATE:
                return <CertificateArea data={data} />

            default:
                return <span className=" no-data">
                    No Information Available
                </span>

        }
    }

    const startCourse = async (courseId: string) => {
        setPageLoader(true)

        try {
            const res: StudyAreaModel = await CourseEnrollmentService.startCourse(courseId);

            setPrevContent(getPrevContent(res));

            setData(res);
            setPageLoader(false)
        } catch (error) {

            showErrorToast(error);
            setPageLoader(false)

        }

    }

    const onQuizComplete = (passPercentage: number, isQuizPassed: boolean) => {

        if (!data) {
            return;
        }

        const freshData = { ...data };
        freshData.currentContentProgress.quizPassed = isQuizPassed;
        freshData.currentContentProgress.quizPercentage = passPercentage;
        setData(freshData);
        if (freshData?.currentContentProgress?.quizPassed) {
            getNextContent();
        }

    }

    const getNextContent = async () => {
        if (!data?.currentContentType) {
            return;
        }

        let contentId;

        if (data?.currentContentType === CourseContentEnum.MODULE) {
            contentId = data?.moduleModel?.id
        } else if (data?.currentContentType === CourseContentEnum.QUIZ) {
            contentId = data?.quizModel?.id
        } else if (data?.currentContentType === CourseContentEnum.CERTIFICATE) {
            contentId = data?.certificateModel?.id
        }


        setNextContentLoader(true)

        try {
            const res: StudyAreaModel = await CourseEnrollmentService.getNextCourseContent(props?.courseId, data?.currentContentType, contentId);
            setPrevContent(getPrevContent(res));
            setData(res);
            setNextContentLoader(false)
        } catch (error) {

            showErrorToast(error);
            setNextContentLoader(false)

        }

    }



    const getCourseContent = async (item: CourseContentModel) => {
        if (!data?.openedList?.includes(item?.contentId)) {
            return;
        }


        setPrevContentLoader(true)

        try {
            const res: StudyAreaModel = await CourseEnrollmentService.getCourseContent(props?.courseId, {
                contentType: item?.type,
                contentId: item?.contentId
            });
            setPrevContent(getPrevContent(res));
            setData(res);
            setPrevContentLoader(false)
        } catch (error) {

            showErrorToast(error);
            setPrevContentLoader(false)

        }


    }

    const onClickPrevBtn = () => {
        if (!prevContent) {
            return;
        }
        getCourseContent(prevContent)
    }

    useEffect(() => {
        if (props?.courseId && User?.isLoggedIn()) {
            startCourse(props?.courseId)
        }
    }, [props?.courseId]);



    return (
        <>
            {pageLoader && <SimpleLoader wrapperClassName="!h-[80vh]" />}
            {(!pageLoader && !data) && <div className="!h-[80vh] no-data">
                No Data Available

            </div>}


            {(!pageLoader && data) && <>

                <div className=" flex items-start  md:flex-row flex-col justify-between gap-5 mb-8">

                    <div>
                        <Progress className=" mb-2  w-72 " value={data?.enrollmentModel?.progressPercentage ?? 0} />
                        <p className=" font-light">
                            <span className=" text-primary font-bold">{data?.enrollmentModel?.progressPercentage ?? 0}%</span> completed in <span className=" font-bold text-primary">29m</span>
                        </p>
                    </div>

                    <div className=" flex sm:items-center gap-3 sm:flex-row flex-col">
                        <Button disabled={!prevContent || nextContentLoader || prevContentLoader} onClick={onClickPrevBtn} size='sm' variant='ghost' className=" mr-3">
                            <span className=" icon-md">
                                <i className=" icon-arrow-left"></i>
                            </span>
                            Previous
                        </Button>
                        <Button disabled={nextContentLoader || disableContinueBtn} onClick={getNextContent} size='sm'>
                            {nextContentLoader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

                            Complete and Continue
                            <span className=" icon-md">
                                <i className=" icon-arrow-right"></i>
                            </span>
                        </Button>
                    </div>
                </div>

                {/* active content */}

                {prevContentLoader ? <SimpleLoader /> : <RenderContentType />}



                <div className={`${data?.courseModel?.contents && data?.courseModel?.contents?.length > 6 ? 'sm:ml-14  ml-10' : ""} 
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


                        {data?.courseModel?.contents?.map((item, i) => {
                            return <SwiperSlide onClick={() => getCourseContent(item)} className={` ${data?.openedList?.includes(item?.contentId) ? ' cursor-pointer' : "cursor-not-allowed "}`} key={i} >
                                <>
                                    <figure className={`${activeContent?.id === item?.contentId ? 'border' : 'border-transparent'} overflow-hidden flex-none relative bg-gray-600 rounded-lg  h-28 mb-3`}>

                                        <DynamicImage
                                            wrapperClassName="pb-[56.25%]"
                                            alt={item?.contentTitle}
                                            src={item?.thumbnailUrl ?? '/svgs/image-placeholder.svg'}
                                            fallbackImage='/svgs/image-placeholder.svg'
                                        />

                                        <div className={`${data?.openedList?.includes(item?.contentId) ? 'hidden' : ''} overflow-hidden absolute  top-0 left-0 bottom-0 right-0   bg-white/80 inner-shadow  `}>
                                            <div className=" text-black gap- flex items-center justify-center  flex-col   p-4 w-full h-full ">
                                                <div className=" mb-1">
                                                    <span className=" icon-md text-black md:text-3xl text-xl">
                                                        <i className=" icon-lock text-3xl"></i>
                                                    </span>
                                                </div>

                                                <p className=" font-normal text-sm  text-center">Complete previous to Unlock</p>
                                            </div>

                                        </div>
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
