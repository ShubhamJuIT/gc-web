

import CourseDetailsModules from "@/components/course-details-modules";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/videoPlayer";
import Image from "next/image";
import TooltipWarpper from "./tooltip-warpper";
import Link from "next/link";
import { CourseModel } from "@/app/data/_models/course/course.model";
import { VideoTypesEnum } from "@/app/data/_enums/video.types.enum";
import { underscoreCapitalise } from "@/app/data/_helpers/text-methods";
import DynamicImage from "./dynamicImage";
import BuyThisCourse from "./buy-this-course";
import CourseDetailsPrice from "./course-details-price";


const ViewCourseUi = (props: {
    showBuyNow?: boolean,
    showEdit?: boolean,
    data: CourseModel
}) => {
    return (
        <div>

            <div className=" grid md:grid-cols-2  gap-10  lg:mb-24 md:mb-20 mb-16">
                <div className=" place-self-center">
                    <h1 className=" lg:mb-8 md:mb-6 mb-4 lg:text-6xl md:text-5xl text-4xl  font-semibold lg:-tracking-[5px] text-secondary">
                        {props?.data?.title ?? "--"}
                    </h1>
                    <p className=" lg:mb-12 md:mb-10 mb-8   lg:text-2xl lg:leading-[30px]  text-xl   font-light">{
                        props?.data?.description ?? "--"}</p>

                    <div className="  grid sm:grid-cols-2 md:gap-10    gap-6  lg:text-xl md:text-lg text-base
">
                        <div className=" flex items-center gap-3">
                            <Image width={45} height={45} src="/svgs/clock.svg" alt="clock" />
                            <div>
                                <p className="   font-semibold">{props?.data?.durationInMin ?? 0} Mins</p>
                                <p className="     font-light opacity-70">On-demand videos</p>
                            </div>
                        </div>

                        <div>
                            <div className=' flex items-start  gap-3'>


                                <div className=' flex-none w-12 h-12 relative rounded-full overflow-hidden border border-gray-100/20 bg-regular'>
                                    <DynamicImage
                                        alt={props?.data?.creatorName}
                                        src={'/svgs/user.svg'}
                                        fallbackImage='/svgs/user.svg'
                                    />

                                </div>
                                <div>
                                    <p className='  font-bold mb-1 one-line-sentence'>{props?.data?.creatorName ?? "--"}</p>
                                    <p className='   font-light opacity-70 one-line-sentence'>Instructor</p>
                                </div>

                            </div>
                        </div>


                        <div className=" flex items-center gap-3">
                            <Image width={45} height={45} src="/svgs/doc.svg" alt="clock" />
                            <p className="   font-light opacity-70">{props?.data?.contents?.length ?? 0} Modules</p>

                        </div>


                        <div className=" flex items-center gap-3">
                            <Image width={45} height={45} src="/svgs/trophy.svg" alt="clock" />
                            <p className="  font-light opacity-70">Certificate of Completion</p>

                        </div>
                    </div>

                </div>
                <div  >



                    <VideoPlayer
                        src={props?.data?.introVideoType === VideoTypesEnum.LINK ? props?.data?.introVideoLink : props?.data?.introVideoUrl}
                    />

                </div>


                {props?.showEdit &&
                    <div className=" flex items-center gap-3 mt-4">
                        <Link href={`/my-courses/${props?.data?.id}/edit`}>
                            <Button>Edit course</Button></Link>

                        <TooltipWarpper text={`Course status is draft`} >
                            <p className={`${props?.data?.status?.toLowerCase()} course-status`}>
                                {underscoreCapitalise(props?.data?.status)}
                            </p>
                        </TooltipWarpper>
                    </div>
                }
            </div>



            {(props?.data?.contents && props?.data?.contents.length > 0) && <div className=" mb-10">
                <h3 className=" lg:mb-8 md:mb-6 mb-4 lg:text-6xl md:text-5xl text-4xl  font-semibold lg:-tracking-[5px] text-secondary">
                    Modules
                </h3>
                <CourseDetailsModules data={props?.data?.contents} />
            </div>}
            {props?.showBuyNow &&
                <div>
                    <CourseDetailsPrice course={props?.data} isCourseViewPage={true} />
                </div>}





        </div>

    )
}

export default ViewCourseUi