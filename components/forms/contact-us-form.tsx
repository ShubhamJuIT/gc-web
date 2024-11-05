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

import { useState } from "react"

import { Loader2 } from "lucide-react"

import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "../ui/textarea"
import { contactUsformSchema } from "@/lib/validation";


const ContactUsForm = () => {
    const { toast } = useToast();
    const [loader, setLoader] = useState(false);
    const form = useForm<z.infer<typeof contactUsformSchema>>({
        resolver: zodResolver(contactUsformSchema),
        defaultValues: {
            fullName: "",
            contactNumber: "",
            message: "",
            emailId: "",


        },
    })

    async function onSubmit(values: z.infer<typeof contactUsformSchema>) {


        //  This will be type-safe and validated due to zod.

        setLoader(true);
        try {


            form.reset();
            toast({
                title: 'Your request has been submitted successfully',
                description: 'Someone from our team will get back to you soon.'

            })
            setLoader(false);




        } catch (error) {
            toast({
                variant: 'destructive',
                description: 'Unable to submit you request. Please try again later'
            });
            setLoader(false);
        }
    }
    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <div className="grid  grid-cols-1 gap-5 text-start">

                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" md:text-xl text-lg font-bold">Full Name</FormLabel>
                                <FormControl>
                                    <Input   {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="emailId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="  md:text-xl text-lg font-bold">Email Address</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contactNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" md:text-xl text-lg font-bold">Phone Number</FormLabel>
                                <FormControl>
                                    <Input   {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" md:text-xl text-lg font-bold">Message</FormLabel>
                                <FormControl>
                                    <Textarea

                                        className="  resize-none"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button disabled={loader} className=" w-full" type="submit">
                        {loader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit </Button>


                </div>


            </form>
        </Form>
    )
}

export default ContactUsForm