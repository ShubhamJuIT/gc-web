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
import { underscoreCapitalise } from "@/app/data/_helpers/text-methods"
import { showErrorToast } from "@/app/data/error.manager"
import { useState, useEffect } from "react"
import { User } from "@/app/data/_models/user"
import { CourseService } from "@/app/_services/lms/course.service"
import Pagination from "../pagination"
import SimpleLoader from "../simple-loader"
import { Input } from "../ui/input"
import { CourseModel } from "@/app/data/_models/course/course.model"




const MentorCourses = (
    props: {
        userId: number
    }
) => {

    const [items, setItems] = useState<CourseModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalSize, setTotalSize] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>("")
    const pageSize = 10;


    useEffect(() => {

        const fetchMentorCourseList = async () => {

            const options = {
                query: query,
                page: page - 1,
                pageSize: pageSize,

            }
            setLoading(true)
            try {
                const response = await CourseService?.getMentorCoursesList(props?.userId, options);

                setItems(response?.array);
                setTotalSize(response?.total);
                setLoading(false);
            } catch (error) {
                showErrorToast(error)
                setLoading(false)
            }

        }



        if (User?.isLoggedIn()) {
            fetchMentorCourseList()
        }
    }, [page, props?.userId, query]);


    const handlePageChange = (pageNo: number) => {
        setPage(pageNo)

    };
    const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setQuery((e.target as HTMLInputElement)?.value)
        }
    }

    return (
        <div>
            <div className=" flex sm:items-center sm:justify-between sm:flex-row flex-col gap-5  mb-8 ">
                <h1 className="  xl:text-4xl text-3xl   text-secondary font-semibold text-center">Course</h1>
                <div className="flex sm:items-center sm:justify-between sm:flex-row flex-col gap-5">
                    <Input defaultValue={query} disabled={loading} placeholder="Type and hit Enter..." className=" bg-background" onKeyDown={onSearch} />
                    {/* <Button variant="outline-secondary">Export</Button> */}
                </div>

            </div>


            {loading && <SimpleLoader />}


            {(!loading && (!items || items?.length === 0)) && <div className=" no-data">

                No enrollments found
            </div>}
            {(!loading && (items && items?.length > 0)) && <Table className=" text-nowrap">
                <TableHeader>
                    <TableRow className="bg-secondary hover:bg-secondary/95 text-lg font-bold">
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Student Entrolled</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Last Updated</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items?.map((course) => (
                        <TableRow key={course?.id}>
                            <TableCell>
                                <Link href={`/admin/courses/${course?.id}`}>
                                    <p className='text-base hover:text-primary'>{course?.title}</p>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <span className={`${course?.status?.toLowerCase()} course-status`}>
                                    {underscoreCapitalise(course?.status)}
                                </span>
                            </TableCell>

                            <TableCell>
                                {course.enrollmentCount ?? 0}
                            </TableCell>
                            <TableCell>{course?.createdAt ? getDateFromTimestamp(course?.createdAt) : "--"}</TableCell>
                            <TableCell>{course?.updatedAt ? getDateFromTimestamp(course?.updatedAt) : "--"}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>}


            <div className=" mt-10">
                <Pagination
                    onPageChange={handlePageChange}
                    currentPage={page}
                    totalPages={Math.ceil(totalSize / pageSize)} />
            </div>



        </div>

    )
}

export default MentorCourses