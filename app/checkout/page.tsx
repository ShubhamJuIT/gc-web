
"use client"

import { useEffect, useState } from 'react';
import { OrderingService } from '../_services/lms/ordering.service';
import { showErrorToast } from '../data/error.manager';
import SimpleLoader from '@/components/simple-loader';
import { OrderDetailsModel } from '../data/_models/order.details.model';
import { User } from '../data/_models/user';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import DynamicImage from "@/components/dynamicImage";

const Checkout = ({
    searchParams,
}: {
    searchParams: {
        id: string
    },

}) => {
    const orderId = searchParams?.id;
    const [order, setOrder] = useState<OrderDetailsModel | null>(null);
    const [pageLoader, setPageLoader] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const { toast } = useToast();

    const getOrder = async (orderId: string) => {
        setPageLoader(true);
        try {
            const val = await OrderingService.getOrder(orderId);
            setOrder(val);

        } catch (error) {
            showErrorToast(error);
        } finally {
            setPageLoader(false);
        }

    }
    const completeCheckout = async () => {


        if (!order) {
            return;
        }

        setLoader(true);
        try {
            const paymentData = await OrderingService.initiatePayment({
                userId: order?.userId,
                orderId: order?.id,
                finalAmount: order?.orderDetails?.finalAmount,
                currency: 'usd',
                userName: order?.userName,
                emailId: order?.emailId,
                contactNumber: order?.contactNumber,
                description: order?.courseTitle,
                successUrl: '/payment-status',
                errorUrl: '/payment-status',
                pendingUrl: '/payment-status',

            });

            console.log(paymentData);



            if (paymentData.gateway === 'STRIPE' && paymentData?.stripe && paymentData?.stripe?.paymentUrl) {
                // Open the payment URL in same tab
                window.location.href = paymentData?.stripe?.paymentUrl;
            } else {
                toast({
                    variant: 'destructive',
                    title: "Something went wrong",
                    description: "Error while initiating payment. Please try again later."
                });
            }

        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Something went wrong",
                description: "Error while initiating payment. Please try again later."
            });
        } finally {
            setLoader(false);
        }

    }


    useEffect(() => {
        if (orderId && User?.isLoggedIn()) {
            getOrder(orderId)
        }

    }, [orderId])
    return (

        <>

            {pageLoader && <SimpleLoader wrapperClassName="!h-screen" />}
            {(!pageLoader && !order) && <div className="!h-screen no-data ">
                No information available
            </div>}

            {(!pageLoader && order) && <>
                <section>
                    <div className="bg-black text-white">
                        <div className="md:max-w-[1024px] mx-auto  pb-10  md:pt-32 pt-28 md:px-12 px-6">
                            <div className="grid md:grid-cols-3 md:gap-10">
                                <div className="md:col-span-2">
                                    <h2 className="text-primary md:text-3xl  text-2xl mb-6">Checkout</h2>
                                    <div className="mb-8 font-light">
                                        {/* <h3 className="text-xl  mb-4">Product</h3> */}
                                        <div className="flex md:flex-row flex-col justify-between md:items-center bg-regular/70  p-4 rounded-xl ">
                                            <div className="flex md:items-center  items-start gap-4  md:max-w-80">
                                                <div className=' w-16 h-16 flex-none md:mx-auto  rounded-xl overflow-hidden bg-regular'>
                                                    <DynamicImage
                                                        alt='Product Image'
                                                        src={'/svgs/image-placeholder.svg'}
                                                        fallbackImage='/svgs/image-placeholder.svg'
                                                    />

                                                </div>
                                                <div>
                                                    <p className=" two-line-sentence md:mb-0 mb-2 font-semibold ">{order?.courseTitle}</p>
                                                    <div className="md:hidden">
                                                        <p className="text-base  font-medium ">&#36;{order?.calculatedAmount}</p>
                                                        <p className=" line-through opacity-70 font-light text-sm">&#36;2,699</p>
                                                    </div>
                                                </div>



                                            </div>
                                            <div className="md:block hidden">
                                                <p className="text-lg  font-semibold ">&#36;{order?.calculatedAmount}</p>
                                                <p className=" line-through opacity-70 font-light text-sm">&#36;2,699</p>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                                <div>
                                    <h2 className="text-primary md:text-3xl text-2xl mb-6">Summary</h2>
                                    <div className="mb-8">
                                        <label htmlFor="coupon" className="block text-lg mb-2">Coupon Code</label>
                                        <div className=" flex items-center gap-3">
                                            <Input id="coupon" className=" rounded-r-none" />
                                            <Button className="rounded-l-none" >Apply</Button>
                                        </div>
                                    </div>

                                    <div className="mb-8 font-light">
                                        <p className="flex justify-between text-lg mb-2">Original Price: <span>&#36;{order?.orderDetails?.totalAmount}</span></p>
                                        <p className="flex justify-between text-lg mb-2">GST: <span>&#36;{order?.orderDetails?.gstAmount}</span></p>
                                        {order?.orderDetails?.discountAmount ? <p className="flex justify-between text-lg mb-2">Discount: <span>-&#36;{order?.orderDetails?.discountAmount}</span></p> : null}

                                        <hr className="border-gray-100/30 my-4" />
                                        <p className="flex justify-between text-xl font-semibold mb-4">Total: <span>&#36;{order?.orderDetails?.finalAmount}</span></p>
                                        <p className="text-sm text-white/70">By completing your purchase you agree to these <a href="#"
                                            className="text-primary underline">Terms of Service</a>.</p>
                                    </div>



                                    <Button disabled={loader} onClick={completeCheckout} className=" w-full">
                                        {loader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Complete Checkout</Button>

                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </>}



        </>

    )

}

export default Checkout