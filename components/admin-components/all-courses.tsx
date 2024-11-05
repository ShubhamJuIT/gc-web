"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getDateFromTimestamp } from '@/app/data/_helpers/date-methods'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CourseStatusEnum } from '@/app/data/_enums/course.status.enum'
import AlertDialogWrapper from "../alert-dialog-wrapper"
import ActionOnCourse from "../modal/action-on-course-modal"
import { CourseModel } from "@/app/data/_models/course/course.model"
import { usePathname, useRouter } from "next/navigation"
import SimpleLoader from "../simple-loader"
import { prepareSearchParamString, truncateString } from "@/app/data/_helpers/text-methods"
import Pagination from "../pagination"
import { Input } from "../ui/input"
import TooltipWarpper from "../tooltip-warpper"
import { CourseService } from "@/app/_services/lms/course.service"
import { useState } from "react"
import { showErrorToast } from "@/app/data/error.manager"
import { Check, Info, Loader2, Pencil, X } from "lucide-react"
import { useToast } from "../ui/use-toast"
import { Label } from "../ui/label"

interface AllCoursesProps {
    options: {
        q?: string,
        p?: string,
        ps?: string,
        st?: string,

    },
    loading: boolean,
    items: CourseModel[],
    totalSize: number,
    status: CourseStatusEnum,

}


