
'use client'
import React, { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast';
import { OrderDetailsModel } from '../data/_models/order.details.model';
import { OrderingService } from '../_services/lms/ordering.service';
import { User } from '../data/_models/user';
import { PaymentStatusEnum } from '../data/_enums/paymentStatus.enum';

import { CheckCircle, ShieldX } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import SimpleLoader from '@/components/simple-loader';




const PaymentStatus = ({ searchParams }: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {

    const orderId = searchParams?.orderId as string;
    const [loader, setLoader] = useState(false);
    const [order, setOrder] = useState<OrderDetailsModel | null>(null)

    useEffect(() => {

        const findPayment = async (orderId: string) => {
            setLoader(true);


            try {
                const response = await OrderingService.getOrder(orderId);
                setOrder(response);
            } catch (error) {

                toast({
                    variant: 'destructive',
                    description: "Error, Please try again later",

                })

            } finally {
                setLoader(false);
            }
        };
        const isLoggedIn = User.isLoggedIn();
        if (orderId && isLoggedIn) {
            findPayment(orderId);
        }
    }, [orderId]);


    const isOrderSucess = order?.paymentStatus === PaymentStatusEnum.PURCHASED;


    return (

        <section >
            <div className="lg:py-32  pt-32 md:pb-10 pb-8 ">
                <div className=' container'>
                    {loader && <SimpleLoader />}
                    {(!loader && !order) && <div className="no-data">No Order found</div>}
                    {(!loader && order) && <div className="flex items-center justify-center  ">


                        <div className={`${isOrderSucess ? 'border-border' : "border-secondary"} p-8 md:max-w-2xl w-full  bg-background border  shadow-lg rounded-lg text-center`}>
                            {isOrderSucess ? (
                                <div>
                                    <CheckCircle className=" w-16 h-16 mx-auto mb-4  text-primary" />
                                    <h2 className="text-2xl font-bold  text-primary">Payment Successful</h2>
                                    <span className='  text-white/40 block text-sm '>Reference number : {order?.id}</span>
                                    <p className="mt-2  text-white/70">Thank you for your payment. Your transaction was successful.</p>
                                    <Link href='/account/courses' className={`${buttonVariants({ variant: "outline" })} mt-6`} >Go To Courses</Link>

                                </div>
                            ) : (
                                <div>
                                    <ShieldX className=" w-16 h-16 mx-auto mb-4 text-secondary" />

                                    <h2 className="text-2xl font-bold text-secondary">Payment Failed</h2>
                                    <span className='  text-white/40 block text-sm '>Reference number : {order?.id}</span>
                                    <p className="mt-2 text-white/70">Unfortunately, your payment could not be processed. Please try again later.</p>
                                    <Link href='/' className={`${buttonVariants({ variant: "outline-secondary" })} mt-6`} >Back To Home</Link>
                                </div>
                            )}
                        </div>


                    </div>}
                </div>
            </div>



        </section>

    )
}

export default PaymentStatus;

