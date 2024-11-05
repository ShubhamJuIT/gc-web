import React from 'react'
import TooltipWarpper from '../tooltip-warpper'
import { QuestionTypesEnum } from '@/app/data/_enums/question.types.enum'
import { getAlphabetCharacter } from '@/app/data/_helpers/text-methods'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { QuizResponseModel } from '@/app/data/_models/quiz.response.model'

const QuestionsScreen = (props: {
    quizResponse: QuizResponseModel,
    selectedAnswerIndex: number | null,
    btnLoader: boolean,
    handleMCQSelection: (index: number, option: string) => void,
    handleMSQSelection: (index: number, option: string) => void,
    onAction: () => void
}) => {
    return (
        <>
            <div className=" flex flex-col gap-3 lg:mb-8 md:mb-6 mb-4">

                <p className=" lg:text-3xl  md:text-2xl text-xl ">
                    <span className="  text-primary font-semibold">Question: {props?.quizResponse?.questionNo} </span> {props?.quizResponse?.question?.question}


                </p>

                <div>
                    <TooltipWarpper text={`This is ${props?.quizResponse?.question?.type === QuestionTypesEnum.MSQ ? "multiple select" : "multiple choice"} question`}>
                        <span className={`${props?.quizResponse?.question?.type === QuestionTypesEnum.MSQ ? 'bg-warning text-warning border border-warning ' : 'bg-info text-info border border-info '} text-xs bg-opacity-10 rounded-[99px] px-4 py-1`}>
                            {props?.quizResponse?.question?.type === QuestionTypesEnum.MSQ ? 'Multiple Select Question' : "Multiple Choice Question"}
                        </span>
                    </TooltipWarpper>
                </div>

            </div>

            {(props?.quizResponse?.question?.options && props?.quizResponse?.question?.options?.length > 0) &&
                <ul className="flex flex-col gap-5 mb-8 lg:text-xl md:text-lg text-base">
                    {props?.quizResponse?.question?.options?.map((option, index) => (
                        <li className="flex items-center gap-3" role="button" key={index}>

                            <span>
                                {getAlphabetCharacter(index)}.
                            </span>

                            {props?.quizResponse?.question?.type === QuestionTypesEnum?.MCQ ?

                                <div className="flex items-center space-x-2">


                                    <div className="radio-button-container">
                                        <input
                                            disabled={props?.btnLoader}
                                            type="radio"
                                            id={`option-${index}`}
                                            name="mcq"
                                            checked={props?.selectedAnswerIndex === index}
                                            onChange={() => props?.handleMCQSelection(index, option)}
                                        />
                                    </div>

                                    <label
                                        htmlFor={`option-${index}`}
                                        className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {option}
                                    </label>
                                </div>
                                :

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        disabled={props?.btnLoader}
                                        id={`option-${index}`}
                                        onCheckedChange={() => props?.handleMSQSelection(index, option)}

                                    />
                                    <label
                                        htmlFor={`option-${index}`}
                                        className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {option}
                                    </label>
                                </div>
                            }

                        </li>
                    ))}
                </ul>
            }

            {props?.quizResponse?.lastQuestion ? <p className=" mb-3 text-white/80 text-sm">This is the last question. Click on finish</p> : null}

            <Button type="button" disabled={props?.btnLoader} onClick={props?.onAction} >
                {props?.btnLoader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {props?.quizResponse?.lastQuestion ? "Finish" : "Next"}
            </Button>

        </>
    )
}

export default QuestionsScreen