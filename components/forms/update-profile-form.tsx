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

import { Loader2 } from "lucide-react"

import { useToast } from "@/components/ui/use-toast"

import { profileFormSchema } from "@/lib/validation";
import { ScrollArea } from "../ui/scroll-area";
import { UserProfileService } from "@/app/_services/lms/user.profile.service";
import { showErrorToast } from "@/app/data/error.manager";
import { AuthService } from "@/app/_services/auth/auth.service";

const UpdateProfileForm = (props: {
    userData?: any,
    onSuccess: (data: any) => void,
    isMyProfile?: boolean
}) => {
    const { toast } = useToast();
    const [loader, setLoader] = useState(false);
    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: "",
            userName: "",
            contactNumber: "",
            password: "",
            emailId: "",


        },
    })

    async function onSubmit(values: z.infer<typeof profileFormSchema>) {


        if (!props?.userData && !values?.password) {
            form.setError('password', {
                type: 'manual',
                message: 'Password is required'
            });
            return;
        }

        const finalData = {
            ...values,
            ...(values?.password?.trim()?.length ? { confirmPassword: values.password } : {})
        };

        // Remove password if not needed
        if (!values?.password?.trim()?.length) {
            delete finalData.password;
        }
        //  This will be type-safe and validated due to zod.

        setLoader(true);
        try {

            let data;

            if (props?.isMyProfile) {
                data = await AuthService.updateMyProfile(finalData);
            } else {

                if (props?.userData) {
                    data = await AuthService.updateProfileByUserId(props?.userData?.userId, finalData);
                } else {
                    data = await UserProfileService.createMentor(finalData);
                }


            }



            props?.onSuccess(data);

            form.reset();
            toast({
                title: `${props?.userData ? 'Updated' : 'Created'} profile successfully`,


            })
            setLoader(false);




        } catch (error) {
            showErrorToast(error)
            setLoader(false);
        }
    }


    useEffect(() => {
        if (props?.userData) {
            form.reset(props?.userData);
        }
    }, [form, props?.userData])
    return (
        <>
            {props?.isMyProfile && <h2 className='mb-7  lg:text-4xl  text-3xl text-primary  font-bold  -tracking-[2.5px]'>General Information</h2>}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <ScrollArea className={props?.isMyProfile ? ' h-auto' : 'h-[320px]'}>
                        <div className="grid  lg:grid-cols-2 gap-5 text-start mb-7">

                            <FormField
                                control={form.control}
                                name="userName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" md:text-xl text-lg font-bold">Username</FormLabel>
                                        <FormControl>
                                            <Input   {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" md:text-xl text-lg font-bold">Full Name</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {props?.isMyProfile && <div className=" lg:col-span-2  mt-12">
                                <h2 className='  lg:text-4xl  text-3xl text-primary  font-bold  -tracking-[2.5px]'>Security</h2>


                            </div>}

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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" md:text-xl text-lg font-bold">Password</FormLabel>
                                        <FormControl>
                                            <Input type="password"  {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contactNumber"
                                render={({ field }) => (
                                    <FormItem className={`${props?.isMyProfile ? '' : 'lg:col-span-2'}`}>
                                        <FormLabel className=" md:text-xl text-lg font-bold">Mobile Number</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />







                        </div>
                    </ScrollArea>

                    <div className={`${props?.isMyProfile ? '' : "justify-end"} flex `}>
                        <Button disabled={loader} type="submit">
                            {loader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update </Button>
                    </div>

                </form>
            </Form>
        </>

    )
}

export default UpdateProfileForm