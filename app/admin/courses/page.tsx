
"use client"
import { CourseService } from "@/app/_services/lms/course.service";
import { CourseStatusEnum } from "@/app/data/_enums/course.status.enum";
import { prepareSearchParamString } from "@/app/data/_helpers/text-methods";
import { CourseModel } from "@/app/data/_models/course/course.model";
import { User } from "@/app/data/_models/user";
import { showErrorToast } from "@/app/data/error.manager";
import AllCourses from "@/components/admin-components/all-courses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";




const AdminCourses = ({
    searchParams,
}: {
    searchParams: {
        q?: string,
        p?: string,
        ps?: string,
        st?: string,

    },
}) => {


    const [items, setItems] = useState<CourseModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalSize, setTotalSize] = useState<number>(0);
    const pageSize = "10";

    const router = useRouter();
    const pathname = usePathname();

    const fetchCourses = async (data: {
        q?: string,
        p?: string,
        ps?: string,
        st?: string,
    }) => {



        const options = {
            query: data?.q,
            page: data?.p ? Number(data?.p) - 1 : 0,
            pageSize: data?.ps ? Number(data?.ps) : Number(pageSize),
            status: data?.st === CourseStatusEnum.ALL ? undefined : data?.st,
            sortBy: "updatedAt",
            sortType: "DESC"
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



    const onTabChange = (value: string) => {

        const paramString = prepareSearchParamString({

            q: "",
            p: "1",
            ps: pageSize,
            st: value
        })

        router.push(`${pathname}?${paramString}`)

    }

    const options = {
        q: searchParams?.q ?? "",
        p: searchParams?.p ?? "1",
        ps: searchParams?.ps ?? pageSize,
        st: searchParams?.st ?? CourseStatusEnum.ALL
    }

    return (
        <section>

            <Tabs onValueChange={onTabChange} value={searchParams?.st ?? "ALL"}>
                <TabsList className=" mb-4 ">
                    <TabsTrigger value="ALL">All</TabsTrigger>
                    <TabsTrigger value="DRAFT">Draft</TabsTrigger>
                    <TabsTrigger value="PENDING">Pending</TabsTrigger>
                    <TabsTrigger value="PUBLISHED">Published</TabsTrigger>
                    <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
                    <TabsTrigger value="DELETED">Deleted</TabsTrigger>
                    <TabsTrigger value="ARCHIVED">Archived</TabsTrigger>
                </TabsList>
                <TabsContent value="ALL">
                    <AllCourses
                        options={options}
                        items={items}
                        loading={loading}
                        totalSize={totalSize}
                        status={CourseStatusEnum.ALL} />
                </TabsContent>
                <TabsContent value="DRAFT">
                    <AllCourses
                        options={options}
                        items={items}
                        loading={loading}
                        totalSize={totalSize}
                        status={CourseStatusEnum.DRAFT} />
                </TabsContent>
                <TabsContent value="PENDING">
                    <AllCourses
                        options={options}
                        items={items}
                        loading={loading}
                        totalSize={totalSize}
                        status={CourseStatusEnum.PENDING} />
                </TabsContent>
                <TabsContent value="PUBLISHED">
                    <AllCourses
                        options={options}
                        items={items}
                        loading={loading}
                        totalSize={totalSize}
                        status={CourseStatusEnum.PUBLISHED} />
                </TabsContent>
                <TabsContent value="REJECTED">
                    <AllCourses
                        options={options}
                        items={items}
                        loading={loading}
                        totalSize={totalSize}
                        status={CourseStatusEnum.REJECTED} />
                </TabsContent>
                <TabsContent value="DELETED">
                    <AllCourses
                        options={options}
                        items={items}
                        loading={loading}
                        totalSize={totalSize}
                        status={CourseStatusEnum.DELETED} />
                </TabsContent>
                <TabsContent value="ARCHIVED">
                    <AllCourses
                        options={options}
                        items={items}
                        loading={loading}
                        totalSize={totalSize}
                        status={CourseStatusEnum.ARCHIVED} />
                </TabsContent>



            </Tabs>

        </section>
    )
}

export default AdminCourses
