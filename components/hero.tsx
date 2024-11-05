import Image from "next/image"

const Hero = () => {
    return (
        <section >
            <div className=" hero-overlay-b relative  lg:h-[800px] md:h-[600px] sm:h-[400px] h-96">
                <Image quality={90} className=" object-cover -z-10" fill src='/images/hero-img.png' alt="Guy wearing headphone and playing game" />
                <div className=" container h-full  relative  ">
                    <div className="hero-overlay-r -z-10 absolute top-0 left-0 bottom-0 right-0"></div>
                    <div className=" grid md:grid-cols-12 h-full  items-center  sm:pt-0 pt-10">
                        <div className=" md:col-span-5 ">
                            <h1 className="  md:text-8xl sm:text-6xl text-5xl mb-2">
                                <span className=" font-light  text-secondary">Gaming</span>
                                <br />
                                <span className="  font-bold text-primary">
                                    ACADEMY
                                </span>
                            </h1>
                            <Image priority={true} className=" md:w-[234px] sm:w-[180px] w-[120px] md:h-[54px] sm:h-[41px] h-[28px]" width={234} height={54} src='/svgs/powered-by.svg' alt="Game Centric Logo" />


                        </div>

                    </div>

                </div>
            </div>

        </section>
    )
}

export default Hero