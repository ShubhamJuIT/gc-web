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
import Link from "next/link"

import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { signupFormSchema } from "@/lib/validation";
import { AuthService } from "@/app/_services/auth/auth.service";
import { showErrorToast } from "@/app/data/error.manager";
import { useUserContext } from "@/app/contexts/userContext";


const Signup = () => {
    const { toast } = useToast();
    const { loginHandler } = useUserContext();
    const [loader, setLoader] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            userName: "",
            emailId: "",
            password: "",
            agreeTerms: true,

        },
    })

    async function onSubmit(values: z.infer<typeof signupFormSchema>) {

        const finalData = {
            ...values,
            confirmPassword: values.password
        }
        //  This will be type-safe and validated due to zod.

        setLoader(true);
        try {

            const data = await AuthService.signup(finalData);
            loginHandler(data);

            router.push('/');
            form.reset();
            toast({
                title: 'Welcome',
                description: 'You have successfully registered'

            })
            setLoader(false);




        } catch (error) {
            showErrorToast(error);
            setLoader(false);
        }
    }

    return (
        <>


            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <div className="grid  grid-cols-1 gap-5">
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
                            name="userName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="  md:text-xl text-lg font-bold">Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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
                                    <FormLabel className=" md:text-xl text-lg font-bold">Create Password</FormLabel>
                                    <FormControl>
                                        <Input type="password"  {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=" flex  justify-center items-center  ">

                            <FormField
                                control={form.control}
                                name="agreeTerms"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                className=" border-foreground data-[state=checked]:border-primary"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none text-sm">
                                            <FormLabel >
                                                I agree to the <Link href='/' className=" text-primary ">Terms & Conditions</Link>
                                            </FormLabel>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className=" flex md:flex-row flex-col justify-center lg:items-center gap-4  my-5">
                            <Button disabled={loader} className=" md:w-auto w-full" type="submit">
                                {loader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Signup</Button>
                            <Link href="/auth/login">
                                <Button className=" md:w-auto w-full" type="button" variant='outline'>Login</Button>
                            </Link>

                        </div>


                        <div className="flex items-center justify-center space-x-4">
                            <div className="h-0.5  bg-secondary w-1/4"></div>
                            <span className="text-sm ">Or register with</span>
                            <div className="h-0.5  bg-secondary w-1/4"></div>
                        </div>

                        <div className=" flex justify-center items-center gap-4">
                            <Button className=" bg-white hover:bg-white  rounded-lg  py-[18px] px-[45px]">
                                <Image src="/svgs/auth-fb.svg" alt="fb" width={20} height={20} />
                            </Button>
                            <Button className=" bg-white hover:bg-white   rounded-lg  py-[18px] px-[45px]">
                                <Image src="/svgs/auth-google.svg" alt="google" width={20} height={20} />
                            </Button>
                        </div>

                    </div>


                </form>
            </Form>

        </>


    )
}

export default Signup