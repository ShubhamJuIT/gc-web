"use client"

import { OrderingService } from "@/app/_services/lms/ordering.service";
import { prepareSearchParamString } from "@/app/data/_helpers/text-methods";
import { User } from "@/app/data/_models/user";
import { showErrorToast } from "@/app/data/error.manager";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import { Input } from "@/components/ui/input"
import Pagination from "@/components/pagination"

import SimpleLoader from "@/components/simple-loader";
import { OrderDetailsModel } from "@/app/data/_models/order.details.model";
import Link from "next/link";


const AdminOrdersList = ({
    searchParams,
}: {
    searchParams: {
        q?: string,
        p?: string,
        ps?: string,
        at?: string,
        st?: string,

    },
}) => {
    const [items, setItems] = useState<OrderDetailsModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalSize, setTotalSize] = useState<number>(0);
    const pageSize = "10";

    const router = useRouter();
    const pathname = usePathname();

    const fetchOrders = async (data: {
        q?: string,
        p?: string,
        ps?: string,
    }) => {



        const options = {
            query: data?.q,
            page: data?.p ? Number(data?.p) - 1 : 0,
            pageSize: data?.ps ? Number(data?.ps) : Number(pageSize),
            sortBy: "createdAt",
            sortType: "DESC"
        }
        setLoading(true)
        try {
            const response = await OrderingService.findPagiatedOrders(options);

            setItems(response?.array);
            setTotalSize(response?.total);
            setLoading(false);





        } catch (error) {
            showErrorToast(error)
            setLoading(false)
        }

    }

    useEffect(() => {




        if (User?.isLoggedIn()) {

            fetchOrders(searchParams)
        }
    }, [searchParams]);





    const options = {
        q: searchParams?.q ?? "",
        p: searchParams?.p ?? "1",
        ps: searchParams?.ps ?? pageSize,
    }

    const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const paramString = prepareSearchParamString({
                ...options,
                q: (e.target as HTMLInputElement).value,
                p: "1",

            })

            router.push(`${pathname}?${paramString}`)


        }
    }



    const handlePageChange = async (pageNo: number) => {
        const paramString = prepareSearchParamString({
            ...options,
            p: String(pageNo),

        })

        router.push(`${pathname}?${paramString}`)
    };


    return (
        <section>
            <div>
                <div className="mb-6 flex sm:flex-row flex-col justify-between  sm:items-center gap-5">

                    <h2 className="text-xl font-semibold"> Orders</h2>
                    <div>

                        <Input defaultValue={options?.q} disabled={loading} placeholder="Type and hit Enter..." className=" bg-background" onKeyDown={onSearch} />
                    </div>

                </div>




                {loading && <SimpleLoader />}

                {(!loading && (!items || items?.length === 0)) && <div className='no-data'>
                    No Orders Available

                </div>}



                {(!loading && (items && items?.length > 0)) &&
                    <>
                        <Table className="text-nowrap">
                            <TableHeader>
                                <TableRow className="bg-secondary hover:bg-secondary/95 text-lg font-bold">
                                    <TableHead>#Order Id</TableHead>
                                    <TableHead>User Name</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Order Status</TableHead>
                                    <TableHead>Contact Number</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Course</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody className=" text-base">
                                {items?.map((item: OrderDetailsModel) => (
                                    <TableRow key={item?.id}>
                                        <TableCell>{item?.id}</TableCell>
                                        <TableCell>{item?.userName ?? "--"}</TableCell>
                                        <TableCell>${item?.orderDetails.finalAmount ?? "--"}</TableCell>
                                        <TableCell>{item?.orderStatus ?? "--"}</TableCell>
                                        <TableCell>{item?.contactNumber ?? "--"}</TableCell>
                                        <TableCell>{item?.emailId ?? "--"}</TableCell>
                                        <TableCell>

                                            <Link href={`/admin/courses/${item?.courseId}`}>
                                                <p className='hover:text-primary '>{item?.courseTitle ?? "--"}</p>
                                            </Link>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>



                    </>



                }

                <div className=" mt-5">
                    <Pagination
                        isSticky={true}
                        onPageChange={handlePageChange}
                        currentPage={Number(options?.p)}
                        totalPages={Math.ceil(totalSize / Number(options?.ps))} />
                </div>

            </div>
        </section>

    )
}

export default AdminOrdersList