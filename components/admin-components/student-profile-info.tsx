"use client"
import { UserProfileService } from '@/app/_services/lms/user.profile.service'
import { AccoutTypesEnum } from '@/app/data/_enums/account.types.enum'
import { getDateFromTimestamp } from '@/app/data/_helpers/date-methods'
import { StudentModel } from '@/app/data/_models/student.model'
import { User } from '@/app/data/_models/user'
import { showErrorToast } from '@/app/data/error.manager'
import UpdateProfileInfoModal from '@/components/modal/update-profile-info-modal'
import TooltipWarpper from '@/components/tooltip-warpper'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import DynamicImage from '../dynamicImage'
import SimpleLoader from '../simple-loader'


const StudentProfileInfo = (props: {
    userId: number
}) => {
    const [data, setData] = useState<StudentModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUser = async (userId: number) => {


        setLoading(true)
        try {
            const response = await UserProfileService.getStudentProfile(userId);

            setData(response);
            setLoading(false)


        } catch (error) {
            showErrorToast(error)
            setLoading(false)
        }

    }

    useEffect(() => {
        if (User?.isLoggedIn() && props?.userId) {
            fetchUser(props?.userId)
        }
    }, [props?.userId])


    return (
        <section >


            <div className="mb-6 flex sm:flex-row flex-col justify-between items-center gap-5">

                <h2 className="  text-2xl font-semibold  ">Profile Info</h2>
                {(!loading && data) && <UpdateProfileInfoModal onSuccess={() => fetchUser(props?.userId)} data={data} title='Update Profile'>
                    <Button variant='outline'>
                        Edit Profile
                    </Button>
                </UpdateProfileInfoModal>}


            </div>

            {loading && <SimpleLoader />}

            {(!loading && !data) && <div className='no-data'>
                No User Available
            </div>}



            {(!loading && data) && <div className="grid  xl:grid-cols-12  gap-6  break-words ">
                <div className="xl:col-span-3 ">
                    <div className=" xl:max-w-full  sm:max-w-80 border  border-secondary shadow rounded-lg p-6">
                        <div className=" text-center break-words">

                            <div className=' w-14 h-14  flex-none mx-auto rounded-full overflow-hidden mb-4  bg-gray-300'>
                                <DynamicImage
                                    alt={data?.name}
                                    src={data?.profileImageUrl ?? '/svgs/user.svg'}
                                    fallbackImage='/svgs/user.svg'
                                />

                            </div>


                            <h1 className="text-xl font-bold flex items-center justify-center gap-2">
                                <span>{data?.name}</span>
                                <TooltipWarpper text={`Status of user is ${data?.accountStatus?.toLowerCase()}`}>
                                    <div className={` user-status ${data?.accountStatus?.toLowerCase()} `}></div>
                                </TooltipWarpper>

                            </h1>
                            <p className=" text-white/70  " >{data?.emailId ?? "--"}</p>

                        </div>
                        <hr className="my-6 border-t  border-secondary" />
                        <div className="flex flex-col">
                            <span className="  uppercase font-bold tracking-wider mb-2">Info</span>
                            <ul className=' text-white/70 space-y-2'>
                                <li >{data?.coursesEnrolled ?? 0} courses enrolled</li>
                                <li >{data?.coursesInProgress ?? 0} courses in progress</li>
                                <li >{data?.creditPoints ?? 0} credit points</li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div className=" xl:col-span-9">

                    <div className="border  border-secondary shadow rounded-lg p-6">
                        <div className="[&_h3]:text-lg [&_h3]:font-bold [&_p]:text-white/70  gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
                            <div >
                                <h3 >Username</h3>
                                <p >{data?.userName ?? "--"}</p>
                            </div>
                            <div >
                                <h3 >Name</h3>
                                <p>{data?.name ?? "--"}</p>
                            </div>
                            <div >
                                <h3 >Email</h3>
                                <p >{data?.emailId ?? "--"}</p>
                            </div>
                            <div >
                                <h3 >Mobile</h3>
                                <p >{data?.contactNumber ?? "--"}</p>
                            </div>
                            <div >
                                <h3 >Acount Type</h3>
                                <p >{data?.accountType ?? '--'}</p>
                            </div>
                            <div >
                                <h3 >Status</h3>
                                <p >{data?.accountStatus ?? "--"}</p>
                            </div>

                            <div >
                                <h3 >Course Enrolled</h3>
                                <p>{data?.coursesEnrolled ?? 0}</p>
                            </div>
                            <div >
                                <h3 >Completed Course</h3>
                                <p >{data?.coursesCompleted ?? 0}</p>
                            </div>
                            <div >
                                <h3 >Courses In Progress</h3>
                                <p >{data?.coursesInProgress ?? 0}</p>
                            </div>
                            <div >
                                <h3 >Credit Points</h3>
                                <p >{data?.creditPoints ?? 0}</p>
                            </div>
                            <div >
                                <h3 >Redeem Points</h3>
                                <p >{data?.redeemPoints ?? 0}</p>
                            </div>

                            <div >
                                <h3 >Last Login</h3>
                                <p >
                                    {data?.lastLogin ? getDateFromTimestamp(data?.lastLogin) : "--"}
                                </p>
                            </div>
                            <div >
                                <h3 >Created At</h3>
                                <p >
                                    {data?.createdAt ? getDateFromTimestamp(data?.createdAt) : "--"}
                                </p>
                            </div>
                            <div >
                                <h3 >Is Mobile Verified</h3>
                                <p >
                                    {data?.isMobileVerified ? 'Yes' : 'No'}
                                </p>
                            </div>
                            <div >
                                <h3 >Is Email Verified</h3>
                                <p >
                                    {data?.isEmailVerified ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>}

        </section>
    )
}

export default StudentProfileInfo