"use client"

import { AuthService } from "@/app/_services/auth/auth.service";
import { AccoutTypesEnum } from "@/app/data/_enums/account.types.enum";
import { UserStatusEnum } from "@/app/data/_enums/user.status.enum";
import { prepareSearchParamString } from "@/app/data/_helpers/text-methods";
import { AdminUserModel } from "@/app/data/_models/admin/admin.user.model";
import { User } from "@/app/data/_models/user";
import { showErrorToast } from "@/app/data/error.manager";
import AllUsers from "@/components/admin-components/all-users";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const AdminUsersList = ({
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
    const [items, setItems] = useState<AdminUserModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalSize, setTotalSize] = useState<number>(0);
    const pageSize = "10";

    const router = useRouter();
    const pathname = usePathname();

    const fetchUsers = async (data: {
        q?: string,
        p?: string,
        ps?: string,
        at?: string,
        st?: string,
    }) => {



        const options = {
            query: data?.q,
            page: data?.p ? Number(data?.p) - 1 : 0,
            pageSize: data?.ps ? Number(data?.ps) : Number(pageSize),
            accountType: data?.at === AccoutTypesEnum.ALL ? undefined : data?.at,
            status: data?.st === UserStatusEnum.ALL ? undefined : data?.st,
            sortBy: "createdAt",
            sortType: "DESC"
        }
        setLoading(true)
        try {
            const response = await AuthService.findPagiatedAccounts(options);

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

            fetchUsers(searchParams)
        }
    }, [searchParams]);



    const onTabChange = (value: string) => {

        const paramString = prepareSearchParamString({

            q: "",
            p: "1",
            ps: pageSize,
            at: value,
            st: UserStatusEnum.ALL
        })

        router.push(`${pathname}?${paramString}`)

    }

    const options = {
        q: searchParams?.q ?? "",
        p: searchParams?.p ?? "1",
        ps: searchParams?.ps ?? pageSize,
        at: searchParams?.at ?? AccoutTypesEnum.ALL as string,
        st: searchParams?.st ?? UserStatusEnum.ALL as string
    }


    return (
        <section>
            <Tabs onValueChange={onTabChange} value={searchParams?.at ?? "ALL"}>
                <TabsList className=" mb-4 ">
                    <TabsTrigger value="ALL">All</TabsTrigger>
                    <TabsTrigger value="MENTOR">Mentor</TabsTrigger>
                    <TabsTrigger value="STUDENT">Students</TabsTrigger>

                </TabsList>
                <TabsContent value="ALL">
                    <AllUsers
                        options={options}
                        items={items}
                        loading={loading}
                        totalSize={totalSize}
                        accountType={AccoutTypesEnum.ALL}
                    />
                </TabsContent>
                <TabsContent value="MENTOR">
                    <AllUsers
                        options={options}
                        items={items}
                        loading={loading}
                        totalSize={totalSize}
                        accountType={AccoutTypesEnum.MENTOR}
                    />
                </TabsContent>
                <TabsContent value="STUDENT">
                    <AllUsers
                        options={options}
                        items={items}
                        loading={loading}
                        totalSize={totalSize}
                        accountType={AccoutTypesEnum.STUDENT}
                    />
                </TabsContent>



            </Tabs>
        </section>

    )
}

export default AdminUsersList