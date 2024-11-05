import { StudyAreaModel } from "@/app/data/_models/study.area.model"
import Image from "next/image"



const CertificateArea = (props: {
    data: StudyAreaModel

}) => {
    return (
        <>
            {/* {props?.activeItem?.certificateUrl ?
                <a title="Click to download" download rel="noopener noreferrer" target="_blank" href={props?.activeItem?.certificateUrl}>
                    <Image className=" mx-auto" width={787} height={561} src={props?.activeItem?.certificateUrl} alt="Certificate" />
                </a> :

                <div className=" no-data">
                    No certificate available
                </div>
            } */}



        </>
    )
}

export default CertificateArea