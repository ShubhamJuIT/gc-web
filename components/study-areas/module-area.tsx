import SpecialTitle from "../specialTitle"
import VideoPlayer from "../videoPlayer"
import { VideoTypesEnum } from "@/app/data/_enums/video.types.enum"
import { ModuleModel } from "@/app/data/_models/course/module.model"


const ModuleArea = (props: {
    data: ModuleModel

}) => {
    return (
        <>
            <div className=" grid md:grid-cols-2 items-center  gap-10 mb-14">
                <div >

                    <h1 className=" mb-3 lg:text-6xl md:text-5xl text-3xl font-bold text-secondary lg:-leading-[6px]">
                        <SpecialTitle
                            text={props?.data?.title}
                            className=""

                        />

                    </h1>
                    <p className=" lg:text-4xl md:text-3xl text-2xl   font-light">{props?.data?.description}</p>
                </div>
                <div  >

                    <VideoPlayer
                        src={props?.data?.introVideoType === VideoTypesEnum?.LINK ? props?.data?.introVideoLink : props?.data?.introVideoUrl}
                    />


                </div>
            </div>

        </>
    )
}

export default ModuleArea