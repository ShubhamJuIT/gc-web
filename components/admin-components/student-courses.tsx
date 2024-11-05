"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getDateFromTimestamp } from '@/app/data/_helpers/date-methods'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CourseProgress from "../course-progress"
import { useEffect, useState } from "react"
import { showErrorToast } from "@/app/data/error.manager"
import { User } from "@/app/data/_models/user"
import { CourseEnrollmentService } from "@/app/_services/lms/course.enrollment.service"
import SimpleLoader from "../simple-loader"
import { EnrolledCourseModel } from "@/app/data/_models/course/enrolled.course.model"



const StudentCourses = (
    props: {
        userId: number
    }
) => {


    const [data, setData] = useState<EnrolledCourseModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUser = async (userId: number) => {


        setLoading(true)
        try {
            const response = await CourseEnrollmentService.getStudentCourseProgress(userId);

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
        <div>
            <div className="mb-6 flex sm:flex-row flex-col justify-between flex-wrap sm:items-center gap-5">

                <h2 className="  text-xl font-semibold  "> Courses</h2>
                {/* <Button className=" sm:w-auto w-full" variant='outline-secondary'>
                    Export
                </Button> */}
            </div>


            {loading && <SimpleLoader />}

            {(!loading && (!data || data?.length === 0)) && <div className='no-data'>
                No Information Available
            </div>}

            {(!loading && (data && data?.length > 0)) && <Table className="text-nowrap">
                <TableHeader>
                    <TableRow className="bg-secondary hover:bg-secondary/95 text-lg font-bold">
                        <TableHead>Name</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Started At</TableHead>
                        <TableHead>Completed At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((val) => (
                        <TableRow key={val?.courseId}>
                            <TableCell>
                                <Link href={`/admin/courses/${val?.courseId}`}>
                                    <p className='text-base hover:text-primary'>{val?.courseModel?.title}</p>
                                </Link>
                            </TableCell>

                            <TableCell>
                                <div className=" flex justify-between items-center gap-5  ">
                                    <div className=" flex items-center gap-2 ">
                                        <div className=" w-9 h-9">
                                            <CourseProgress strokeWidth={15} value={val?.progressPercentage ?? 0} />
                                        </div>

                                        <p className=" text-sm "><span className=" font-bold text-primary">{val?.progressPercentage ?? 0}%</span> <span> Completed </span></p>
                                    </div>

                                </div>

                            </TableCell>
                            <TableCell>
                                <Link href={`/admin/users/${val?.courseModel?.creatorId}?at=MENTOR`}>
                                    <p className='hover:text-primary'>{val?.courseModel?.creatorName ?? "--"}</p>
                                </Link>
                            </TableCell>
                            <TableCell>{val?.startedAt ? getDateFromTimestamp(val?.startedAt) : "--"}</TableCell>
                            <TableCell>{val?.completedAt ? getDateFromTimestamp(val?.completedAt) : "--"}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>}

        </div>

    )
}

export default StudentCourses