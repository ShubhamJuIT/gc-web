"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import DynamicImage from '@/components/dynamicImage'
import { getDateFromTimestamp } from '@/app/data/_helpers/date-methods'
import TooltipWarpper from "@/components/tooltip-warpper"
import { UserStatusEnum } from "@/app/data/_enums/user.status.enum"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AccoutTypesEnum } from "@/app/data/_enums/account.types.enum"
import { usePathname, useRouter, } from "next/navigation"
import { AdminUserModel } from "@/app/data/_models/admin/admin.user.model"

import { prepareSearchParamString } from "@/app/data/_helpers/text-methods"
import { Input } from "@/components/ui/input"
import Pagination from "@/components/pagination"
import UpdateProfileInfoModal from "@/components/modal/update-profile-info-modal"
import { Label } from "../ui/label"
import SimpleLoader from "../simple-loader"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,

} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { AuthService } from "@/app/_services/auth/auth.service"
import { showErrorToast } from "@/app/data/error.manager"
import { Loader2 } from "lucide-react"


interface AllUsersProps {
    options: {
        q?: string,
        p?: string,
        ps?: string,
        at?: string,
        st?: string,

    },
    loading: boolean,
    items: AdminUserModel[],
    totalSize: number,
    accountType: AccoutTypesEnum,

}

