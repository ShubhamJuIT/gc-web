
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StudentCourses from '@/components/admin-components/student-courses'
import { AccoutTypesEnum } from "@/app/data/_enums/account.types.enum"
import MentorProfileInfo from "@/components/admin-components/mentor-profile-info"
import StudentProfileInfo from "@/components/admin-components/student-profile-info"
import MentorCourses from "@/components/admin-components/mentor-courses"

const UserDetails = ({
    params,
    searchParams
}: {
    params: {
        id: string
    }
    searchParams: {
        at: string
    }
}) => {
    return (
        <>

            {searchParams?.at && (searchParams?.at === AccoutTypesEnum?.MENTOR || searchParams?.at === AccoutTypesEnum?.STUDENT) ?
                <Tabs defaultValue="PROFILE_INFO" >
                    <TabsList>
                        <TabsTrigger value="PROFILE_INFO">Profile Info</TabsTrigger>
                        <TabsTrigger value="COURSES">Courses</TabsTrigger>
                    </TabsList>
                    <TabsContent value="PROFILE_INFO">
                        <div className=' mt-5'>
                            {searchParams?.at === AccoutTypesEnum.MENTOR && <MentorProfileInfo userId={+params?.id} />}
                            {searchParams?.at === AccoutTypesEnum.STUDENT && <StudentProfileInfo userId={+params?.id} />}

                        </div>

                    </TabsContent>
                    <TabsContent value="COURSES">
                        <div className=' mt-5'>

                            {searchParams?.at === AccoutTypesEnum.MENTOR && <MentorCourses userId={+params?.id} />}
                            {searchParams?.at === AccoutTypesEnum.STUDENT && <StudentCourses userId={+params?.id} />}


                        </div>

                    </TabsContent>
                </Tabs>


                :
                <div className=" no-data">
                    No Profile Available
                </div>


            }



        </>
    )
}

export default UserDetails