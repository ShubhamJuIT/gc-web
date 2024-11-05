"use client"
import React, { useState, } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import CreateQuestionForm from '../forms/create-question-form';
import { QuizModel } from '@/app/data/_models/course/quiz.model';
import { QuestionWithOptionsModel } from '@/app/data/_models/course/question.with.options.model';



const CreateQuestionModal = (props: {
    children: React.ReactNode,
    data?: QuestionWithOptionsModel
    quizId: string,
    onSucess: () => void


}) => {
    const [open, setOpen] = useState(false);



    const openModal = () => {
        setOpen(true);


    }

    const onSucessQuestion = () => {
        setOpen(false);
        props?.onSucess()
    }
    return (

        <Dialog modal={true} open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={openModal} asChild>
                {props?.children}
            </DialogTrigger>
            <DialogContent className=' sm:max-w-[700px]' >
                <DialogHeader>
                    <DialogTitle>Create Question</DialogTitle>
                    <DialogDescription>
                        Make changes and click save when you are done.
                    </DialogDescription>
                </DialogHeader>


                <CreateQuestionForm quizId={props?.quizId} onSuccess={onSucessQuestion} data={props?.data} />


            </DialogContent>
        </Dialog>
    );
};

export default CreateQuestionModal;
