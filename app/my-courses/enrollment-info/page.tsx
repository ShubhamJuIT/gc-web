"use client"

import { CourseEnrollmentService } from "@/app/_services/lms/course.enrollment.service";
import { EnrollmentModel } from "@/app/data/_models/enrollment.model";
import { showErrorToast } from "@/app/data/error.manager";
import SimpleLoader from "@/components/simple-loader";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { EnrollmentContentInfoModel } from "@/app/data/_models/enrollment.content.info.model";
import { getDateFromTimestamp } from "@/app/data/_helpers/date-methods";
import { CourseContentEnum } from "@/app/data/_enums/course.content.enum";
import TooltipWarpper from "@/components/tooltip-warpper";
import { underscoreCapitalise } from "@/app/data/_helpers/text-methods";
import SpecialTitle from "@/components/specialTitle";
const EnrollmentInfo = ({
    searchParams,
}: {
    searchParams: {
        id: string

    },
}) => {
    const [data, setData] = useState<EnrollmentModel | null>(null);
    const [pageLoader, setPageLoader] = useState(false);
    const getEnrollmentInfo = async (enrollmentId: string) => {
        setPageLoader(true);
        try {
            const res = await CourseEnrollmentService?.getCourseEnrollmentInfo(enrollmentId);
            setData(res);
            setPageLoader(false);


        } catch (error) {
            showErrorToast(error);
            setPageLoader(false);

        }


    }

    useEffect(() => {

        if (searchParams?.id) {
            getEnrollmentInfo(searchParams?.id)
        }
    }, [searchParams?.id])
    return (
        <section className="lg:mb-20 md:mb-16 sm:mb-14 mb-12" >

            <div className="container">
                <div className='md:pt-32  pt-28   '>
                    <div className="  mb-7  ">
                        <div className=" flex items-center justify-between gap-5 ">
                            <h1 className="  xl:text-4xl text-3xl   text-secondary font-semibold text-center">Enrollment Info</h1>

                            <div className="flex items-center gap-5">
                                {/* <Button variant="outline-secondary">Export </Button> */}
                            </div>

                        </div>

                    </div>

                    {pageLoader && <SimpleLoader />}

                    {(!pageLoader && (!data?.contents || data?.contents?.length === 0)) && <div className=" no-data">

                        <p className="text-center text-lg font-semibold">
                            No information found
                        </p>

                    </div>}

                    {(!pageLoader && (data?.contents && data?.contents?.length > 0)) &&

                        <>

                            <Table className="text-nowrap">
                                <TableHeader>
                                    <TableRow className="bg-secondary hover:bg-secondary/95 text-lg font-bold">
                                        <TableHead>#</TableHead>
                                        <TableHead>Section Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Started At</TableHead>
                                        <TableHead>Completed At</TableHead>
                                        <TableHead>Quiz Status</TableHead>
                                        <TableHead>Quiz Percentage</TableHead>
                                        <TableHead>Quiz Score</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.contents?.map((val: EnrollmentContentInfoModel, index: number) => (
                                        <TableRow key={val?.contentId}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <p>
                                                    <SpecialTitle
                                                        text={val?.contentName ?? "--"}
                                                        className=''
                                                    />
                                                </p>
                                            </TableCell>
                                            <TableCell>


                                                <TooltipWarpper text={`This is ${underscoreCapitalise(val?.type)}`}>
                                                    <p className={`${val?.type === CourseContentEnum?.QUIZ ? "border-info bg-info/10 text-info" : "border-warning bg-warning/10 text-warning"} text-center text-sm font-medium py-1   px-4   border   rounded-3xl`}>
                                                        {underscoreCapitalise(val?.type)}
                                                    </p>

                                                </TooltipWarpper>

                                            </TableCell>
                                            <TableCell>{val?.startedAt ? getDateFromTimestamp(val?.startedAt) : '--'}</TableCell>
                                            <TableCell>{val?.completedAt ? getDateFromTimestamp(val?.completedAt) : '--'}</TableCell>

                                            <TableCell>
                                                {val?.type === CourseContentEnum?.QUIZ ?

                                                    <>
                                                        {val?.completedAt ? <p className={`${val?.quizPassed ? "border-success bg-success/10 text-success" : "border-destructive bg-destructive/10 text-destructive"} text-center text-sm font-medium py-1   px-4   border   rounded-3xl`}>
                                                            {val?.quizPassed ? "Passed" : "Failed"}
                                                        </p>
                                                            : "--"}


                                                    </>
                                                    : "--"}

                                            </TableCell>
                                            <TableCell>{val?.quizPercentage ? `${val?.quizPercentage}%` : "--"}</TableCell>
                                            <TableCell>{val?.quizScore ?? "--"}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>


                        </>

                    }




                </div>

            </div>

        </section>
    )
}

export default EnrollmentInfo