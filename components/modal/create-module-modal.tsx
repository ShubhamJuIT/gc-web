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
import CreateModuleForm from '../forms/create-module-form';

const CreateModuleModal = (props: {
    children: React.ReactNode,
    courseId: string,
    moduleId?: string,
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
                    <DialogTitle>{props?.moduleId ? "Update" : "Create"} Module</DialogTitle>
                    <DialogDescription>
                        {`Add { } to highlight the text in title`}
                    </DialogDescription>
                </DialogHeader>


                <CreateModuleForm onSuccess={props?.onSuccess} courseId={props?.courseId} moduleId={props?.moduleId} />

            </DialogContent>
        </Dialog>
    );
};

export default CreateModuleModal;
