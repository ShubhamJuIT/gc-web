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
import { VideoTypesEnum } from "@/app/data/_enums/video.types.enum"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "../ui/label";
import { createModuleDefaults, createModuleFormSchema } from "@/lib/validation";
import { ModuleService } from "@/app/_services/lms/module.service";
import { showErrorToast } from "@/app/data/error.manager";
import { ModuleModel } from "@/app/data/_models/course/module.model";
import UploadThumbNail from "../upload-thumbnail";
import VideoUploadInput from "../video-upload-input";
import { RemoteVideoService } from "@/app/_services/remote.video.service";
import SimpleLoader from "../simple-loader";
import TooltipWarpper from "../tooltip-warpper";





const CreateModuleForm = (props: {
    courseId: string
    moduleId?: string,
    onSuccess: () => void
}) => {

    const [data, setData] = useState<ModuleModel | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const [loader, setLoader] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState<boolean>(false);
    const [thumbnailLoader, setThumbnailLoader] = useState<boolean>(false);


    const form = useForm<z.infer<typeof createModuleFormSchema>>({
        resolver: zodResolver(createModuleFormSchema),
        defaultValues: {

            title: "",
            description: "",
            introVideoType: undefined,
            introVideoLink: "",
            durationInMin: ""



        },
    })


    async function onSubmit(values: z.infer<typeof createModuleFormSchema>) {

        let finalData: any;

        if (data?.id) {
            finalData = {
                ...values,
                durationInMin: values?.durationInMin ? +values?.durationInMin : undefined,
                introVideoLink: (values?.introVideoType === VideoTypesEnum.LINK && values?.introVideoLink) ? values?.introVideoLink : undefined

            }
        } else {

            finalData = {
                title: values?.title,
                description: values?.description,
            }
        }

        let obs;

        if (data?.id) {
            obs = ModuleService.updateModule(data?.id, finalData);
        } else {
            obs = ModuleService.createModule(props?.courseId, finalData);
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
            const val = await ModuleService.updateModuleThumbnail(data?.id, blob);
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
            const val = await ModuleService.deleteModuleThumbnail(data?.id);
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
        const getModuleInfo = async (moduleId: string) => {
            setLoading(true);
            try {
                const res = await ModuleService.getModule(moduleId);
                form.reset(res);
                setData(res);
                setLoading(false);

            } catch (error) {
                showErrorToast(error);
                setLoading(false);

            }
        }
        if (props?.moduleId) {
            getModuleInfo(props?.moduleId);
        }
    }, [form, props?.moduleId])



    const getIntroVideoUploadLink = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!data?.id) {
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

            const val: {
                uploadKey: string,
                uploadLink: string,
            } = await ModuleService.getIntroVideoUploadLink(data?.id);

            await RemoteVideoService.uploadVideoOnRemoteLink(val.uploadLink, file);

            const updatedData = await ModuleService.updateIntroVideoInModule(data?.id, val.uploadKey);
            setData(updatedData);
            form.reset(updatedData);
            setUploadingVideo(false);


        } catch (error) {
            showErrorToast(error);
            setUploadingVideo(false);
        }
    }



    const onclickRemoveVideo = () => {
        const updatedData: any = { ...data, introVideoUrl: undefined, introVideoType: VideoTypesEnum.UPLOAD };
        setData(updatedData);
        form.reset(updatedData);
    }

    return (
        <>
            {loading ?
                <SimpleLoader />
                :
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <ScrollArea className={`${props?.moduleId ? 'h-[420px]' : ""}`}>
                            <div className="grid md:grid-cols-2  gap-5 text-start mb-7 px-1 ">
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
                                            <FormLabel className=" md:text-xl text-lg font-bold">Title <span className=" ml-1 text-sm ">({createModuleDefaults?.titleMaxLength} charecters Max) </span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Eg. {Module 1} : Inroduction to the module"   {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className=" md:col-span-2" >
                                            <FormLabel className=" md:text-xl text-lg font-bold">Description <span className=" ml-1 text-sm ">({createModuleDefaults?.descriptionMaxLength} charecters Max) </span> </FormLabel>
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

                                {data ? <>
                                    <FormField
                                        control={form.control}
                                        name="durationInMin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className=" flex  items-center gap-2 md:text-xl text-lg font-bold">

                                                    Duration<span className="  text-sm ">(Mins)</span>

                                                    <TooltipWarpper text="This Indicates the approx time in which this module will be completed">
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
                                        name="introVideoType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className=" md:text-xl text-lg font-bold"> Video Type</FormLabel>

                                                <select  {...field} className="video-type-selection flex h-10 w-full rounded-md border border-input bg-regular px-3 py-2 text-base ring-offset-background  placeholder:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                                    <option value="">Select an option</option>
                                                    {Object.values(VideoTypesEnum).map((type, i) =>
                                                        <option key={i} value={type}>{type}</option>)}

                                                </select>

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
                                                    <FormLabel className=" md:text-xl text-lg font-bold"> Video Link <span className=" ml-1 text-sm ">(YouTube/Viemo)</span></FormLabel>
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
                                                videoUrl={data?.introVideoUrl}
                                                onRemoveVideo={onclickRemoveVideo}
                                                onChange={getIntroVideoUploadLink}
                                            />
                                        </div>
                                    </>}
                                </> : null}





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

export default CreateModuleForm