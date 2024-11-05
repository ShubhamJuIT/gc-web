import InputwithIcon from "./input-with-icon"
import Image from "next/image"
import Link from "next/link"
import { CourseModel } from "@/app/data/_models/course/course.model"
import DynamicImage from "./dynamicImage"
import { CourseService } from "@/app/_services/lms/course.service"
import CourseListPagination from "./course-list-pagination"
import CourseListPrice from "./course-list-price"


const CoursesList = async (props: {
    searchParams: {
        q: string,
        p: string,
    }
}) => {
    const finalData = {
        query: props?.searchParams?.q ?? "",
        page: props?.searchParams?.p ? (+props?.searchParams?.p - 1) : 0,
        pageSize: 10,
        sortBy: "createdAt",
        sortType: "DESC",

        //  status :"PUBLISHED"
    }

    const data: {
        array: CourseModel[],
        total: number
    } = await CourseService.findPagiatedPublicCoursesSSR(finalData);

    return (
        <section className=" lg:mb-20 md:mb-16 sm:mb-14 mb-12">


            <div className=" container max-w-7xl relative">

                <figure className=' -z-10 absolute lg:top-[18%] top-[21%]  lg:-left-[17%] -left-[5%] '>       <Image className=' lg:w-full w-1/2 h-full' width={256} height={257} src='/svgs/tl.svg' alt='bg design graphics' /></figure>
                <figure className=' -z-10 absolute lg:-top-[2%] lg:-right-[6%] md:-right-[10%] md:top-[1%] sm:-right-[20%] top-[5%] -right-[34%]'>            <Image className='lg:w-full w-1/2 h-full' width={197} height={200} src='/svgs/tr.svg' alt='bg design graphics' /></figure>
                <figure className=' -z-10 absolute bottom-[15%] lg:-left-[6%] -left-[1%]  '>            <Image className='  lg:w-full w-1/2 h-full' width={145} height={150} src='/svgs/bl.svg' alt='bg design graphics' /></figure>
                <figure className=' -z-10 absolute bottom-[22%] lg:-right-[12%] md:-right-[22%] -right-[41%] '>            <Image className=' lg:w-full w-1/2 h-full' width={238} height={238} src='/svgs/br.svg' alt='bg design graphics' /></figure>

                <div className="  max-w-96 mx-auto mb-7">

                    <InputwithIcon query={finalData?.query} />
                </div>

                {data?.array && data?.array?.length > 0 ? <div className=" space-y-7">
                    {data?.array?.map((item, index) => (
                        <div className=" grid  md:grid-cols-2 overflow-hidden rounded-2xl bg-regular" key={index}>

                            <DynamicImage
                                quality={90}
                                wrapperClassName="relative   pb-[60%]  "
                                alt={item?.title}
                                src={item?.thumbnailUrl ?? '/svgs/image-placeholder.svg'}
                                fallbackImage='/svgs/image-placeholder.svg'
                            />


                            <div className="  lg:px-9 md:px-8 px-6 lg:py-12 md:py-10 py-7 ">
                                <Link href={`/courses/${item?.id}`}>
                                    <h2 className=" hover:text-primary md:text-2xl  text-xl font-bold md:mb-5 mb-3">{item?.title ?? "--"}</h2>
                                </Link>


                                <p className=" text-base font-light opacity-70 mb-5">{item?.description ?? "--"}</p>

                                <div className=" flex items-center md:gap-7 gap-4 flex-wrap justify-between mb-10">
                                    <div className=" flex items-center gap-2">
                                        <Image width={45} height={45} src="/svgs/clock.svg" alt="clock" />
                                        <div>
                                            <p className="  text-base font-semibold">{item?.durationInMin ?? 0} Mins</p>
                                            <p className="  text-sm font-light opacity-70">On-demand videos</p>
                                        </div>
                                    </div>

                                    <div className=" flex items-center gap-2">
                                        <Image width={45} height={45} src="/svgs/doc.svg" alt="clock" />
                                        <p className="  text-base font-semibold">{item?.contents?.length ?? 0} Modules</p>

                                    </div>

                                    <div className=' flex items-start xl:justify-between gap-2'>

                                        <div className=' flex-none w-12 h-12 relative rounded-full overflow-hidden border border-gray-100/20'>
                                            <DynamicImage
                                                alt={item?.creatorName}
                                                src={'/svgs/user.svg'}
                                                fallbackImage='/svgs/user.svg'
                                            />

                                        </div>
                                        <div>
                                            <p className=' text-sm font-bold mb-1 one-line-sentence'>{item?.creatorName ?? "--"}</p>
                                            <p className=' opacity-50 text-xs one-line-sentence'>Instructor</p>
                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <CourseListPrice course={item} />
                                </div>

                            </div>
                        </div>
                    ))}
                </div> :
                    <div className=" !h-[80vh] no-data">
                        No courses found
                    </div>

                }

                <CourseListPagination
                    page={props?.searchParams?.p ? (+props?.searchParams?.p) : 1}
                    query={props?.searchParams?.q ?? ""}
                    totalSize={data?.total ?? 0}
                    pageSize={finalData?.pageSize}
                />



            </div>
        </section>
    )
}

export default CoursesList;