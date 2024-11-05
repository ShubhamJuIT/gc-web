"use client"
import { Button } from "@/components/ui/button"
import CourseCard from "@/components/course-card";
import CreateCourseModal from "@/components/modal/create-course-modal";
import { showErrorToast } from "../data/error.manager";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CourseService } from "../_services/lms/course.service";
import { User } from "../data/_models/user";
import { prepareSearchParamString } from "../data/_helpers/text-methods";
import Pagination from "@/components/pagination";
import { CourseModel } from "../data/_models/course/course.model";
import SimpleLoader from "@/components/simple-loader";
import { Input } from "@/components/ui/input";



const MyCourses = (
    {
        searchParams,
    }: {
        searchParams: {
            q?: string,
            p?: string,
            at?: string,
            st?: string,

        },
    }
) => {
    const [items, setItems] = useState<CourseModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalSize, setTotalSize] = useState<number>(0);
    const pageSize = "10";

    const router = useRouter();
    const pathname = usePathname();

    const fetchCourses = async (data: {
        q?: string,
        p?: string,
        st?: string,
    }) => {



        const options = {
            query: data?.q ?? "",
            page: data?.p ? Number(data?.p) - 1 : 0,
            pageSize: Number(pageSize),
            sortBy: "updatedAt",
            sortType: "DESC",
            userId: User?.getUserId(),
        }
        setLoading(true)
        try {
            const response = await CourseService.findPagiatedCourses(options);

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

            fetchCourses(searchParams)
        }
    }, [searchParams]);


    const handlePageChange = async (pageNo: number) => {
        const paramString = prepareSearchParamString({
            ...searchParams,
            p: String(pageNo),

        })

        router.push(`${pathname}?${paramString}`)
    };

    const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const paramString = prepareSearchParamString({
                ...searchParams,
                q: (e.target as HTMLInputElement).value,
                p: "1",

            })

            router.push(`${pathname}?${paramString}`)


        }
    }


    return (
        <section className="lg:mb-20 md:mb-16 sm:mb-14 mb-12" >

            <div className="container">
                <div className='md:pt-32  pt-28   '>
                    <div className="  mb-7  ">
                        <div className=" flex items-center justify-between gap-5 ">
                            <h1 className="  xl:text-4xl text-3xl   text-secondary font-semibold text-center">My Courses</h1>

                            <div className="flex items-center gap-5">
                                <Input defaultValue={searchParams?.q} disabled={loading} placeholder="Type and hit Enter..." className=" bg-background" onKeyDown={onSearch} />
                                <CreateCourseModal>
                                    <Button variant="outline-secondary">Create</Button>
                                </CreateCourseModal>
                            </div>


                        </div>

                    </div>

                    {loading && <SimpleLoader />}

                    {(!loading && (!items || items?.length === 0)) && <div className=" no-data">

                        <p className="text-center text-lg font-semibold">
                            No courses found. Create a course to get started.
                        </p>

                    </div>}

                    {(!loading && (items && items?.length > 0)) &&

                        <div className=' grid  md:grid-cols-3 sm:grid-cols-2  gap-7'>
                            {items?.map((item, i) => <CourseCard showEdit={true} key={i} item={item} />)}
                        </div>

                    }


                    <div className=" mt-5">
                        <Pagination
                            onPageChange={handlePageChange}
                            currentPage={Number(searchParams?.p ?? 1)}
                            totalPages={Math.ceil(totalSize / Number(pageSize))} />
                    </div>


                </div>

            </div>

        </section>
    )
}

export default MyCourses