import Image from 'next/image'
import React from 'react'
const data = [
    {
        title: "Video Lectures",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        imgUrl: "/svgs/affordable-price.svg"
    },
    {
        title: "Learn Anytime Anywhere",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        imgUrl: "/svgs/video-lecture.svg"
    },
    {
        title: "Afforadble Pricing",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        imgUrl: "/svgs/learn-anytime.svg"
    },
]
const WhoWeAre = () => {
    return (
        <section className=' relative'>
            <Image className='-z-10 object-cover lg:hidden' fill src='/images/who-we-are-bg.png' alt='Background Image Pattern' />

            <div className="container ">

                <div className='max-w-[998px] mx-auto relative  lg:py-40 md:py-32  py-7 pb-0'>
                    <Image className='-z-10 object-cover lg:block hidden' fill src='/images/who-we-are-bg.png' alt='Background Image Pattern' />
                    <div className=' relative flex md:gap-5 gap-3 md:flex-row flex-col  lg:items-center lg:justify-center  items-start  xl:mb-20 lg:mb-16 md:mb-12 mb-10'>
                        <p className='xl:text-[146px] lg:text-9xl md:text-7xl text-5xl   text-secondary font-semibold md:pl-5 lg:absolute xl:-left-20 xl:top-[2px] lg:top-[18px] lg:-left-12   '> We</p>
                        <div >

                            <h2 className='xl:text-7xl lg:text-6xl text-4xl   lg:-tracking-[3.5px] lg:leading-[72px]  mb-4  font-light'>
                                are <span className=' text-primary font-semibold'> GameCentric</span> and
                                <br />
                                Esports is our passion.
                            </h2>

                            <p className=' md:max-w-[671px] xl:text-3xl text-2xl -tracking-[1.5px] leading-10  font-extralight'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
                        </div>



                    </div>

                    <div className=' grid md:grid-cols-3 md:gap-7 gap-8'>
                        {data.map((item, index) => (
                            <div key={index} className='  bg-regular rounded-2xl p-6 overflow-hidden'>
                                <div className=' relative  md:w-[100px] md:h-[100px] w-20 h-20 md:mb-8 mb-6'>
                                    <div className=' absolute bg-primary  top-0 left-0 right-0 bottom-0  blur-[80px]  opacity-65 '></div>

                                    <Image fill src={item?.imgUrl} alt={item?.title} />
                                </div>

                                <h2 className=' md:mb-3 mb-2 text-xl font-semibold '>{item?.title}</h2>
                                <p className=' text-base opacity-50'>{item?.description}</p>
                            </div>
                        ))}



                    </div>
                </div>


            </div>
        </section>
    )
}

export default WhoWeAre