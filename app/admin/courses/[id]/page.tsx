import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CourseEnrollments from "@/components/course-enrollments"
import ViewCourse from "@/components/view-course"
import StudyAreaPreview from "@/components/study-areas/previews/study-area-preview"



const AdminCourseDetails = (
    {
        params
    }: {
        params: {
            id: string
        }
    }
) => {
    return (
        <section >
            <div className="  rounded-2xl border border-secondary px-8 pt-8">
                <Tabs defaultValue="details">
                    <TabsList className=" mb-6">
                        <TabsTrigger value="details">Course Details</TabsTrigger>
                        <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
                        <TabsTrigger value="study-area">Study Area Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details">
                        <ViewCourse courseId={params?.id} />
                    </TabsContent>
                    <TabsContent value="enrollments">
                        <CourseEnrollments courseId={params?.id} />
                        <br />
                    </TabsContent>
                    <TabsContent value="study-area">
                        <StudyAreaPreview courseId={params?.id} />
                    </TabsContent>
                </Tabs>
            </div>
        </section>

    )
}

export default AdminCourseDetails