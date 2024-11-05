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

import UpdateProfileForm from '../forms/update-profile-form';



const UpdateProfileInfoModal = (props: {
    children: React.ReactNode,
    title: string
    data?: any,
    onSuccess: () => void

}) => {
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    }

    const onUpdate = () => {
        setOpen(false);
        props?.onSuccess();
    }

    return (

        <Dialog modal={true} open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={openModal} asChild>
                {props?.children}
            </DialogTrigger>
            <DialogContent className=' sm:max-w-[700px]' >
                <DialogHeader>
                    <DialogTitle>
                        {props?.title}

                    </DialogTitle>
                    <DialogDescription>
                        Make changes and click save when you are done.
                    </DialogDescription>
                </DialogHeader>


                <UpdateProfileForm onSuccess={onUpdate} userData={props?.data} />


            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileInfoModal;
