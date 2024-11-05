"use client"

import SpecialTitle from "./specialTitle"
import { Button } from "./ui/button"
import CreateModuleModal from "./modal/create-module-modal"
import { CourseModel } from "@/app/data/_models/course/course.model"
import AlertDialogWrapper from "./alert-dialog-wrapper"
import DynamicImage from "./dynamicImage"
import { useState } from "react"
import { ModuleService } from "@/app/_services/lms/module.service"
import { showErrorToast } from "@/app/data/error.manager"
import { Loader2 } from "lucide-react"
import SimpleLoader from "./simple-loader"
import CreateQuizModal from "./modal/create-quiz-modal"
import { CourseContentEnum } from "@/app/data/_enums/course.content.enum"
import { QuizService } from "@/app/_services/lms/quiz.service"
import { underscoreCapitalise } from "@/app/data/_helpers/text-methods"
import TooltipWarpper from "./tooltip-warpper"
import Link from "next/link"
import { CourseContentModel } from "@/app/data/_models/course/course.content.model"
import { List, arrayMove } from "react-movable";
import { ReorderService } from "@/app/_services/lms/reorder.service"
import { useToast } from "./ui/use-toast"


const ModulesOrQuiz = (props: {
    loading: boolean,
    data: CourseModel | null,
    onSuccess: (val?: CourseModel) => void,
    onDelete: () => void

}) => {

    const [deleteting, setDeleting] = useState<boolean>(false)
    const [tempDeleteId, setTempDeleteId] = useState<string>("")
    const [rearrangeList, setRearrangeList] = useState<CourseContentModel[]>([]);
    const [rearrangeLoading, setRearrangeLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const onDeleteContent = async (contentId: string, type: CourseContentEnum) => {
        let obs;
        if (type === CourseContentEnum?.MODULE) {
            obs = ModuleService.deleteModule(contentId);
        } else if (type === CourseContentEnum?.QUIZ) {
            obs = QuizService.deleteQuiz(contentId);
        } else {
            return;
        }

        setTempDeleteId(contentId)
        setDeleting(true)

        try {
            await obs
            setDeleting(false);
            setTempDeleteId("");
            props?.onDelete()
        } catch (error) {
            setTempDeleteId("");
            showErrorToast(error)
            setDeleting(false)
        }

    }
    const data = props?.data?.contents ? props?.data?.contents?.filter(val => val?.type !== CourseContentEnum.CERTIFICATE) : []
    const handleRearrangeList = () => {
        setRearrangeList(data);
    }
    const handleCancelRearrange = () => {
        setRearrangeList([]);
    }
    const handleSaveRearrange = async () => {
        if (!props?.data?.id) return;

        const ids = rearrangeList.map(val => val?.contentId);
        setRearrangeLoading(true);
        try {
            const res = await ReorderService.reorderCourseContent(props?.data?.id, ids);
            props?.onSuccess(res)
            setRearrangeLoading(false);
            setRearrangeList([]);
            toast({
                title: "Rearranged Successfully",

            })

        } catch (error) {
            showErrorToast(error)
            setRearrangeLoading(false);

        }
    }
    return (
        <>
            <div className=" flex md:justify-between md:items-center md:flex-row flex-col gap-5  mb-7 ">
                <h2 className="  lg:text-3xl text-2xl   text-primary font-semibold ">{rearrangeList?.length > 0 ? "Re-Arrange" : "Modules/Quiz"}

                    {rearrangeList?.length > 0 && <p className=" mt-3  text-lg  text-white/80">Drag and drop to re-arrange content </p>}

                </h2>


                <div className="flex md:justify-between sm:items-center sm:flex-row flex-col gap-5">

                    {rearrangeList?.length > 0 ? <>

                        <Button onClick={handleCancelRearrange} disabled={!data || rearrangeLoading} variant="outline-secondary" >
                            Cancel
                        </Button>
                        <Button onClick={handleSaveRearrange} disabled={!data || rearrangeLoading} variant='outline' >
                            {rearrangeLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </> : <>

                        <Button onClick={handleRearrangeList} disabled={!data || deleteting} variant='outline-warning' >
                            Re-Arrange
                        </Button>
                        <CreateModuleModal onSuccess={props?.onSuccess} courseId={props?.data?.id ?? ""}>
                            <Button disabled={!data || deleteting} variant='outline-secondary' >
                                Create Module
                            </Button>
                        </CreateModuleModal>
                        <CreateQuizModal onSuccess={props?.onSuccess} courseId={props?.data?.id ?? ""}>
                            <Button disabled={!data || deleteting} variant='outline-secondary' >
                                Create Quiz
                            </Button>
                        </CreateQuizModal>
                    </>}


                </div>


            </div>

            {props?.loading &&
                <SimpleLoader />

            }

            {(!props?.loading && (!data || data?.length === 0)) && <div className="no-data">Data not found</div>}

            {(!props?.loading && (data && data?.length > 0)) && <>
                {(!rearrangeList || rearrangeList?.length === 0) ? <div className=" grid lg:grid-cols-3 sm:grid-cols-2 gap-6">

                    {data?.map((item, i) => {
                        const typeOfContent = underscoreCapitalise(item?.type);
                        return <div className=" relative flex flex-col  justify-between rounded-2xl overflow-hidden  bg-black p-5" key={i}>

                            <div className=" z-40  absolute top-6 right-6 ">
                                <TooltipWarpper text={`This is ${typeOfContent}`}>
                                    <p className={`${item?.type === CourseContentEnum?.QUIZ ? "border-info text-info" : "border-warning text-warning"} text-sm font-medium py-1   px-4 bg-background  border   rounded-3xl`}>
                                        {typeOfContent}
                                    </p>
                                </TooltipWarpper>


                            </div>

                            <div className='flex-none mb-5'>
                                <DynamicImage
                                    wrapperClassName="relative pb-[60%]  rounded-xl overflow-hidden"
                                    alt={item?.contentTitle}
                                    src={item?.thumbnailUrl ?? '/svgs/image-placeholder.svg'}
                                    fallbackImage='/svgs/image-placeholder.svg'
                                />
                            </div>
                            <p className=" flex-grow text-white/70  font-light text-sm mb-6">
                                <SpecialTitle
                                    text={item?.contentTitle}
                                    className=' font-semibold text-white '
                                />
                            </p>



                            <div className=" flex md:justify-end  md:items-center md:flex-row flex-col gap-4 ">

                                <AlertDialogWrapper
                                    actionText="Delete" onAction={() => onDeleteContent(item?.contentId, item?.type)} description={`You are about to delete a ${item?.type?.toLowerCase()}. You'll not able to recover it.`}
                                    title="Are you sure about deleting this?">
                                    <Button disabled={deleteting} size="sm" variant="outline-secondary">

                                        {(deleteting && item?.contentId === tempDeleteId) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Delete</Button>
                                </AlertDialogWrapper>


                                {item?.type === CourseContentEnum.QUIZ &&

                                    <>
                                        <CreateQuizModal onSuccess={props?.onSuccess} courseId={props?.data?.id ?? ""} quizId={item?.contentId}>
                                            <Button disabled={deleteting} size="sm" className=" font-normal" variant="outline">Edit</Button>
                                        </CreateQuizModal>
                                        <Link className=" md:w-auto w-full" href={`/my-courses/quiz/${item?.contentId}`}>
                                            <Button disabled={deleteting} size="sm" className=" font-normal md:w-auto w-full" variant="outline-info">View</Button>
                                        </Link>
                                    </>
                                }
                                {item?.type === CourseContentEnum.MODULE && <CreateModuleModal onSuccess={props?.onSuccess} courseId={props?.data?.id ?? ""} moduleId={item?.contentId}>
                                    <Button disabled={deleteting} size="sm" className=" font-normal" variant="outline">Edit</Button>
                                </CreateModuleModal>}



                            </div >



                        </div>
                    })}

                </div> :
                    <>

                        <List
                            values={rearrangeList}
                            onChange={({ oldIndex, newIndex }) =>
                                setRearrangeList(arrayMove(rearrangeList, oldIndex, newIndex))
                            }
                            renderList={({ children, props }) => <div className="   flex flex-col gap-5 overflow-auto" {...props}>{children}</div>}
                            renderItem={({ value, props, index }) => <div className=" hover:cursor-move" {...props}>

                                <div className=" relative rounded-xl  p-5 bg-background flex md:items-center md:flex-row flex-col  gap-3">
                                    <div className=" md:flex hidden w-10 h-10 border flex-none  bg-primary/5 text-primary rounded-full  items-center justify-center">
                                        <p className="  text-lg">{(index ?? 0) + 1}</p>
                                    </div>



                                    <div className='flex-none '>
                                        <DynamicImage
                                            wrapperClassName="relative  rounded-xl md:w-20 w-full md:h-14 pb-[60%]   overflow-hidden"
                                            alt={value?.contentTitle}
                                            src={value?.thumbnailUrl ?? '/svgs/image-placeholder.svg'}
                                            fallbackImage='/svgs/image-placeholder.svg'
                                        />


                                    </div>
                                    <div className=" flex md:items-center md:flex-row flex-col  items-start  gap-3">
                                        <p className="  text-white/70  font-light  text-lg ">
                                            <SpecialTitle
                                                text={value?.contentTitle}
                                                className=' font-semibold text-white '
                                            />
                                        </p>

                                        <div className="  flex">
                                            <TooltipWarpper text={`This is ${underscoreCapitalise(value?.type)}`}>
                                                <p className={`${value?.type === CourseContentEnum?.QUIZ ? "border-info bg-info/10 text-info" : "border-warning bg-warning/10 text-warning"} text-center text-sm font-medium py-1   px-4   border   rounded-3xl`}>
                                                    {underscoreCapitalise(value?.type)}
                                                </p>

                                            </TooltipWarpper>
                                        </div>


                                    </div>

                                    <div className=" md:hidden absolute top-3 right-3 flex w-8 h-8 border flex-none   bg-background text-primary rounded-full  items-center justify-center">
                                        <p className="  text-lg">{(index ?? 0) + 1}</p>
                                    </div>

                                </div>

                            </div>}
                        />
                    </>

                }


            </>}







        </>

    )
}

export default ModulesOrQuiz;