"use client"
import { StudyAreaModel } from '@/app/data/_models/study.area.model'
import React from 'react'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

const QuizInsights = (props: {
    data: StudyAreaModel,
    btnLoader: boolean,
    onAction: () => void
}) => {
    let btnText;
    const hasPassedQuiz = props?.data?.currentContentProgress?.completedAt && !props?.data?.currentContentProgress?.quizPassed;

    if (hasPassedQuiz) {
        btnText = "Re-attempt"
    } else if (props?.data?.userQuizModel) {
        btnText = "Continue"
    } else {
        btnText = "Start"
    }

    return (
        <>
            <p className=" lg:text-4xl md:text-3xl text-2xl mb-8   font-light">{props?.data?.quizModel?.description}</p>
            <div className=" grid md:grid-cols-3 gap-5 mb-5">
                <div className=" border border-gray-100/20 rounded-lg p-4">
                    <p className=" text-white/80   mb-3">Total Questions</p>
                    <p className="  font-semibold text-2xl  mb-0">{props?.data?.quizModel?.totalQuestions ?? 0}</p>
                </div>
                <div className=" border border-gray-100/20 rounded-lg p-4">
                    <p className=" text-white/80   mb-3">Passing Percentage</p>
                    <p className="  font-semibold text-2xl  mb-0">{props?.data?.quizModel?.passPercentage ?? 0}%</p>
                </div>
                <div className=" border border-gray-100/20 rounded-lg p-4">
                    <p className=" text-white/80   mb-3">Total Marks</p>
                    <p className="  font-semibold text-2xl  mb-0">{props?.data?.quizModel?.maxScore ?? 0}</p>
                </div>
            </div>

            <div className=' flex items-center gap-1 mb-3'>
                {props?.data?.userQuizModel ? <p className="  text-white/80 text-sm">You were previously giving quiz.</p> : null}


                {(hasPassedQuiz) ?
                    <p className="  text-white/80 text-sm">

                        <span className=" text-destructive">You haven`&apos;t passed it.</span></p>


                    : null}
            </div>



            <Button disabled={props?.btnLoader} onClick={props?.onAction} >
                {props?.btnLoader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {btnText}

            </Button>

        </>
    )
}

export default QuizInsights