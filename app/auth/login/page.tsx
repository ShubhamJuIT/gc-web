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

import { createRef, useState } from "react"

import { Loader2 } from "lucide-react"
import Link from "next/link"
import { AuthService } from "@/app/_services/auth/auth.service";
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { loginFormSchema } from "@/lib/validation";
import { useUserContext } from "@/app/contexts/userContext";
import { showErrorToast } from "@/app/data/error.manager";
import { AccoutTypesEnum } from "@/app/data/_enums/account.types.enum";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
    const { toast } = useToast();
    const { loginHandler } = useUserContext();
    const [loader, setLoader] = useState(false);
    const router = useRouter();
    const recaptchaRef = createRef<any>();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {

            id: "",
            password: "",
            remember: true,

        },
    })

    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        // Execute the reCAPTCHA when the form is submitted



        const finalData = {
            id: values.id,
            password: values.password
        }

        //  This will be type-safe and validated due to zod.

        setLoader(true);
        try {

            const data = await AuthService.signIn(finalData);

            loginHandler(data);

            if (data?.accountType === AccoutTypesEnum.SUPER_ADMIN || data?.accountType === AccoutTypesEnum.ADMIN) {
                router.push("/admin/dashboard");

            } else if (data?.accountType === AccoutTypesEnum.MENTOR) {
                router.push('/my-courses');
            } else {
                router.push('/');
            }





            form.reset();
            toast({
                title: 'Welcome Back!',
                description: 'You have successfully logged in'

            })
            setLoader(false);




        } catch (error) {
            showErrorToast(error);
            setLoader(false);
        }
    }


    const onReCAPTCHAChange = (captchaCode: any) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
            return;
        }
        // Else reCAPTCHA was executed successfully so proceed with the 
        // alert
        console.log(`Hey, ${captchaCode}`);
        // Reset the reCAPTCHA so that it can be executed again if user 
        // submits another email.
        recaptchaRef.current.reset();
    }
    return (
        <>


            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <div className="grid  grid-cols-1 gap-5">
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="  md:text-xl text-lg font-bold">Email Address</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
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
                        <div className=" flex justify-between gap-4 items-center  text-sm font-normal leading-none">
                            <FormField
                                control={form.control}
                                name="remember"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                className=" border-foreground data-[state=checked]:border-primary"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel >
                                                Remember me
                                            </FormLabel>

                                        </div>
                                    </FormItem>
                                )}
                            />
                            <Link href="/">
                                Forgot password?
                            </Link>
                        </div>
                        <div className=" place-self-center  mt-8">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
                                onChange={onReCAPTCHAChange}
                            />
                            {/* <Image src='/svgs/captcha.svg' alt="captcha" width={280} height={59} /> */}
                        </div>
                        <div className=" flex md:flex-row flex-col justify-center lg:items-center gap-4 mb-5 ">
                            <Button disabled={loader} className=" md:w-auto w-full" type="submit">
                                {loader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Login</Button>
                            <Link href="/auth/signup">
                                <Button className=" md:w-auto w-full" type="button" variant='outline'>Signup</Button>
                            </Link>

                        </div>


                        <div className="flex items-center justify-center space-x-4">
                            <div className="h-0.5  bg-secondary w-1/4"></div>
                            <span className="text-sm ">Or login with</span>
                            <div className="h-0.5  bg-secondary w-1/4"></div>
                        </div>

                        <div className=" flex justify-center items-center gap-4">
                            <Button className=" hover:bg-white bg-white  rounded-lg  py-[18px] px-[45px]">
                                <Image src="/svgs/auth-fb.svg" alt="fb" width={20} height={20} />
                            </Button>
                            <Button className=" hover:bg-white bg-white  rounded-lg  py-[18px] px-[45px]">
                                <Image src="/svgs/auth-google.svg" alt="google" width={20} height={20} />
                            </Button>
                        </div>

                    </div>


                </form>
            </Form>

        </>


    )
}

export default Login