'use client'
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import CourseProgress from "./course-progress"
import TooltipWarpper from "./tooltip-warpper"
import { CourseModel } from "@/app/data/_models/course/course.model"
import DynamicImage from "./dynamicImage"
import { underscoreCapitalise } from "@/app/data/_helpers/text-methods"
import { getDateFromTimestamp } from "@/app/data/_helpers/date-methods"

const CourseCard = (props: {
    item: CourseModel
    showLearnMore?: boolean,
    showProgress?: boolean,
    showEdit?: boolean,
}) => {
    return (
        <div className='p-4  h-full   rounded-2xl  bg-regular overflow-hidden  flex flex-col justify-between  '>


            <div className={`${(props.showLearnMore || props?.showEdit) ? "mb-6" : "mb-12"}  flex-grow`}>
                <div className='flex-none mb-5'>
                    <DynamicImage
                        wrapperClassName="relative h-[213px]  rounded-xl overflow-hidden"
                        alt={props?.item?.title}
                        src={props?.item?.thumbnailUrl ?? '/svgs/image-placeholder.svg'}
                        fallbackImage='/svgs/image-placeholder.svg'
                    />
                </div>


                <div className=" mb-2 flex items-start justify-between gap-3">
                    <p className=' font-semibold text-xl  two-line-sentence'>{props?.item?.title}</p>
                    {props?.showEdit &&

                        <TooltipWarpper text={`Course status is ${props?.item?.status?.toLowerCase()}`} >
                            <p className={` course-status ${props?.item?.status?.toLowerCase()}`}>
                                {underscoreCapitalise(props?.item?.status)}
                            </p>
                        </TooltipWarpper>}

                </div>


                <p className=' text-base opacity-50 two-line-sentence'>{props?.item?.description}</p>

                {props?.showEdit && <p className=" opacity-30  my-3 text-sm">{getDateFromTimestamp(props?.item?.createdAt)}</p>}

            </div>

            {props?.showEdit && <div className=" flex justify-end items-center gap-4 ">



                <Link href={`/my-courses/${props?.item?.id}`}>
                    <Button className=" font-normal" variant="outline">View</Button>
                </Link>
                <Link href={`/my-courses/${props?.item?.id}/edit`}>
                    <Button variant="outline-secondary">Edit</Button>
                </Link>


            </div >}

            {
                props?.showLearnMore && <div className=' flex xl:flex-row flex-col-reverse    justify-between xl:items-center gap-3 '>
                    <Link className='xl:w-auto w-full' href={`/courses/${props?.item?.id}`} aria-label={`Learn more about ${props?.item?.title}`}>
                        <Button size='md' className='text-sm xl:w-auto w-full'>
                            Learn More
                        </Button>
                    </Link>


                    <div className=' flex items-center xl:justify-between xl:gap-3 gap-5'>


                        <div className=' flex-none w-10 h-10 relative rounded-full border  border-gray-100/20 overflow-hidden'>
                            <DynamicImage
                                alt={props?.item?.creatorName}
                                src={'/svgs/user.svg'}
                                fallbackImage='/svgs/user.svg'
                            />

                        </div>

                        <div className="text-xs">
                            <p className='  font-bold one-line-sentence'>{props?.item?.creatorName ?? "--"}</p>
                            <p className=' opacity-50  one-line-sentence'>Instructor</p>
                        </div>

                    </div>
                </div>
            }

            {
                props?.showProgress &&
                <>

                    <div className=" flex justify-between items-center gap-5  mb-6">
                        <div className=" flex items-center gap-2 ">
                            <div className=" w-9 h-9">
                                <CourseProgress strokeWidth={15} value={props?.item?.progressPercentage ?? 0} />
                            </div>

                            <p className=" text-sm "><span className=" font-bold text-primary">{props?.item?.progressPercentage ?? 0}%</span> <span> Completed </span></p>
                        </div>
                        <div className=" flex items-center gap-2">
                            <Image width={35} height={35} src="/svgs/doc.svg" alt="clock" />
                            <p className="  text-sm font-semibold">{props?.item?.contents?.length ?? 0} Modules</p>

                        </div>
                    </div>

                    <div className=" flex justify-between items-center gap-5">

                        <div className=" flex items-start gap-2">
                            <Image width={35} height={35} src="/svgs/clock.svg" alt="clock" />
                            <div>
                                <p className="  text-sm font-semibold">{props?.item?.durationInMin ?? 0} Mins</p>
                                <p className="  text-xs font-light opacity-70">On-demand videos</p>
                            </div>
                        </div>




                        <Link href={`/study-area/${props?.item?.id}`}>

                            <Button>View  <Image width={24} height={24} src='/svgs/arrow-left-line.svg' className=" ml-1" alt="left arrow" /></Button>
                        </Link>
                    </div>
                </>
            }








        </div >
    )
}

export default CourseCard