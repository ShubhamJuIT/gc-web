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

import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from '../ui/textarea';
import { CourseService } from '@/app/_services/lms/course.service';
import { showErrorToast } from '@/app/data/error.manager';
import { Loader2 } from 'lucide-react';

const ActionOnCourse = (props: {
    courseId: string,
    children: React.ReactNode,
    actionType: "DELETE" | "ARCHIVE" | "REJECT" | "RESTORE",
    onSucessAction: () => void


}) => {
    const [open, setOpen] = useState(false);

    const [value, setValue] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const openModal = () => {
        setOpen(true);
        setValue(null);


    }
    const onSubmit = async () => {
        console.log(value);
        const trimmedvalue = value?.trim();

        if (!trimmedvalue || trimmedvalue?.length === 0) {
            toast({
                title: 'Invalid Input',
                description: 'Please enter reason',
                variant: "destructive"
            });
            return;
        }
        let obs;

        switch (props?.actionType) {
            case "DELETE":

                obs = CourseService.markCourseDeleted(props?.courseId, trimmedvalue)
                break;
            case "ARCHIVE":
                console.log("Archive");
                obs = CourseService.markCourseArchived(props?.courseId, trimmedvalue)
                break;
            case "REJECT":

                obs = CourseService.rejectCourse(props?.courseId, trimmedvalue)
                break;
            case "RESTORE":

                obs = CourseService.restoreCourse(props?.courseId, trimmedvalue)
                break;
            default:
                break;
        }

        setLoading(true);
        try {
            await obs;
            props?.onSucessAction();

            toast({
                title: `${props?.actionType} successfully`,
            });
            setLoading(false);
            setOpen(false);
        } catch (error) {
            showErrorToast(error);
            setLoading(false);

        }


    };
    return (

        <Dialog modal={true} open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={openModal} asChild>
                {props?.children}
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle className=' capitalize' >{props?.actionType?.toLowerCase()} Course</DialogTitle>
                    <DialogDescription>
                        Explain why you want to {props?.actionType} this course
                    </DialogDescription>
                </DialogHeader>

                <Textarea onChange={(e) => setValue(e?.target?.value)} name="action" id="action" cols={30} rows={5}></Textarea>
                <div className=' flex justify-end'>
                    <Button disabled={loading} type='button' onClick={onSubmit}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit</Button>
                </div>


            </DialogContent>
        </Dialog>
    );
};

export default ActionOnCourse;
