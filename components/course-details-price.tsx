"use client"
import { CourseModel } from "@/app/data/_models/course/course.model"
import BuyThisCourse from "./buy-this-course"
import { CourseEnrollmentService } from "@/app/_services/lms/course.enrollment.service"
import { showErrorToast } from "@/app/data/error.manager"
import { useEffect, useState } from "react"
import { User } from "@/app/data/_models/user"
import SkeletonPriceLoader from "./skeleton-price-loader"

const CourseDetailsPrice = (props: {
    course: CourseModel,
    isCourseViewPage?: boolean
}) => {
    const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
    const [enrollLoader, setEnrollLoader] = useState<boolean>(true);
    const isEnrolledInCourse = async (courseId: string) => {

        try {

            const data = await CourseEnrollmentService.isEnrolled(courseId);
            setIsEnrolled(data ? true : false)

        } catch (error) {
            showErrorToast(error);

        } finally {
            setEnrollLoader(false);
        }

    }

    useEffect(() => {
        if (User?.isLoggedIn()) {
            isEnrolledInCourse(props?.course?.id);
        } else {
            setEnrollLoader(false)
        }
    }, [props?.course?.id])
    if (enrollLoader) return <SkeletonPriceLoader />
    return (

        <>

            {props?.isCourseViewPage ? <>

                {(!isEnrolled && props?.course?.salePrice) ? <>
                    <p className=" mb-3 lg:text-3xl text-2xl font-bold text-primary">${props?.course?.salePrice}</p>
                </> : null}

                <BuyThisCourse
                    variant="default"
                    btnText={`${props?.course?.salePrice ? 'Enroll Now' : 'Currently Unavailable'}`}
                    isEnrolled={isEnrolled}
                    courseId={props?.course?.id}
                    salePrice={props?.course?.salePrice}


                />

            </>


                :

                <div className=" relative flex items-center gap-4">
                    {(!isEnrolled && props?.course?.salePrice) ? <>

                        <div className=" top-0 left-0 right-0 bottom-0 absolute bg-primary w-11 h-11  blur-[80px]"></div>
                        <p className=" bg-primary p-[10px] rounded-lg text-lg font-bold text-regular">${props?.course?.salePrice}</p>
                    </> : null}

                    <BuyThisCourse
                        variant="link"
                        btnText={`${props?.course?.salePrice ? 'Enroll Now' : 'Currently Unavailable'}`}
                        isEnrolled={isEnrolled}
                        courseId={props?.course?.id}
                        salePrice={props?.course?.salePrice}


                    />

                </div>}

        </>

    )
}

export default CourseDetailsPrice