const AllCourses = (props: AllCoursesProps) => {
    const { toast } = useToast()
    const router = useRouter();
    const pathname = usePathname();
    const [tempId, setTempId] = useState<string | null>(null);
    const [acceptLoader, setAcceptLoader] = useState<boolean>(false);
    const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
    const [featureLoader, setFeatureLoader] = useState<boolean>(false);
    const [priceLoader, setPriceLoader] = useState<boolean>(false);
    const [selectedCourse, setSelectedCourse] = useState<CourseModel | null>(null);




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

    const onCourseAction = () => {
        const paramString = prepareSearchParamString({
            ...props?.options,
            p: "1",
            q: "",

        })
        router.push(`${pathname}?${paramString}`)
        router.refresh()
    }

    const acceptCourse = async (courseId: string) => {
        setTempId(courseId);
        setAcceptLoader(true);
        try {

            await CourseService.acceptCourse(courseId);
            setAcceptLoader(false);
            setTempId(null);
            onCourseAction();

        } catch (error) {
            showErrorToast(error);
            setAcceptLoader(false);
            setTempId(null);

        }
    }


    const deleteCoursePermanently = async (courseId: string) => {
        setTempId(courseId);
        setDeleteLoader(true);
        try {
            await CourseService.deleteCoursePermanently(courseId);
            setDeleteLoader(false);
            setTempId(null);
            onCourseAction();
        } catch (error) {
            showErrorToast(error);
            setDeleteLoader(false);
            setTempId(null);
        }
    };


    const fetureThisCourse = async (courseId: string, isFeatured?: boolean) => {
        setTempId(courseId);
        setFeatureLoader(true);
        try {
            await CourseService.toggleFeatureCourse(courseId, isFeatured ? false : true);
            setFeatureLoader(false);
            setTempId(null);
            onCourseAction();
        } catch (error) {
            showErrorToast(error);
            setFeatureLoader(false);
            setTempId(null);
        }
    }

    const onClickEditPrice = (course: CourseModel) => {


        setSelectedCourse(course);

    }

    const onSavePrice = async () => {
        if (!selectedCourse?.basePrice || !selectedCourse?.salePrice || !selectedCourse?.id) {
            toast({
                title: "Price Required",
                description: "Price is required to update",
                variant: "destructive"
            })
            return;
        }
        setPriceLoader(true);

        try {
            await CourseService.updateCoursePrice(selectedCourse?.id, {
                basePrice: selectedCourse?.basePrice,
                salePrice: selectedCourse?.salePrice

            })

            toast({
                title: `Price Updated`,
                description: "Price has been updated successfully",

            })
            setPriceLoader(false);
            setSelectedCourse(null);

            router.refresh();
        } catch (error) {
            showErrorToast(error);
            setPriceLoader(false);


        }



    }
    const onCanclePriceEdit = () => {
        setSelectedCourse(null);
    }

    const onChangeBasePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const price = Number(event?.target?.value);

        const newObj = { ...selectedCourse, basePrice: price }

        setSelectedCourse(newObj as CourseModel);
    }

    const onChangeSalePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const price = Number(event?.target?.value);

        const newObj = { ...selectedCourse, salePrice: price }

        setSelectedCourse(newObj as CourseModel);

    }


    return (
        <div>
            <div className="mb-6 flex sm:flex-row flex-col justify-between flex-wrap sm:items-center gap-5">

                <h2 className="  text-xl font-semibold  "> {props?.status}</h2>
                <div className=" flex items-center sm:flex-row flex-col  gap-4">

                    <Input defaultValue={props?.options?.q} disabled={props?.loading} placeholder="Type and hit Enter..." className=" bg-background" onKeyDown={onSearch} />
                    {/* <Button className=" sm:w-auto w-full" variant='outline-secondary'>
                        Export
                    </Button> */}
                </div>
            </div>

            {props?.loading && <SimpleLoader />}

            {(!props?.loading && (!props?.items || props?.items?.length === 0)) && <div className='no-data'>
                No Courses Available

            </div>}



            {(!props?.loading && (props?.items && props?.items?.length > 0)) &&


                <Table className="text-nowrap">
                    <TableHeader>
                        <TableRow className="bg-secondary hover:bg-secondary/95 text-lg font-bold">
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            {props?.status === CourseStatusEnum.ALL && <TableHead>Price ($)</TableHead>}
                            <TableHead>Created By</TableHead>
                            {props?.status === CourseStatusEnum.REJECTED && <TableHead>Rejection Reason</TableHead>}
                            {props?.status === CourseStatusEnum.DELETED && <TableHead>Delete Reason</TableHead>}
                            {props?.status === CourseStatusEnum.ARCHIVED && <TableHead>Archive Reason</TableHead>}

                            <TableHead>Created At</TableHead>
                            <TableHead className=" text-end">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {props?.items?.map((course) => (
                            <TableRow key={course?.id}>
                                <TableCell>
                                    <Link href={`/admin/courses/${course?.id}`}>
                                        <p className=' text-base hover:text-primary '>{course?.title ?? "--"}</p>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <span className={`${course?.status?.toLowerCase()} course-status`}>
                                        {course?.status?.toLowerCase()}
                                    </span>

                                </TableCell>
                                {props?.status === CourseStatusEnum.ALL && <TableCell>

                                    <div className=" flex items-center gap-3">

                                        {selectedCourse?.id !== course?.id ?
                                            <>
                                                <Button onClick={() => onClickEditPrice(course)} title="Update Price" className=" flex-none w-7 h-7" size='icon' variant='outline'>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                {(course?.salePrice || course?.basePrice) ? <div className=" flex flex-col">
                                                    {course.salePrice ?
                                                        <p className=" text-lg font-semibold">
                                                            ${course?.salePrice}
                                                        </p> : null}

                                                    {course?.basePrice ? <p className=" line-through text-sm text-white/70">
                                                        ${course?.basePrice}
                                                    </p> : null}


                                                </div> : <p>Price Not Set</p>}



                                            </>
                                            :
                                            <div className=" flex items-center gap-3">
                                                <div className=" flex flex-col gap-3">
                                                    <div className="flex items-center gap-2">
                                                        <Label htmlFor="base-price" >Base Price</Label>
                                                        <TooltipWarpper text='Base Price is the price of course without any discount Eg. 499$'>
                                                            <Info className="h-4 w-4  text-white/70" />
                                                        </TooltipWarpper>
                                                    </div>

                                                    <Input defaultValue={selectedCourse?.basePrice} id="base-price" onChange={onChangeBasePrice} type="number" disabled={selectedCourse?.id !== course?.id} className="   min-w-32" />
                                                </div>
                                                <div className=" flex flex-col gap-3">

                                                    <div className="flex items-center gap-2">
                                                        <Label htmlFor="sale-price" >Sale Price</Label>
                                                        <TooltipWarpper text='Sale Price is the discounted price of the course Eg. $399'>
                                                            <Info className="h-4 w-4  text-white/70" />
                                                        </TooltipWarpper>

                                                    </div>

                                                    <Input defaultValue={selectedCourse?.salePrice} id="sale-price" onChange={onChangeSalePrice} type="number" disabled={selectedCourse?.id !== course?.id} className="  min-w-32" />
                                                </div>

                                                <div className=" flex items-center gap-3 mt-6">
                                                    <Button disabled={priceLoader && selectedCourse?.id === course?.id} onClick={onSavePrice} title="Save" className="  w-7 h-7" size='icon' variant='outline'>

                                                        {(priceLoader && selectedCourse?.id === course?.id) ? <Loader2 className=" h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                                    </Button>
                                                    <Button disabled={priceLoader && selectedCourse?.id === course?.id} onClick={onCanclePriceEdit} title="Cancel" className="  w-7 h-7" size='icon' variant='outline-secondary'>
                                                        <X className="h-4 w-4" />
                                                    </Button>

                                                </div>
                                            </div>
                                        }


                                    </div>



                                </TableCell>}
                                <TableCell>
                                    <Link href={`/admin/users/${course?.creatorId}?at=${course?.creatorRole}`}>
                                        <p className='hover:text-primary '>{course?.creatorName ?? "--"}</p>
                                    </Link>
                                </TableCell>
                                {props?.status === CourseStatusEnum.REJECTED && <TableCell>


                                    {course?.rejectReason ?
                                        <TooltipWarpper text={course?.rejectReason}>


                                            <span>
                                                {truncateString(course?.rejectReason, 20)}
                                            </span>

                                        </TooltipWarpper>

                                        : "--"}


                                </TableCell>}
                                {props?.status === CourseStatusEnum.DELETED && <TableCell>{course?.deleteReason ?? "--"}
                                    {course?.deleteReason ?
                                        <TooltipWarpper text={course?.deleteReason}>
                                            <span>
                                                {truncateString(course?.deleteReason, 20)}
                                            </span>

                                        </TooltipWarpper>
                                        : "--"}


                                </TableCell>}
                                {props?.status === CourseStatusEnum.ARCHIVED && <TableCell>
                                    {course?.archiveReason ?
                                        <TooltipWarpper text={course?.archiveReason}>
                                            <span>
                                                {truncateString(course?.archiveReason, 20)}
                                            </span>

                                        </TooltipWarpper>
                                        : "--"}

                                </TableCell>}
                                <TableCell>{getDateFromTimestamp(course?.createdAt)}</TableCell>
                                <TableCell>
                                    <div className="  flex items-center justify-end gap-4">
                                        {course?.status === CourseStatusEnum.PENDING && <>
                                            <AlertDialogWrapper actionText="Accept" onAction={() => acceptCourse(course?.id)} title="Are you sure about accepting?"
                                                description="You are about to accept this course?. It will be publicly available">
                                                <Button disabled={acceptLoader} size='sm' variant='outline' >
                                                    {(acceptLoader && tempId === course?.id) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                    Accept</Button>
                                            </AlertDialogWrapper>

                                            <ActionOnCourse courseId={course?.id} onSucessAction={onCourseAction} actionType="REJECT">
                                                <Button size='sm' variant='outline-secondary' >Reject</Button>
                                            </ActionOnCourse>



                                        </>}

                                        {(course?.status === CourseStatusEnum.PUBLISHED || course?.status === CourseStatusEnum.REJECTED)
                                            &&
                                            <>
                                                <ActionOnCourse courseId={course?.id} onSucessAction={onCourseAction} actionType="ARCHIVE">
                                                    <Button size='sm' variant='outline-warning' >Archived</Button>
                                                </ActionOnCourse>
                                                <ActionOnCourse courseId={course?.id} onSucessAction={onCourseAction} actionType="DELETE">
                                                    <Button size='sm' variant='outline-secondary' >Delete</Button>
                                                </ActionOnCourse>

                                            </>
                                        }


                                        {(course?.status === CourseStatusEnum.DELETED || course?.status === CourseStatusEnum.ARCHIVED) && <>

                                            <ActionOnCourse courseId={course?.id} onSucessAction={onCourseAction} actionType="RESTORE">
                                                <Button size='sm' variant='outline' >Restore</Button>
                                            </ActionOnCourse>


                                            {course?.status === CourseStatusEnum.DELETED && <AlertDialogWrapper actionText="Permanently Delete" onAction={() => deleteCoursePermanently(course?.id)}
                                                title="Are you sure about to deleting permanenetly?"
                                                description="You are about to delete this course permanenetly">
                                                <Button disabled={deleteLoader} size='sm' variant="outline-destructive"  >
                                                    {(deleteLoader && tempId === course?.id) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                    Permanently Delete</Button>
                                            </AlertDialogWrapper>}


                                        </>}

                                        {course?.status === CourseStatusEnum.DRAFT && <>No Action Required</>}
                                        {course?.status === CourseStatusEnum.PUBLISHED && <>
                                            <AlertDialogWrapper actionText={`${!course?.featured ? "Un-Feature" : "Feature"}`} onAction={() => fetureThisCourse(course?.id, course?.featured)}
                                                title={`Are you sure about to ${!course?.featured ? "un-feature" : "feature"}?`}
                                                description={`You are about to ${!course?.featured ? "un-feature" : "feature"}  this course. It will be ${!course?.featured ? 'removed from the' : "shown in"} the featured section`}
                                            >
                                                <Button disabled={featureLoader} variant={`${course?.featured ? "outline-info" : "info"}`} size='sm'>
                                                    {(featureLoader && tempId === course?.id) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                    {course?.featured ? "Feature" : "Un-Feature"}
                                                </Button>

                                            </AlertDialogWrapper>

                                        </>}



                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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

export default AllCourses