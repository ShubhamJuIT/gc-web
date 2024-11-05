'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { InfoIcon, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "../ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "../ui/label";
import { showErrorToast } from "@/app/data/error.manager";
import UploadThumbNail from "../upload-thumbnail";
import SimpleLoader from "../simple-loader";
import { QuizService } from "@/app/_services/lms/quiz.service";
import { createQuizDefaults, createQuizFormSchema } from "@/lib/validation";
import { QuizModel } from "@/app/data/_models/course/quiz.model";
import TooltipWarpper from "../tooltip-warpper";


const CreateQuizForm = (props: {
    courseId: string
    quizId?: string,
    onSuccess: () => void
}) => {

    const [data, setData] = useState<QuizModel | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const [loader, setLoader] = useState(false);
    const [thumbnailLoader, setThumbnailLoader] = useState<boolean>(false);


    const form = useForm<z.infer<typeof createQuizFormSchema>>({
        resolver: zodResolver(createQuizFormSchema),
        defaultValues: {
            title: "",
            description: "",
            durationInMin: "",
            passPercentage: "",

        },
    })


    async function onSubmit(values: z.infer<typeof createQuizFormSchema>) {

        if (+values?.passPercentage > 100) {
            form.setError('passPercentage', {
                message: 'Pass Percentage must be less than or equal to 100%'
            });
            return;
        }

        const finalData = {
            ...values,
            durationInMin: +values?.durationInMin,
            passPercentage: +values?.passPercentage,
        }


        let obs;

        if (data?.id) {
            obs = QuizService.updateQuiz(data?.id, finalData);
        } else {
            obs = QuizService.createQuiz(props?.courseId, finalData);
        }



        //  This will be type-safe and validated due to zod.

        setLoader(true);
        try {
            await obs;
            props?.onSuccess();

            form.reset();
            toast({
                title: 'Saved Successfully',

            })
            setLoader(false);

        } catch (error) {
            showErrorToast(error);
            setLoader(false);
        }
    }





    const onUploadThumbnail = async (blob: Blob) => {
        if (!data?.id) {
            return;
        }

        setThumbnailLoader(true);
        try {
            const val = await QuizService.updateQuizThumbnail(data?.id, blob);
            form.reset(val);
            setData(val);
            props.onSuccess();
            setThumbnailLoader(false);

        } catch (error) {
            showErrorToast(error);
            setThumbnailLoader(false);
        }
    }

    const removeThumnail = async () => {
        if (!data?.id) {
            return;
        }
        setThumbnailLoader(true);
        try {
            const val = await QuizService.deleteQuizThumbnail(data?.id);
            form.reset(val);
            setData(val);
            props.onSuccess();
            setThumbnailLoader(false);

        } catch (error) {
            showErrorToast(error);
            setThumbnailLoader(false);
        }

    }

    useEffect(() => {
        const getQuizInfo = async (quizId: string) => {
            setLoading(true);
            try {
                const res = await QuizService.getQuiz(quizId);
                form.reset({
                    title: res?.title,
                    description: res?.description,
                    durationInMin: String(res?.durationInMin),
                    passPercentage: String(res?.passPercentage),
                });
                setData(res);
                setLoading(false);

            } catch (error) {
                showErrorToast(error);
                setLoading(false);

            }
        }
        if (props?.quizId) {
            getQuizInfo(props?.quizId);
        }
    }, [form, props?.quizId])







    return (
        <>
            {loading ?
                <SimpleLoader />
                :
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <ScrollArea className={`h-[420px]`}>
                            <div className="grid  md:grid-cols-2  gap-5 text-start mb-7 px-1 ">
                                {data && <div className=" space-y-2">
                                    <Label className=" md:text-xl text-lg font-bold">Thumbnail</Label>
                                    <UploadThumbNail
                                        onRemove={removeThumnail} loading={thumbnailLoader} onClickUpload={onUploadThumbnail} thumbnailUrl={data?.thumbnailUrl} alt={data?.title ?? 'Placeholer'} />
                                </div>
                                }

                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className=" md:col-span-2" >
                                            <FormLabel className=" md:text-xl text-lg font-bold">Title <span className=" ml-1 text-sm ">({createQuizDefaults?.titleMaxLength} charecters Max) </span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Eg. {Quiz 1} : Inroduction Quiz 1"   {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className=" md:col-span-2">
                                            <FormLabel className=" md:text-xl text-lg font-bold">Description <span className=" ml-1 text-sm ">({createQuizDefaults?.descriptionMaxLength} charecters Max) </span> </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    cols={30}
                                                    rows={6}

                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="durationInMin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className=" flex  items-center gap-2 md:text-xl text-lg font-bold">

                                                Duration<span className="  text-sm ">(Mins)</span>
                                                <TooltipWarpper text="This Indicates the approx time in which this quiz will be completed">
                                                    <span className=" text-secondary ">
                                                        <InfoIcon size={14} />
                                                    </span>
                                                </TooltipWarpper>

                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} type="number" />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="passPercentage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className=" md:text-xl text-lg font-bold">Pass Percentage</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="number" />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                        </ScrollArea>


                        <div className=" flex justify-end">
                            <Button disabled={loader} type="submit">
                                {loader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save </Button>
                        </div>





                    </form>
                </Form >

            }



        </>


    )
}

export default CreateQuizForm