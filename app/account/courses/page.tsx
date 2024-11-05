
"use client"
import { CourseEnrollmentService } from '@/app/_services/lms/course.enrollment.service';
import { useUserContext } from '@/app/contexts/userContext';
import { AccoutTypesEnum } from '@/app/data/_enums/account.types.enum';
import { CourseModel } from '@/app/data/_models/course/course.model';
import { EnrolledCourseModel } from '@/app/data/_models/course/enrolled.course.model';
import { User } from '@/app/data/_models/user';
import { showErrorToast } from '@/app/data/error.manager';
import CourseCard from '@/components/course-card';
import SimpleLoader from '@/components/simple-loader';
import React, { useEffect, useState } from 'react'

const Courses = () => {
    const { userData, loading } = useUserContext();

    const [data, setData] = useState<CourseModel[]>([]);
    const [loadingData, setLoadingData] = useState<boolean>(false);

    const getMyCourseEnrollments = async () => {
        setLoadingData(true);
        try {
            const res: EnrolledCourseModel[] = await CourseEnrollmentService.myCourseEnrollments();

            const finalData = res.map((item) => {
                return {
                    ...item.courseModel,
                    progressPercentage: item.progressPercentage
                }
            });
            setData(finalData);
            setLoadingData(false);


        } catch (error) {
            showErrorToast(error);
            setLoadingData(false);

        }
    }

    useEffect(() => {

        if (User?.isLoggedIn()) {
            getMyCourseEnrollments();

        }
    }, [])

    return (
        <section>
            {!loading && <h1 className='mb-3 lg:text-5xl text-4xl text-primary  font-bold  -tracking-[2.5px]'>
                {userData?.accountType === AccoutTypesEnum.STUDENT ? 'My Courses' : 'My Enrolled Courses'}
            </h1>}

            {loadingData && <SimpleLoader />}
            {!loadingData && (!data || data?.length === 0) && <p className=" no-data">No courses found.</p>}
            {!loadingData && (data && data?.length > 0) && <>

                <p className=" lg:mb-10 mb-8  lg:text-2xl text-xl font-light">Manage your courses.</p>
                <div className=' grid sm:grid-cols-2 gap-7'>
                    {data?.map((item, i) => <CourseCard showProgress={true} key={i} item={item} />)}
                </div>
            </>}


        </section>
    )
}

export default Courses