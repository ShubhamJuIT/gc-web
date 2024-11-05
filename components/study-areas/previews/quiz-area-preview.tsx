"use client"

import { QuestionTypesEnum } from "@/app/data/_enums/question.types.enum"
import { getAlphabetCharacter } from "@/app/data/_helpers/text-methods"
import { QuestionWithOptionsModel } from "@/app/data/_models/course/question.with.options.model"
import { QuizModel } from "@/app/data/_models/course/quiz.model"
import DynamicImage from "@/components/dynamicImage"
import SpecialTitle from "@/components/specialTitle"
import TooltipWarpper from "@/components/tooltip-warpper"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

const QuizAreaPreview = (props: {
    data: QuizModel
}) => {
    const [questions, setQuestions] = useState<QuestionWithOptionsModel[]>([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
    const activeQuestion = questions[activeQuestionIndex];

    const onClickViewQuestions = () => {
        if (props?.data?.questionsModel && props?.data?.questionsModel?.length > 0) {
            setQuestions(props?.data?.questionsModel)
        }
    }

    const isLastQuestion = activeQuestionIndex === questions?.length - 1;

    const onClickNextQuestion = () => {
        if (isLastQuestion) {
            return;
        }
        setActiveQuestionIndex(prev => prev + 1);
    }
    return (
        <>
            <div className=" grid md:grid-cols-2  gap-10   lg:mb-14 md:mb-10 mb-8">
                <div>
                    <h1 className=" mb-3 lg:text-6xl md:text-5xl text-3xl font-bold text-secondary lg:-leading-[6px]">
                        <SpecialTitle
                            text={props?.data?.title}
                            className=""

                        />

                    </h1>
                    {(!questions || questions?.length === 0) ?
                        <>
                            <p className=" lg:text-4xl md:text-3xl text-2xl mb-8   font-light">{props?.data?.description}</p>
                            <div className=" grid md:grid-cols-3 gap-5 mb-5">
                                <div className=" border border-gray-100/20 rounded-lg p-4">
                                    <p className=" text-white/80   mb-3">Total Questions</p>
                                    <p className="  font-semibold text-2xl  mb-0">{props?.data?.totalQuestions ?? 0}</p>
                                </div>
                                <div className=" border border-gray-100/20 rounded-lg p-4">
                                    <p className=" text-white/80   mb-3">Passing Percentage</p>
                                    <p className="  font-semibold text-2xl  mb-0">{props?.data?.passPercentage ?? 0}%</p>
                                </div>
                                <div className=" border border-gray-100/20 rounded-lg p-4">
                                    <p className=" text-white/80   mb-3">Total Marks</p>
                                    <p className="  font-semibold text-2xl  mb-0">{props?.data?.maxScore ?? 0}</p>
                                </div>
                            </div>


                            <Button onClick={onClickViewQuestions}>
                                View Questions
                            </Button>

                        </> :
                        <>

                            <div className=" flex flex-col gap-3 lg:mb-8 md:mb-6 mb-4">

                                <p className=" lg:text-3xl  md:text-2xl text-xl ">
                                    <span className="  text-primary font-semibold">Question: {activeQuestionIndex + 1} </span> {activeQuestion?.question}


                                </p>

                                <div>
                                    <TooltipWarpper text={`This is ${activeQuestion?.type === QuestionTypesEnum.MSQ ? "multiple select" : "multiple choice"} question`}>
                                        <span className={`${activeQuestion?.type === QuestionTypesEnum.MSQ ? 'bg-warning text-warning border border-warning ' : 'bg-info text-info border border-info '} text-xs bg-opacity-10 rounded-[99px] px-4 py-1`}>
                                            {activeQuestion?.type === QuestionTypesEnum.MSQ ? 'Multiple Select Question' : "Multiple Choice Question"}
                                        </span>
                                    </TooltipWarpper>
                                </div>

                            </div>


                            {(activeQuestion?.options && activeQuestion?.options?.length > 0) &&
                                <ul className="flex flex-col gap-5 mb-8 lg:text-xl md:text-lg text-base">
                                    {activeQuestion?.options?.map((option, index) => (
                                        <li className="flex items-center gap-3" role="button" key={index}>

                                            <span>
                                                {getAlphabetCharacter(index)}.
                                            </span>

                                            {activeQuestion?.type === QuestionTypesEnum?.MCQ ?

                                                <div className="flex items-center space-x-2">


                                                    <div className="radio-button-container">
                                                        <input
                                                            disabled={true}
                                                            type="radio"
                                                            id={`option-${index}`}
                                                            name="mcq"

                                                        />
                                                    </div>

                                                    <label
                                                        htmlFor={`option-${index}`}
                                                        className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {option?.text}
                                                    </label>
                                                </div>
                                                :

                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        disabled={true}
                                                        id={`option-${index}`}

                                                    />
                                                    <label
                                                        htmlFor={`option-${index}`}
                                                        className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {option?.text}
                                                    </label>
                                                </div>
                                            }

                                        </li>
                                    ))}
                                </ul>
                            }


                            {isLastQuestion ? <p className=" mb-3 text-white/80 text-sm">This is the last question</p> : null}
                            <Button onClick={onClickNextQuestion} disabled={isLastQuestion} type="button"  >
                                {isLastQuestion ? "Done" : "View Next"}
                            </Button>
                        </>

                    }



                </div>

                <div>
                    <DynamicImage
                        wrapperClassName="relative pb-[80%]  rounded-lg overflow-hidden"
                        alt={props?.data?.title}
                        src={props?.data?.thumbnailUrl ?? '/svgs/image-placeholder.svg'}
                        fallbackImage='/svgs/image-placeholder.svg'
                    />

                </div>


            </div>


        </>
    )
}

export default QuizAreaPreview