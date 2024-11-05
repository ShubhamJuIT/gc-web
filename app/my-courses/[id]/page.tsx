import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CourseEnrollments from "@/components/course-enrollments"
import ViewCourse from "@/components/view-course"
import StudyAreaPreview from "@/components/study-areas/previews/study-area-preview"


const ViewMyCourse = ({
    params,
}: {
    params: {
        id: string
    },

}) => {
    return (
        <section >
            <div className=" container">
                <div className=" pt-28">
                    <Tabs defaultValue="details">
                        <TabsList className=" mb-6">
                            <TabsTrigger value="details">Course Details</TabsTrigger>
                            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
                            <TabsTrigger value="study-area">Study Area Preview</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details">
                            <ViewCourse courseId={params?.id} />
                        </TabsContent>
                        <TabsContent className=" mb-10" value="enrollments">
                            <CourseEnrollments courseId={params?.id} />
                        </TabsContent>
                        <TabsContent className=" mb-10" value="study-area">
                            <StudyAreaPreview courseId={params?.id} />
                        </TabsContent>
                    </Tabs>


                </div>
            </div>
        </section>

    )
}

export default ViewMyCourse