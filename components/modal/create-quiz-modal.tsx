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
import CreateQuizForm from '../forms/create-quiz-form';

const CreateQuizModal = (props: {
    children: React.ReactNode,
    courseId: string,
    quizId?: string,
    onSuccess: () => void

}) => {
    const [open, setOpen] = useState(false);



    const openModal = () => {
        setOpen(true);
    }


    return (

        <Dialog modal={true} open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={openModal} asChild>
                {props?.children}
            </DialogTrigger>
            <DialogContent className=' sm:max-w-[700px]'>
                <DialogHeader>
                    <DialogTitle>{props?.quizId ? "Update" : "Create"} Quiz</DialogTitle>
                    <DialogDescription>
                        {`Add { } to highlight the text in title`}
                    </DialogDescription>
                </DialogHeader>

                <CreateQuizForm onSuccess={props?.onSuccess} courseId={props?.courseId} quizId={props?.quizId} />

            </DialogContent>
        </Dialog>
    );
};

export default CreateQuizModal;
