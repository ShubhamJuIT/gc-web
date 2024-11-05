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
import { useForm, } from "react-hook-form"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "../ui/textarea"
import { VideoTypesEnum } from "@/app/data/_enums/video.types.enum"
import { CourseModel } from "@/app/data/_models/course/course.model";
import { CourseService } from "@/app/_services/lms/course.service";
import { showErrorToast } from "@/app/data/error.manager";
import { RemoteVideoService } from "@/app/_services/remote.video.service";
import { Label } from "../ui/label";
import { createCourseDefaults, createCourseFormSchema } from "@/lib/validation";
import VideoUploadInput from "../video-upload-input";
import UploadThumbNail from "../upload-thumbnail";
import SimpleLoader from "../simple-loader";





const EditCourseForm = (props: {
    loading: boolean,
    data: CourseModel | null,
    onSuccess: (data?: CourseModel) => void,
}) => {

    const { toast } = useToast();
    const [loader, setLoader] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState<boolean>(false);
    const [thumbnailLoader, setThumbnailLoader] = useState<boolean>(false);

    const form = useForm<z.infer<typeof createCourseFormSchema>>({
        resolver: zodResolver(createCourseFormSchema),
        defaultValues: {

            title: "",
            description: "",
            introVideoType: undefined,
            introVideoLink: "",
        },
    })


    useEffect(() => {



        if (props?.data) {
            form.reset(props?.data);
        }
    }, [form, props?.data])


    async function onSubmit(values: z.infer<typeof createCourseFormSchema>) {
        if (!props?.data?.id) {
            return;
        }



        const finalData = {
            ...values,
            introVideoLink: (values?.introVideoType === VideoTypesEnum.LINK && values?.introVideoLink) ? values?.introVideoLink : undefined
        }



        //  This will be type-safe and validated due to zod.

        setLoader(true);
        try {

            const data = await CourseService.updateCourse(props?.data?.id, finalData);
            props.onSuccess(data);


            toast({
                title: 'Saved Successfully',

            })
            setLoader(false);


        } catch (error) {
            showErrorToast(error);
            setLoader(false);
        }
    }


    const getIntroVideoUploadLink = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!props?.data?.id) {
            return;
        }
        const file = e?.target?.files ? e?.target?.files[0] : null;

        if (file?.type !== 'video/mp4' && file?.type !== 'video/webm') {
            toast({
                title: 'Invalid file type only .mp4 and .webm are allowed',
                variant: "destructive"
            })
            return;
        }
        setUploadingVideo(true);
        try {

            const data: {
                uploadKey: string,
                uploadLink: string,
            } = await CourseService.getIntroVideoUploadLink(props?.data?.id);

            await RemoteVideoService.uploadVideoOnRemoteLink(data.uploadLink, file);

            const updatedData = await CourseService.updateIntroVideoInCourse(props?.data?.id, data.uploadKey);
            props.onSuccess(updatedData);
            setUploadingVideo(false);


        } catch (error) {
            showErrorToast(error);
            setUploadingVideo(false);
        }
    }



    const onclickRemoveVideo = () => {
        const updatedData: any = { ...props?.data, introVideoUrl: undefined, introVideoType: VideoTypesEnum.UPLOAD };
        props.onSuccess(updatedData);
    }

    const onUploadThumbnail = async (blob: Blob) => {
        if (!props?.data?.id) {
            return;
        }
        setThumbnailLoader(true);
        try {
            const data = await CourseService.updateCourseThumbnail(props?.data?.id, blob);
            props.onSuccess(data);
            setThumbnailLoader(false);

        } catch (error) {
            showErrorToast(error);
            setThumbnailLoader(false);
        }
    }

    const removeThumnail = async () => {
        if (!props?.data?.id) {
            return;
        }
        setThumbnailLoader(true);
        try {
            const data = await CourseService.deleteCourseThumbnail(props?.data?.id);
            props.onSuccess(data);
            setThumbnailLoader(false);

        } catch (error) {
            showErrorToast(error);
            setThumbnailLoader(false);
        }

    }
    return (

        <>
            {props?.loading &&
                <SimpleLoader />

            }

            {(!props?.loading && !props?.data) && <div className="no-data">Course not found</div>}

            {(!props?.loading && props?.data) &&
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <div className=" flex justify-between items-center gap-5  mb-7 ">
                                <h2 className="  lg:text-3xl text-2xl   text-primary font-semibold ">Basic Outline</h2>
                                <Button disabled={loader} variant='outline-secondary' type="submit">
                                    {loader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save </Button>
                            </div>
                            <div className="grid  lg:grid-cols-3 md:grid-cols-2  gap-5 text-start mb-7 ">
                                <div className=" space-y-2 lg:col-span-3 md:col-span-2">
                                    <Label className=" md:text-xl text-lg font-bold">Thumbnail</Label>
                                    <UploadThumbNail
                                        onRemove={removeThumnail} loading={thumbnailLoader} onClickUpload={onUploadThumbnail} thumbnailUrl={props?.data?.thumbnailUrl} alt={props?.data?.title} />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className=" lg:col-span-3 md:col-span-2">
                                            <FormLabel className=" md:text-xl text-lg font-bold">Title <span className=" ml-1 text-sm ">({createCourseDefaults?.titleMaxLength} charecters Max) </span></FormLabel>
                                            <FormControl>
                                                <Input   {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="lg:col-span-3 md:col-span-2">
                                            <FormLabel className=" md:text-xl text-lg font-bold">Description <span className=" ml-1 text-sm ">({createCourseDefaults?.descriptionMaxLength} charecters Max) </span> </FormLabel>
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
                                    name="introVideoType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className=" md:text-xl text-lg font-bold">Intro Video Type</FormLabel>

                                            <FormControl>

                                                <select  {...field} className="video-type-selection flex h-10 w-full rounded-md border border-input bg-regular px-3 py-2 text-base ring-offset-background  placeholder:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                                    <option value="">Select an option</option>
                                                    {Object.values(VideoTypesEnum).map((type, i) =>
                                                        <option key={i} value={type}>{type}</option>)}

                                                </select>
                                            </FormControl>


                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />






                                {form.watch('introVideoType') === VideoTypesEnum.LINK && <>

                                    <FormField
                                        control={form.control}
                                        name="introVideoLink"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel className=" md:text-xl text-lg font-bold">Intro Video Link <span className=" ml-1 text-sm ">(YouTube/Viemo)</span></FormLabel>
                                                <FormControl>
                                                    <Input   {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>}
                                {form.watch('introVideoType') === VideoTypesEnum.UPLOAD && <>
                                    <div className=" space-y-2">
                                        <Label className=" md:text-xl text-lg font-bold">
                                            Intro Video File <span className=" ml-1 text-sm ">(.mp4/.webm)</span>
                                        </Label>
                                        <VideoUploadInput
                                            loader={uploadingVideo}
                                            videoUrl={props?.data?.introVideoUrl}
                                            onRemoveVideo={onclickRemoveVideo}
                                            onChange={getIntroVideoUploadLink}
                                        />
                                    </div>

                                </>}

                            </div>





                        </form>
                    </Form >



                </>
            }




        </>


    )
}

export default EditCourseForm