const AllUsers = (props: AllUsersProps) => {
    const [selectedUser, setSelectedUser] = useState<{ userId: number, status: UserStatusEnum } | null>(null);
    const [selectedRole, setSelectedRole] = useState<{ userId: number, role: AccoutTypesEnum } | null>(null);
    const [changeStatusLoader, setChangeStatusLoader] = useState<boolean>(false);
    const [changeRoleLoader, setChangeRoleLoader] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();


    const onChangeUserStatus = (val: string) => {

        const paramString = prepareSearchParamString({

            ...props?.options,
            p: "1",
            st: val

        })


        router.push(`${pathname}?${paramString}`)



    }


    const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const paramString = prepareSearchParamString({
                ...props?.options,
                q: (e.target as HTMLInputElement).value,
                p: "1",

            })

            router.push(`${pathname}?${paramString}`)


        }
    }



    const handlePageChange = async (pageNo: number) => {
        const paramString = prepareSearchParamString({
            ...props?.options,
            p: String(pageNo),

        })

        router.push(`${pathname}?${paramString}`)
    };



    const userStatusHandler = (val: string, userId: number) => {
        setSelectedUser({
            userId: userId,
            status: val as UserStatusEnum
        })
    }

    const onCreateMentor = () => {

        const paramString = prepareSearchParamString({
            ...props?.options,
            p: "1",
            q: "",
            st: UserStatusEnum?.ALL

        })



        router.push(`${pathname}?${paramString}`)
        router.refresh()
    }

    const handleUserStatus = async () => {
        if (!selectedUser) return;

        setChangeStatusLoader(true)
        try {
            const res = await AuthService.updateAccountStatus(selectedUser?.userId, selectedUser?.status);
            setChangeStatusLoader(false)
            setSelectedUser(null)
            router.refresh()

        } catch (error) {
            setChangeStatusLoader(false)
            showErrorToast(error)

        }

    }

    const changeUserRole = async () => {


        if (!selectedRole) return;

        setChangeRoleLoader(true)
        try {
            await AuthService.updateAccountType(selectedRole?.userId, selectedRole?.role);
            setChangeRoleLoader(false)
            setSelectedRole(null)
            router.refresh()

        } catch (error) {
            setChangeRoleLoader(false)
            showErrorToast(error)

        }


    }

    const userRoleHandler = (val: string, userId: number) => {
        setSelectedRole({
            userId: userId,
            role: val as AccoutTypesEnum
        })

    }

    return (
        <div>
            <div className="mb-2 flex sm:flex-row flex-col justify-between flex-wrap sm:items-center gap-5">

                <h2 className="text-xl font-semibold"> {props?.accountType === AccoutTypesEnum?.ALL ? "ALL Users" : props?.accountType}</h2>
                <div className="flex md:items-center sm:flex-row flex-col  gap-4">
                    {props?.accountType === AccoutTypesEnum.MENTOR &&
                        <UpdateProfileInfoModal onSuccess={onCreateMentor} title="Create Mentor ">
                            <Button disabled={props?.loading} variant='outline'>
                                Create Mentor
                            </Button>
                        </UpdateProfileInfoModal>}
                    {/* <Button disabled={props?.loading} className=" sm:w-auto w-full" variant='outline-secondary'>
                        Export
                    </Button> */}

                </div>



            </div>


            <div className=" mb-6 flex md:items-center sm:flex-row flex-col  gap-4">
                <div className=" space-y-2">
                    <Label>Search</Label>
                    <Input defaultValue={props?.options?.q} disabled={props?.loading} placeholder="Type and hit Enter..." className=" bg-background" onKeyDown={onSearch} />
                </div>


                <div className=" space-y-2">
                    <Label>Status</Label>
                    <Select value={props?.options?.st} disabled={props?.loading} onValueChange={onChangeUserStatus}>
                        <SelectTrigger className="sm:w-[180px] w-full">
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(UserStatusEnum).map((val, i) =>
                                <SelectItem key={i} value={val}>
                                    {val}
                                </SelectItem>
                            )}


                        </SelectContent>
                    </Select>
                </div>


            </div>

            {props?.loading && <SimpleLoader />}

            {(!props?.loading && (!props?.items || props?.items?.length === 0)) && <div className='no-data'>
                No Users Available

            </div>}



            {(!props?.loading && (props?.items && props?.items?.length > 0)) &&
                <>
                    <Table className="text-nowrap ">
                        <TableHeader>
                            <TableRow className="bg-secondary hover:bg-secondary/95 text-lg font-bold">
                                <TableHead>Name</TableHead>
                                <TableHead>Account Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Change Role</TableHead>
                                <TableHead>Action</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {props?.items?.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-start gap-2">
                                            <div>
                                                <div className='w-10 h-10 flex-none mx-auto rounded-full overflow-hidden bg-regular'>
                                                    <DynamicImage
                                                        alt={user.name}
                                                        src={user.profileImageUrl ?? '/svgs/user.svg'}
                                                        fallbackImage='/svgs/user.svg'
                                                    />
                                                </div>
                                            </div>


                                            <div>
                                                {(user?.accountType === AccoutTypesEnum.STUDENT || user?.accountType === AccoutTypesEnum?.MENTOR)
                                                    ?
                                                    <Link href={`/admin/users/${user?.userId}?at=${user?.accountType}`}>
                                                        <p className=' hover:text-primary text-lg mb-1'>{user?.name}</p>
                                                    </Link>

                                                    : <p className='  text-lg mb-1'>{user?.name}</p>
                                                }



                                                <p className='text-white/70'>{user?.emailId}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className=" flex items-center gap-2">

                                            <TooltipWarpper text={`Status of user is ${user?.status}`}>
                                                <div className={` user-status ${user?.status?.toLowerCase()} `}></div>
                                            </TooltipWarpper>
                                            {user?.accountType}

                                        </div>
                                    </TableCell>
                                    <TableCell>



                                        <Select value={user.status} onValueChange={(val) => userStatusHandler(val, user?.userId)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(UserStatusEnum).filter(val => val !== UserStatusEnum?.ALL).map((val, i) =>
                                                    <SelectItem key={i} value={val}>
                                                        {val}
                                                    </SelectItem>)}


                                            </SelectContent>
                                        </Select>

                                        <AlertDialog open={selectedUser ? true : false} >
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        You are about to change status of user to <b className=" text-foreground opacity-100">{selectedUser?.status}</b>
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel disabled={changeStatusLoader} onClick={() => setSelectedUser(null)}>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction disabled={changeStatusLoader} onClick={handleUserStatus} >
                                                        {changeStatusLoader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                        Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                    </TableCell>
                                    <TableCell>{user.createdAt ? getDateFromTimestamp(user.createdAt) : "--"}</TableCell>
                                    <TableCell>
                                        {user?.accountType !== AccoutTypesEnum?.SUPER_ADMIN ? <>
                                            <Select value={user.accountType} onValueChange={(val) => userRoleHandler(val, user?.userId)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ADMIN" >
                                                        Admin
                                                    </SelectItem>
                                                    <SelectItem value="MENTOR" >
                                                        Mentor
                                                    </SelectItem>
                                                    <SelectItem value="STUDENT" >
                                                        Student
                                                    </SelectItem>

                                                </SelectContent>
                                            </Select>


                                            <AlertDialog open={selectedRole ? true : false} >
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            You are about to change role of user to <b className=" text-foreground opacity-100">{selectedRole?.role}</b>
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel disabled={changeRoleLoader} onClick={() => setSelectedRole(null)}>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction disabled={changeRoleLoader} onClick={changeUserRole} >
                                                            {changeRoleLoader && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                            Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

                                        </> : "--"}


                                    </TableCell>
                                    <TableCell>
                                        <div className=" flex items-center gap-3">

                                            {(user?.accountType === AccoutTypesEnum.STUDENT || user?.accountType === AccoutTypesEnum?.MENTOR)
                                                ?
                                                <Link href={`/admin/users/${user?.userId}?at=${user?.accountType}`}>
                                                    <Button size='sm' variant='outline-secondary'>
                                                        View
                                                    </Button>
                                                </Link>

                                                : null
                                            }


                                        </div>

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
                    currentPage={Number(props?.options?.p)}
                    totalPages={Math.ceil(props?.totalSize / Number(props?.options?.ps))} />
            </div>

        </div>

    )
}

export default AllUsers