"use client"

import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"

const QuizResultScreen = (props: {
    isPassed: boolean | undefined,
    percentage: number,
    btnText: string,
    btnLoader: boolean,
    nextContentLoader?: boolean,
    onAction: () => void,
    onFinishQuiz?: () => void


}) => {
    return (
        <div className=" mt-6 flex justify-center text-center items-center flex-col border border-gray-100/20 rounded-lg md:p-10 p-5">
            <div className={`${props?.isPassed ? "bg-primary/10 text-primary border" : "bg-destructive/10 text-destructive border-destructive border"}
mb-8 flex-none md:w-20 w-16 md:h-20 h-16 rounded-full flex items-center md:text-6xl text-4xl justify-center `}>
                <span className=" icon-md">

                    <i className={`   ${props?.isPassed ? "icon-check" : "icon-cross"}`}></i>
                </span>
            </div>

            <p className=" lg:text-4xl md:text-3xl text-2xl mb-2   font-light">
                {props?.isPassed ? "Congratulations! You have passed the quiz" : "Sorry! You have failed the quiz"}
            </p>
            <p className={`font-semibold text-2xl  ${props?.isPassed ? "text-primary" : " text-destructive"}  mb-5 `}>You secured {props?.percentage}%</p>





            <div className=" flex md:items-center md:flex-row flex-col gap-3">

                <Button variant='outline' disabled={props?.btnLoader} onClick={props?.onAction} >
                    {props?.btnLoader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {props?.btnText}
                </Button>
                {props?.isPassed && <Button disabled={props?.nextContentLoader} onClick={props?.onFinishQuiz}>

                    {props?.nextContentLoader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Move to next section
                </Button>}

            </div>

        </div>
    )
}

export default QuizResultScreen;