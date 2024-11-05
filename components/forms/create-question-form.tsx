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
import { useForm, useFieldArray } from "react-hook-form"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "../ui/textarea"

import { ScrollArea } from "@/components/ui/scroll-area"
import { QuestionTypesEnum } from "@/app/data/_enums/question.types.enum"
import { Checkbox } from "../ui/checkbox"
import TooltipWarpper from "../tooltip-warpper"
import { createQuestionDefaults, createQuestionFormSchema } from "@/lib/validation";
import { QuestionService } from "@/app/_services/lms/question.service";
import { QuestionWithOptionsModel } from "@/app/data/_models/course/question.with.options.model";
import { showErrorToast } from "@/app/data/error.manager";





const CreateQuestionForm = (props: {
    data?: QuestionWithOptionsModel,
    quizId: string,
    onSuccess: () => void
}) => {

    const { toast } = useToast();
    const [loader, setLoader] = useState(false);

    const form = useForm<z.infer<typeof createQuestionFormSchema>>({
        resolver: zodResolver(createQuestionFormSchema),
        defaultValues: {
            question: "",
            type: QuestionTypesEnum.MCQ,
            score: "0",
            wrongScore: "0",
            options: Array(createQuestionDefaults?.minOptionsLength).fill({ text: "", correct: false }),

        },
    });

    const { fields, append, remove, } = useFieldArray({
        control: form.control,
        name: "options",

    });



    async function onSubmit(values: z.infer<typeof createQuestionFormSchema>) {
        const finalData = {
            ...values,
            score: +values?.score,
            wrongScore: +values?.wrongScore,
        }
        let obs;
        if (props?.data?.id) {
            obs = QuestionService.updateQuestion(props?.data?.id, finalData);
        } else {
            obs = QuestionService.createQuestion(props?.quizId, finalData);
        }

        setLoader(true);
        try {

            await obs;
            form.reset();
            toast({ title: `Question ${props?.data ? 'Updated' : "Added"} ` });
            setLoader(false);
            props?.onSuccess();
        } catch (error) {
            showErrorToast(error);
            setLoader(false);
        }
    }


    useEffect(() => {
        console.log(props?.data);
        if (props?.data) {
            form.reset({
                question: props?.data?.question,
                type: props?.data?.type,
                score: String(props?.data?.score),
                wrongScore: String(props?.data?.wrongScore),
                options: props?.data?.options,
            });
        }
    }, [form, props?.data]);



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <ScrollArea className="h-[420px]">
                    <div className="grid md:grid-cols-2 gap-5 text-start mb-7 px-1">
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className=" md:col-span-2">
                                    <FormLabel className="md:text-xl text-lg font-bold">Question Type</FormLabel>
                                    <select {...field} className="video-type-selection flex h-10 w-full rounded-md border border-input bg-regular px-3 py-2 text-base ring-offset-background placeholder:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                        <option value="">Select an option</option>
                                        {Object.values(QuestionTypesEnum).map((type, i) =>
                                            <option key={i} value={type}>
                                                {type} {type === QuestionTypesEnum.MCQ ? "(Multiple Choice Question)" : "(Multiple Select Question)"}
                                            </option>
                                        )}
                                    </select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="score"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" md:text-xl text-lg font-bold">Score</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="wrongScore"

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" md:text-xl text-lg font-bold">Negative Marking</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="question"
                            render={({ field }) => (
                                <FormItem className=" md:col-span-2">
                                    <FormLabel className="md:text-xl text-lg font-bold">Question <span className="ml-1 text-sm">({createQuestionDefaults?.questionMaxLength} characters Max)</span></FormLabel>
                                    <FormControl>
                                        <Textarea cols={30} rows={4} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className=" md:col-span-2 space-y-4">
                            <h4 className=" text-xl font-bold text-secondary ">Options  <span className="ml-1 text-sm">(Minimum {createQuestionDefaults?.minOptionsLength} options)</span> </h4>

                            {fields?.map((field, index) => (
                                <FormField
                                    key={field.id}
                                    control={form.control}
                                    name={`options.${index}.text`}
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormControl>
                                                <div className="flex items-center gap-4">
                                                    {form.watch("type") === QuestionTypesEnum.MCQ ? (
                                                        <TooltipWarpper text="Select this as answer">
                                                            <div className="radio-button-container">
                                                                <input
                                                                    type="radio"
                                                                    name="correctOption"
                                                                    value={index}
                                                                    checked={form.watch(`options.${index}.correct`)}
                                                                    onChange={() => {
                                                                        fields.forEach((_, i) => form.setValue(`options.${i}.correct`, i === index));
                                                                    }}
                                                                />
                                                            </div>
                                                        </TooltipWarpper>


                                                    ) : (


                                                        <TooltipWarpper text="Select this as answer">
                                                            <div>
                                                                <Checkbox
                                                                    checked={form.watch(`options.${index}.correct`)}
                                                                    onCheckedChange={() => form.setValue(`options.${index}.correct`, !form.watch(`options.${index}.correct`))}
                                                                />
                                                            </div>

                                                        </TooltipWarpper>

                                                    )}
                                                    <Input placeholder={`Option ${index + 1} (Max ${createQuestionDefaults?.optionMaxLength} charecters)`} id={`options.${index}.text`}  {...field} />

                                                    <TooltipWarpper text={fields?.length <= createQuestionDefaults?.minOptionsLength ? `Minimum ${createQuestionDefaults?.minOptionsLength} options are mandatory` : 'Delete'}>
                                                        <div>
                                                            <Button disabled={fields?.length <= createQuestionDefaults?.minOptionsLength} type="button" className="  text-2xl" size='icon' variant="outline-destructive" onClick={() => remove(index)}>
                                                                <span>
                                                                    <i className=" icon-bin"></i>
                                                                </span>
                                                            </Button>
                                                        </div>
                                                    </TooltipWarpper>


                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}

                            <div className=" mt-3 space-y-3 ">
                                {form?.formState?.errors?.options && <FormMessage>{form?.formState?.errors?.options?.message}</FormMessage>}
                                <TooltipWarpper text="Add More Option">
                                    <Button size='sm' variant='outline-secondary' type="button" onClick={() => append({ text: "", correct: false })}>
                                        Add Option
                                    </Button>
                                </TooltipWarpper>

                            </div>
                        </div>



                    </div>
                </ScrollArea>

                <div className="flex justify-end">
                    <Button disabled={loader} type="submit">
                        {loader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default CreateQuestionForm;
