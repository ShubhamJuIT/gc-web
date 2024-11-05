"use client"
import { CourseService } from "@/app/_services/lms/course.service";
import { CourseModel } from "@/app/data/_models/course/course.model"
import { User } from "@/app/data/_models/user";
import { showErrorToast } from "@/app/data/error.manager";
import { useEffect, useState } from "react"
import SimpleLoader from "./simple-loader";
import ViewCourseUi from "./view-course-ui";


const ViewCourse = (props: {
    courseId: string
}) => {
    const [data, setData] = useState<CourseModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getCourse = async (courseId: string) => {
        try {
            setLoading(true);
            const data = await CourseService.getCourse(courseId)
            setData(data)
            setLoading(false);

        } catch (error) {
            showErrorToast(error)
            setLoading(false);

        }
    }

    useEffect(() => {
        if (props?.courseId && User?.isLoggedIn()) {
            getCourse(props?.courseId)
        }

    }, [props?.courseId])

    return (
        <>
            {loading && <SimpleLoader wrapperClassName="!h-[60vh] !mb-10" />}
            {(!loading && !data) && <div className="!h-[60vh] no-data !mb-10">No data</div>}
            {(!loading && data) && <ViewCourseUi showEdit={true} data={data} />}
        </>
    )
}

export default ViewCourse