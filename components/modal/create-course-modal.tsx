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
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { CourseService } from '@/app/_services/lms/course.service';
import { showErrorToast } from '@/app/data/error.manager';
import { Loader2 } from 'lucide-react';
import { CourseModel } from '@/app/data/_models/course/course.model';
import { createCourseDefaults } from '@/lib/validation';

const CreateCourseModal = (props: {
    children: React.ReactNode,


}) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [title, setTitle] = useState<string | null>(null);
    const [loader, setLoader] = useState<boolean>(false);
    const { toast } = useToast();

    const openModal = () => {
        setOpen(true);
        setTitle(null);


    }
    const onclickCreate = async () => {
        const trimmedTitle = title?.trim();

        if (!trimmedTitle || trimmedTitle?.length === 0) {
            toast({
                title: 'Invalid Input',
                description: 'Please enter a valid course title',
                variant: "destructive"
            });
            return;
        }

        if (trimmedTitle?.length > createCourseDefaults?.titleMaxLength) {
            toast({

                title: `Title cannot be more than ${createCourseDefaults?.titleMaxLength} characters`,
                description: 'Please reduce the length of the title',
                variant: "destructive"
            });
            return;
        }

        setLoader(true);
        try {

            const data: CourseModel = await CourseService.createCourse(trimmedTitle);
            setLoader(false);
            setOpen(false);

            toast({
                title: 'Course created successfully',
                description: 'Fill in the rest of the details to get started',
            });

            router.push(`/my-courses/${data?.id}/edit`);


        } catch (error) {
            showErrorToast(error);
            setLoader(false);

        }

    };
    return (

        <Dialog modal={true} open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={openModal} asChild>
                {props?.children}
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Create Course</DialogTitle>
                    <DialogDescription>
                        Make changes and click save when you are done.
                    </DialogDescription>
                </DialogHeader>


                <Label className=" md:text-xl text-lg font-bold">Enter Course Title  <span className=" ml-1 text-sm ">({createCourseDefaults?.titleMaxLength} charecters Max) </span></Label>
                <Input onChange={(e) => setTitle(e?.target?.value)} />
                <div className=' flex justify-end'>
                    <Button disabled={loader} onClick={onclickCreate}>
                        {loader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create</Button>
                </div>


            </DialogContent>
        </Dialog>
    );
};

export default CreateCourseModal;
