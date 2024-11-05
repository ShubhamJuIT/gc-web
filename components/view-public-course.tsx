import { CourseService } from "@/app/_services/lms/course.service"
import ViewCourseUi from "./view-course-ui"


const ViewPublicCourse = async (props: {
    courseId: string
}) => {
    const data = await CourseService.getPublicCourseSSR(props?.courseId)
    return (

        <ViewCourseUi data={data} showBuyNow={true} />

    )
}

export default ViewPublicCourse