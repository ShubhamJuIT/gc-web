import Image from "next/image"
import { Button } from "./ui/button"

const CoursesBanner = () => {
    return (
        <section className="  lg:mb-20 md:mb-16 sm:mb-14 mb-12">
            <div className=" container">
                <div className="   lg:pt-24 pt-28">
                    <div className=" relative rounded-2xl overflow-hidden lg:p-11 md:p-8 p-6 course-banner-overlay">
                        <Image quality={80} className=" object-cover  -z-10" src='/images/courses/courses-banner.png' alt="course banner" fill />

                        <h1 className=" mb-3 lg:text-5xl text-4xl  font-bold  -tracking-[2.5px]"><span className=" text-secondary">Esports</span> <span className=" text-primary"> ACADEMY</span></h1>
                        <p className=" lg:mb-14 mb-8  lg:text-2xl text-xl font-light">Find what fascinates you as you explore these courses</p>
                        <Button size='md' >Sign Up</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CoursesBanner