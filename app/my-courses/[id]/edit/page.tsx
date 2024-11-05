"use client"

import { CourseService } from "@/app/_services/lms/course.service";
import { CourseStatusEnum } from "@/app/data/_enums/course.status.enum";
import { CourseModel } from "@/app/data/_models/course/course.model";
import { User } from "@/app/data/_models/user";
import { showErrorToast } from "@/app/data/error.manager";
import AlertDialogWrapper from "@/components/alert-dialog-wrapper";
import AlertWrapper from "@/components/alert-wrapper";
import BackButton from "@/components/back-button";
import Certificate from "@/components/certificate";
import EditCourseForm from "@/components/forms/edit-course-form";
import ActionOnCourse from "@/components/modal/action-on-course-modal";
import ModulesOrQuiz from "@/components/modules-or-quiz";
import TooltipWarpper from "@/components/tooltip-warpper";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2, } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const stepCounts = [
    {
        number: 1,
        label: "Basic Outline",
    },
    {
        number: 2,
        label: "Modules/Quiz"
    },
    {
        number: 3,
        label: "Certificate"
    }

]

const EditMyCourse = ({
    params,
}: {
    params: {
        id: string
    }
}) => {
    const id = params?.id;
    const [step, setStep] = useState<{ number: number, label: string }>(stepCounts[0]);
    const [data, setData] = useState<CourseModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [publishing, setPublishing] = useState<boolean>(false);
    const courseStatus = data?.status?.toLowerCase();
    const canPublishCourse = data?.status === CourseStatusEnum.DRAFT || data?.status === CourseStatusEnum.REJECTED;

    const router = useRouter();
    const getCourse = async (courseId: string, isLoaderRequired: boolean = true) => {

        setLoading(isLoaderRequired);
        try {
            const data = await CourseService.getCourse(courseId);
            setData(data);
            setLoading(false);

        } catch (error) {
            showErrorToast(error);
            setLoading(false);



        }
    }


    useEffect(() => {

        if (id) {
            getCourse(id);
        }

    }, [id])



    const handleChangeStep = (val: { number: number, label: string }) => {
        setStep(val)
    }
    const patchFreshData = (val?: CourseModel) => {
        if (val) {
            setData(val)
        } else {
            getCourse(id, false)
        }

    }
    const RenderStepUi = () => {
        switch (step?.number) {
            case 1:
                return (<EditCourseForm onSuccess={patchFreshData} data={data} loading={loading} />);
            case 2:
                return (<ModulesOrQuiz onDelete={() => getCourse(id, false)} onSuccess={patchFreshData} data={data} loading={loading} />);
            case 3:
                return (<Certificate />);
            default:
                return (<EditCourseForm onSuccess={patchFreshData} data={data} loading={loading} />)
        }
    }

    const onDeleteCourse = async () => {
        router.push('/my-courses');
    }

    const publishCourse = async () => {
        if (!data?.id) {
            return
        }
        setPublishing(true)
        try {
            const res = await CourseService.publishCourse(data?.id);
            setData(res)
            toast({
                title: User.isAdmin() ? "Course published successfully" : "Course sent for approval",
            })
            setPublishing(false)

        } catch (error) {
            showErrorToast(error)
            setPublishing(false)
        }
    }

    const RenderAlertMessage = () => {

        switch (data?.status) {
            case CourseStatusEnum.REJECTED:
                return <AlertWrapper
                    className=" mb-5"
                    title="Your course has been rejected by Admin"
                    description={`${data?.rejectReason}`}
                    variant="secondary"

                />
            case CourseStatusEnum.ARCHIVED:
                return <AlertWrapper
                    className=" mb-5"
                    title="Your course has been Archived by Admin"
                    description={`${data?.archiveReason}`}
                    variant="warning"

                />
            case CourseStatusEnum.DELETED:
                return <AlertWrapper
                    className=" mb-5"
                    title="Your course has been Deleted"
                    description={`${data?.deleteReason}`}
                    variant="destructive"

                />
            default:
                return null
        }

    }


    return (
        <section className="lg:mb-20 md:mb-16 sm:mb-14 mb-12" >

            <div className="container max-w-[1240px]">
                <div className='md:pt-32  pt-28   '>

                    <>
                        <RenderAlertMessage />


                        <div className=" flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 mb-7">
                            <div className=" flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3">
                                <h1 className="   xl:text-4xl text-3xl   text-secondary font-semibold ">Update Courses</h1>
                                <TooltipWarpper text={`Status of course is ${courseStatus} `}>
                                    <span className={`${courseStatus} course-status`}>
                                        {courseStatus}
                                    </span>
                                </TooltipWarpper>


                            </div>


                            <div className="flex sm:items-center sm:flex-row flex-col gap-3 ">


                                <BackButton />

                                {data?.id && <ActionOnCourse courseId={data?.id} onSucessAction={onDeleteCourse} actionType="DELETE">
                                    <Button disabled={data?.status == CourseStatusEnum?.DELETED} variant='outline-secondary' >Delete</Button>
                                </ActionOnCourse>}

                                <AlertDialogWrapper
                                    actionText="Publish"
                                    onAction={publishCourse}
                                    description="Request will be sent to admin for approval."
                                    title="Are you sure about publishing this?"
                                >
                                    <Button disabled={!canPublishCourse || publishing || loading} variant='outline'>
                                        {publishing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Publish
                                    </Button>
                                </AlertDialogWrapper>





                            </div>




                        </div>

                        <div className=" bg-regular rounded-2xl  lg:p-9 md:p-8 p-7  ">
                            <div className="stepper-wrapper">
                                {stepCounts.map((val, index) => {

                                    return <button disabled={publishing || loading} key={index} title={`${val.number === step?.number ? `You are at ${step?.label}` : `${val?.label}`}`} onClick={() => handleChangeStep(val)} className={`stepper-item ${val?.number <= step?.number ? 'completed' : ''} `}>
                                        <div className={`step-counter  ${val.number === step?.number ? 'active' : ""}`}>{val?.number}</div>
                                        <div className="step-name">{val?.label}</div>

                                    </button>
                                })}
                            </div>

                            <RenderStepUi />



                        </div>


                    </>




                </div>

            </div>

        </section>
    )
}

export default EditMyCourse;