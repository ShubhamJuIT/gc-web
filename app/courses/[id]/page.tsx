
import { CourseService } from "@/app/_services/lms/course.service";
import { CourseModel } from "@/app/data/_models/course/course.model";
import ViewCourseUi from "@/components/view-course-ui";


export default async function CourseDetails({
    params
}: {
    params: {
        id: string
    }
}) {
    const data: CourseModel = await CourseService.getPublicCourseSSR(params?.id);

    return (
        <section className=" mb-14">
            <div className=" container">
                <div className="  md:pt-36  pt-28">

                    {data ? <ViewCourseUi data={data} showBuyNow={true} /> : <div className=" !h-screen no-data">
                        No course found
                    </div>}

                </div>
            </div>
        </section>

    );
}
