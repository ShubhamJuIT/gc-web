"use client"

import { User } from "@/app/data/_models/user"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { useState } from "react"
import { showErrorToast } from "@/app/data/error.manager"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useUserContext } from "@/app/contexts/userContext"
import { OrderingService } from "@/app/_services/lms/ordering.service"

const BuyThisCourse = (props: {
    courseId: string,
    btnText: string,
    variant: "default" | "link";
    isEnrolled?: boolean;
    salePrice?: number;

}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { toast } = useToast();
    const [tempId, setTempId] = useState<string>('');
    const { userData } = useUserContext();
    const router = useRouter();
    const onclickBuy = async () => {

        if (!User?.isLoggedIn()) {
            router.push('/auth/login');
            toast({
                title: "Please login!",

            })
            return;
        }


        setTempId(props.courseId);
        setLoading(true)
        try {
            const order = await OrderingService.createOrder({
                courseId: props.courseId,
            });
            router.push(`/checkout?id=${order?.id}`);

            setLoading(false);
            setTempId('');


        } catch (error) {
            showErrorToast(error);
            setLoading(false);
            setTempId('');

        }

    }




    const isLoading = loading && (tempId === props.courseId);

    const onClickViewCourse = () => {
        router.push(`/study-area/${props?.courseId}`);

    }





    return (
        <>
            {(props?.isEnrolled && userData) ? <Button name={props?.btnText} aria-label={props?.btnText}
                className={`${props?.variant === "link" ? "!p-0" : ""}`}
                variant={props?.variant} onClick={onClickViewCourse}>
                View Course
            </Button> :

                <Button name={props?.btnText} aria-label={props?.btnText}
                    className={`${props?.variant === "link" ? "!p-0" : ""}`}
                    variant={props?.variant} disabled={isLoading || !props?.salePrice} onClick={onclickBuy}>
                    {isLoading ? <Loader2 className=" h-4 w-4 animate-spin" /> : props?.btnText}
                </Button>}

        </>


    )
}

export default BuyThisCourse