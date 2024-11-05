"use client"

import { QuestionService } from "@/app/_services/lms/question.service";
import { QuizService } from "@/app/_services/lms/quiz.service";
import { ReorderService } from "@/app/_services/lms/reorder.service";
import { QuestionTypesEnum } from "@/app/data/_enums/question.types.enum";
import { QuestionWithOptionsModel } from "@/app/data/_models/course/question.with.options.model";
import { QuizModel } from "@/app/data/_models/course/quiz.model";
import { showErrorToast } from "@/app/data/error.manager";
import AlertDialogWrapper from "@/components/alert-dialog-wrapper";
import BackButton from "@/components/back-button";
import CreateQuestionModal from "@/components/modal/create-question-modal";
import SimpleLoader from "@/components/simple-loader";
import SpecialTitle from "@/components/specialTitle";
import TooltipWarpper from "@/components/tooltip-warpper";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { List, arrayMove } from "react-movable";


const CourseQuizes = ({
    params
}: {
    params: {
        id: string
    }
}) => {
    const { toast } = useToast();
    const [data, setData] = useState<QuizModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [tempId, setTempId] = useState<string | null>(null);
    const [rearrangeList, setRearrangeList] = useState<QuestionWithOptionsModel[]>([]);
    const [rearrangeLoading, setRearrangeLoading] = useState<boolean>(false);
    const getQuizInfo = async (quizId: string, isLoaderRequired: boolean = true) => {
        setLoading(isLoaderRequired);
        try {
            const res = await QuizService.getQuiz(quizId);
            setData(res);
            setLoading(false);

        } catch (error) {
            showErrorToast(error);
            setLoading(false);

        }
    }
    useEffect(() => {

        if (params?.id) {
            getQuizInfo(params?.id);
        }


    }, [params?.id]);


    const deleteQuestion = async (questionId: string) => {
        setDeleteLoading(true);
        setTempId(questionId);
        try {
            await QuestionService.deleteQuestion(questionId);
            getQuizInfo(params?.id, false);
            setDeleteLoading(false);
            setTempId(null);
        } catch (error) {
            showErrorToast(error);
            setDeleteLoading(false);
            setTempId(null);
        }
    }

    const handleRearrangeList = () => {
        setRearrangeList(data?.questionsModel ?? []);
    }
    const handleCancelRearrange = () => {
        setRearrangeList([]);
    }

    const handleSaveRearrange = async () => {
        if (!data?.id) {
            return;
        }


        const ids = rearrangeList.map(val => val?.id);
        setRearrangeLoading(true);
        try {
            const res = await ReorderService.reorderQuizQuestions(data?.id, ids);
            setData(res);
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
        <section className="lg:mb-20 md:mb-16 sm:mb-14 mb-12" >

            <div className="container max-w-[1240px]">
                <div className='md:pt-32  pt-28   '>

                    <>



                        <div className=" flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 mb-7">
                            <h1 className="   xl:text-4xl text-3xl   text-secondary font-semibold ">
                                <SpecialTitle
                                    text={data?.title ?? "Quiz Info"}
                                    className=''
                                />
                            </h1>


                            <div className="flex sm:items-center sm:flex-row flex-col gap-3 ">
                                <BackButton />
                            </div>

                        </div>


                        <div className=" bg-regular rounded-2xl  lg:p-9 md:p-8 p-7  ">
                            {loading && <SimpleLoader />}


                            {(!loading && !data) && <div className="no-data">Data not found</div>}

                            {(!loading && data) && <>

                                <div className="flex sm:justify-between sm:items-center  sm:flex-row flex-col gap-5 mb-7">
                                    <h2 className="lg:text-3xl text-2xl text-primary font-semibold">
                                        {rearrangeList?.length > 0 ? "Rearrange Questions" : "Quiz Details"}


                                    </h2>
                                    <div className="flex sm:justify-between sm:items-center  sm:flex-row flex-col gap-5">
                                        {rearrangeList?.length > 0 ?
                                            <>
                                                <>

                                                    <Button onClick={handleCancelRearrange} disabled={rearrangeLoading} variant="outline-secondary" >
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={handleSaveRearrange} disabled={rearrangeLoading} variant='outline' >
                                                        {rearrangeLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                        Save Changes
                                                    </Button>
                                                </>

                                            </> :
                                            <>
                                                <Button onClick={handleRearrangeList} disabled={deleteLoading || !data?.questionsModel || data?.questionsModel?.length === 0} variant='outline-warning' >
                                                    Re-Arrange
                                                </Button>
                                                <CreateQuestionModal onSucess={() => getQuizInfo(params?.id, false)} quizId={params?.id}>
                                                    <Button disabled={deleteLoading} variant="outline-secondary" >
                                                        Create Question
                                                    </Button>
                                                </CreateQuestionModal>

                                            </>}

                                    </div>


                                </div>
                                <div className=" text-sm text-white/70">
                                    <h3 className=" text-secondary  text-xl font-semibold  mb-2">Note</h3>
                                    <p className="mb-4 ">There are 2 types of questions you can create </p>
                                    <ul className="  flex md:flex-row flex-col md:items-center gap-3">

                                        <li className=" flex items-center gap-2">
                                            <p className={` bg-info text-info   text-xs bg-opacity-10  rounded-[99px] px-4 py-1 `}>
                                                MCQ
                                            </p>
                                            &mdash;
                                            <p >Multiple Choice Question</p>


                                        </li>

                                        <li className=" flex items-center gap-2">
                                            <p className={` bg-warning text-warning  text-xs  bg-opacity-10  rounded-[99px] px-4 py-1 `}>
                                                MSQ
                                            </p>
                                            &mdash;
                                            <p>Multiple Select Question</p>


                                        </li>


                                    </ul>
                                </div>


                                <hr className=" my-5 border-gray-100/30" />
                                <h3 className=" text-primary  text-2xl font-semibold  mb-2">Questions</h3>

                                {(!data?.questionsModel || data?.questionsModel?.length === 0) ?
                                    <div className=" no-data">
                                        No questions Added Yet. Create a question to get started.
                                    </div>


                                    :

                                    <>
                                        {(!rearrangeList || rearrangeList?.length === 0) ?
                                            <Accordion type="single" collapsible>
                                                {data?.questionsModel?.map((item, index) => (
                                                    <AccordionItem key={index} value={`item-${index + 1}`}>
                                                        <AccordionTrigger className="hover:no-underline">
                                                            <div className="flex md:flex-row   items-center  gap-4">
                                                                <TooltipWarpper text={`This is ${item?.type === QuestionTypesEnum.MSQ ? "multiple select" : "multiple choice"} question`}>
                                                                    <p className={`${item?.type === QuestionTypesEnum.MSQ ? 'bg-warning text-warning ' : 'bg-info text-info '} text-xs bg-opacity-10 rounded-[99px] px-4 py-1`}>
                                                                        {item?.type}
                                                                    </p>
                                                                </TooltipWarpper>
                                                                <p className="text-white/90">
                                                                    <span className="mr-4">{index + 1}</span>
                                                                    {item?.question}
                                                                </p>
                                                            </div>
                                                        </AccordionTrigger>
                                                        <AccordionContent className="text-white/90">
                                                            <h4 className="font-semibold text-base mb-4">Answer</h4>
                                                            <div className="space-y-3 text-base">
                                                                {item?.options?.map((option, idx) => (
                                                                    <div className="flex items-center gap-3" key={idx}>
                                                                        <div className={`${option.correct ? "bg-primary/10 text-primary" : 'bg-secondary/10 text-secondary'} rounded-full w-6 h-6 text-lg flex justify-center items-center`}>
                                                                            <span className="icon-md">
                                                                                {option.correct ? <i className="icon-check"></i> : <i className="icon-cross"></i>}
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-start">{option.text}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="flex md:justify-end items-center gap-4 md:mt-4 mt-8">
                                                                <AlertDialogWrapper
                                                                    actionText="Delete"
                                                                    onAction={() => deleteQuestion(item?.id)}
                                                                    description="You are about to delete a question. You'll not able to recover it."
                                                                    title="Are you sure about deleting this?"
                                                                >
                                                                    <Button disabled={deleteLoading} size="sm" variant="outline-secondary">
                                                                        {deleteLoading && tempId === item?.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                                                        Delete

                                                                    </Button>
                                                                </AlertDialogWrapper>
                                                                <CreateQuestionModal onSucess={() => getQuizInfo(params?.id, false)} quizId={params?.id} data={item}>
                                                                    <Button disabled={deleteLoading} size="sm" className="font-normal" variant="outline">Edit</Button>
                                                                </CreateQuestionModal>
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion> :

                                            <>
                                                <List
                                                    values={rearrangeList}
                                                    onChange={({ oldIndex, newIndex }) =>
                                                        setRearrangeList(arrayMove(rearrangeList, oldIndex, newIndex))
                                                    }
                                                    renderList={({ children, props }) => <div className="   flex flex-col gap-5 overflow-auto" {...props}>{children}</div>}
                                                    renderItem={({ value, props, index }) => <div className=" hover:cursor-move" {...props}>

                                                        <div className=" md:text-start text-center bg-background  rounded-xl p-3 flex items-center md:flex-row flex-col  gap-3">
                                                            <div className=" flex w-10 h-10 border flex-none  bg-primary/5 text-primary rounded-full  items-center justify-center">
                                                                <p className="  text-lg">Q.{(index ?? 0) + 1}</p>

                                                            </div>




                                                            <div className=" flex items-center md:flex-row flex-col   gap-3">
                                                                <TooltipWarpper text={`This is ${value?.type === QuestionTypesEnum.MSQ ? "multiple select" : "multiple choice"} question`}>
                                                                    <p className={`${value?.type === QuestionTypesEnum.MSQ ? 'bg-warning/5 text-warning  border-warning ' : 'bg-info/5 text-info border-info '} border text-xs  rounded-[99px] px-4 py-1`}>
                                                                        {value?.type}
                                                                    </p>
                                                                </TooltipWarpper>
                                                                <p className="  text-white/70  font-light  text-lg ">
                                                                    <SpecialTitle
                                                                        text={value?.question}
                                                                        className=' font-semibold text-white '
                                                                    />
                                                                </p>


                                                            </div>



                                                        </div>

                                                    </div>}
                                                />

                                            </>

                                        }

                                    </>



                                }



                            </>}

                        </div>
                    </>

                </div>

            </div>

        </section>
    )
}

export default CourseQuizes