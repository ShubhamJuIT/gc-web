"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import DynamicImage from "./dynamicImage"
import { Button } from "./ui/button"
import CourseProgress from "./course-progress"
import { getDateFromTimestamp } from "@/app/data/_helpers/date-methods"
import { useEffect, useState } from "react"
import { User } from "@/app/data/_models/user"
import { showErrorToast } from "@/app/data/error.manager"
import { CourseEnrollmentService } from "@/app/_services/lms/course.enrollment.service"
import { EnrollmentModel } from "@/app/data/_models/enrollment.model"
import SimpleLoader from "./simple-loader"
import Pagination from "./pagination"
import { Input } from "./ui/input"
import Link from "next/link"



const CourseEnrollments = ({
    courseId,
}: {

    courseId: string
}) => {
    const [items, setItems] = useState<EnrollmentModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalSize, setTotalSize] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>("")
    const pageSize = 10;


    useEffect(() => {

        const fetchCourseEnrollments = async () => {

            const options = {
                query: query,
                page: page - 1,
                pageSize: pageSize,
                sortBy: "enrolledAt",
                sortType: "DESC",
                courseId: courseId
            }
            setLoading(true)
            try {
                const response = await CourseEnrollmentService.findPagiatedCourseEnrollment(options);

                setItems(response?.array);
                setTotalSize(response?.total);
                setLoading(false);
            } catch (error) {
                showErrorToast(error)
                setLoading(false)
            }

        }



        if (User?.isLoggedIn()) {
            fetchCourseEnrollments()
        }
    }, [courseId, page, query]);


    const handlePageChange = (pageNo: number) => {
        setPage(pageNo)

    };
    const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setQuery((e.target as HTMLInputElement)?.value)
        }
    }
    return (
        <>
            <div className=" flex sm:items-center sm:justify-between sm:flex-row flex-col gap-5  mb-8 ">
                <h1 className="  xl:text-4xl text-3xl   text-secondary font-semibold text-center">Enrollments</h1>
                <div className="flex sm:items-center sm:justify-between sm:flex-row flex-col gap-5">
                    <Input defaultValue={query} disabled={loading} placeholder="Type and hit Enter..." className=" bg-background" onKeyDown={onSearch} />
                    {/* <Button variant="outline-secondary">Export</Button> */}
                </div>

            </div>

            {loading && <SimpleLoader wrapperClassName="!h-[60vh]" />}


            {(!loading && (!items || items?.length === 0)) && <div className="!h-[60vh] no-data">

                No enrollments found
            </div>}
            {(!loading && (items && items?.length > 0)) && <Table className=" text-nowrap">
                <TableHeader>
                    <TableRow className="bg-secondary hover:bg-secondary/95 text-lg font-bold">

                        <TableHead>Name</TableHead>

                        <TableHead>Enrolled On</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items?.map((user) => (
                        <TableRow key={user.id}>

                            <TableCell>
                                <div className=" flex items-center gap-2">
                                    <div>
                                        <div className=' w-10 h-10  flex-none mx-auto rounded-full overflow-hidden bg-regular'>
                                            <DynamicImage
                                                alt={user?.userName}
                                                src={'/svgs/user.svg'}
                                                fallbackImage='/svgs/user.svg'
                                            />

                                        </div>
                                    </div>

                                    <p>{user?.userName}</p>

                                </div>

                            </TableCell>

                            <TableCell>{getDateFromTimestamp(user?.enrolledAt)}</TableCell>
                            <TableCell>
                                <div className=" flex justify-between items-center gap-5  mb-6">
                                    <div className=" flex items-center gap-2 ">
                                        <div className=" w-9 h-9">
                                            <CourseProgress strokeWidth={15} value={user?.progressPercentage ?? 0} />
                                        </div>

                                        <p className=" text-sm "><span className=" font-bold text-primary">{user?.progressPercentage ?? 0}%</span> <span> Completed </span></p>
                                    </div>

                                </div>

                            </TableCell>

                            <TableCell>
                                <Link href={`/my-courses/enrollment-info?id=${user?.id}`}>
                                    <Button size="sm" variant="outline-secondary">View</Button>
                                </Link>

                            </TableCell>
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

        </>

    )
}

export default CourseEnrollments
