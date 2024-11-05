
'use client'
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { StudyAreaModel } from "@/app/data/_models/study.area.model";
import DynamicImage from "../dynamicImage";
import SpecialTitle from "../specialTitle";
import { showErrorToast } from "@/app/data/error.manager";
import { QuizService } from "@/app/_services/lms/quiz.service";
import { QuizResponseModel } from "@/app/data/_models/quiz.response.model";
import { QuestionTypesEnum } from "@/app/data/_enums/question.types.enum";
import QuizResultScreen from "./quiz-result-screen";
import QuizInsights from "./quiz-insights";
import QuestionsScreen from "./questions-screen";




const QuizArea = (props: {
    data: StudyAreaModel
    onFinished: (passPercentage: number, isQuizPassed: boolean) => void,
    nextContentLoader: boolean

}) => {
    const { toast } = useToast();
    const [btnLoader, setBtnLoader] = useState(false);
    const [quizResponse, setQuizResponse] = useState<QuizResponseModel | null>(null);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [selectedAnswerIndexes, setSelectedAnswerIndexes] = useState<number[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);


    const onClickStart: () => Promise<void> = async () => {

        setBtnLoader(true);
        try {
            const res = await QuizService.startQuiz(props?.data?.courseModel?.id, props?.data?.quizModel?.id);
            setQuizResponse(res);
            setBtnLoader(false);
        } catch (error) {
            showErrorToast(error);
            setBtnLoader(false);

        }

    }

    const onClickNext: () => Promise<void> = async () => {
        if (!quizResponse) return;

        const userQuizId = quizResponse?.userQuizModel?.id;
        const currentQuestion = quizResponse?.question;
        const questionType = currentQuestion?.type;

        let data: {
            questionId: string,
            answerIndex?: number,
            answer?: string,
            answerIndexes?: number[],
            answers?: string[],
        } = { questionId: currentQuestion?.id };

        if (questionType === QuestionTypesEnum.MSQ) {
            if (!selectedAnswerIndexes || selectedAnswerIndexes?.length === 0 || !selectedAnswers || selectedAnswers?.length === 0) {
                toast({
                    title: "Please select atleast one answer",
                    variant: "destructive"
                })
                return;
            }

            data.answerIndexes = selectedAnswerIndexes;
            data.answers = selectedAnswers;



        } else if (questionType === QuestionTypesEnum.MCQ) {


            if (selectedAnswerIndex === null || selectedAnswer === null) {
                toast({
                    title: "Please select an answer",
                    variant: "destructive"
                })
                return;
            }


            data.answerIndex = selectedAnswerIndex;
            data.answer = selectedAnswer;
        } else {
            toast({
                title: "Question type not supported",
                variant: "destructive"
            })
            return;
        }

        setBtnLoader(true);
        try {
            const response = await QuizService.saveAndNextAnswer(userQuizId, data);

            setQuizResponse(response);

            setSelectedAnswerIndex(null);
            setSelectedAnswer(null);
            setSelectedAnswerIndexes([]);
            setSelectedAnswers([]);
            setBtnLoader(false);
        } catch (error) {
            showErrorToast(error);
            setBtnLoader(false);
        }


    }

    const handleMCQSelection = (index: number, answer: string) => {

        setSelectedAnswerIndex(index);
        setSelectedAnswer(answer);

    };
    const handleMSQSelection = (index: number, answer: string) => {

        setSelectedAnswerIndexes(prevIndexes => {
            if (prevIndexes.includes(index)) {

                return prevIndexes.filter(i => i !== index);
            } else {

                return [...prevIndexes, index];
            }
        });
        setSelectedAnswers(prevAnswers => {
            if (prevAnswers.includes(answer)) {

                return prevAnswers.filter(a => a !== answer);
            } else {

                return [...prevAnswers, answer];
            }
        });
    };

    return (
        <>


            <div className=" grid md:grid-cols-2  gap-10   lg:mb-14 md:mb-10 mb-8">
                <div>
                    <h1 className=" mb-3 lg:text-6xl md:text-5xl text-3xl font-bold text-secondary lg:-leading-[6px]">
                        <SpecialTitle
                            text={props?.data?.quizModel?.title}
                            className=""

                        />

                    </h1>




                    <>
                        {!quizResponse ?
                            <>
                                {props?.data?.currentContentProgress?.quizPassed ?
                                    <QuizResultScreen
                                        isPassed={true}
                                        percentage={props?.data?.currentContentProgress?.quizPercentage ?? 0}
                                        btnText="Re-attempt"
                                        btnLoader={btnLoader}
                                        onAction={onClickStart}
                                        nextContentLoader={props?.nextContentLoader}
                                        onFinishQuiz={() => props?.onFinished(props?.data?.currentContentProgress?.quizPercentage, props?.data?.currentContentProgress?.quizPassed)}

                                    /> :
                                    <QuizInsights
                                        btnLoader={btnLoader}
                                        onAction={onClickStart}
                                        data={props?.data} />
                                }
                            </> :
                            <>

                                {quizResponse?.status === "IN_PROGRESS" ?
                                    <QuestionsScreen

                                        quizResponse={quizResponse}
                                        selectedAnswerIndex={selectedAnswerIndex}
                                        btnLoader={btnLoader}
                                        handleMCQSelection={handleMCQSelection}
                                        handleMSQSelection={handleMSQSelection}
                                        onAction={onClickNext}

                                    /> : <QuizResultScreen

                                        isPassed={quizResponse?.userQuizModel?.pass}
                                        percentage={quizResponse?.userQuizModel?.percentage ?? 0}
                                        btnText="Re-attempt"
                                        btnLoader={btnLoader}
                                        onAction={onClickStart}
                                        nextContentLoader={props?.nextContentLoader}
                                        onFinishQuiz={() => props?.onFinished(quizResponse?.userQuizModel?.percentage, quizResponse?.userQuizModel?.pass)}
                                    />



                                }

                            </>

                        }
                    </>

                </div>

                <div>
                    <DynamicImage

                        wrapperClassName="relative pb-[80%]  rounded-lg overflow-hidden"
                        alt={props?.data?.quizModel?.title}
                        src={props?.data?.quizModel?.thumbnailUrl ?? '/svgs/image-placeholder.svg'}
                        fallbackImage='/svgs/image-placeholder.svg'
                    />

                </div>


            </div>

        </>

    )
}

export default QuizArea