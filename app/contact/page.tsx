import ContactUsForm from "@/components/forms/contact-us-form"
import Image from "next/image"

const Contact = () => {
    return (
        <section className="lg:mb-20 md:mb-16 sm:mb-14 mb-12">

            <div className=" container max-w-[1280px] relative">
                <figure className=' z-10 absolute top-[31%]   lg:-left-[10%] md:-left-[3%] -left-[8%]  '>       <Image className=' lg:w-full w-1/2 h-full' width={256} height={257} src='/svgs/tl.svg' alt='bg design graphics' /></figure>
                <figure className='z-10  absolute md:top-[10%] top-[12%] md:-right-[7%] sm:-right-[23%] -right-[38%] '>            <Image className='lg:w-full sm:w-1/2 w-1/3 h-full' width={197} height={200} src='/svgs/tr.svg' alt='bg design graphics' /></figure>
                <figure className='z-10  absolute lg:-bottom-[11%] md:-bottom-[8%] sm:-bottom-[6%] -bottom-[4%] right-[9%] '>            <Image className=' lg:w-full w-1/2 h-full' width={238} height={238} src='/svgs/br.svg' alt='bg design graphics' /></figure>
                <div className=" md:pt-32  pt-28" >
                    <div className=" grid md:grid-cols-2 rounded-2xl overflow-hidden">
                        <div className=" bg-[#20202080]  lg:p-14 md:p-10  p-8  flex justify-center items-center text-center flex-col">
                            <h1 className=" text-primary mb-3 lg:text-5xl text-4xl  font-bold  -tracking-[2.5px] ">GET IN TOUCH</h1>
                            <p className="lg:mb-14 mb-8  lg:text-2xl text-xl font-light">We are here for you! How can we help?</p>

                            <div className=" md:w-5/6 w-full">

                                <ContactUsForm />
                            </div>
                        </div>
                        <div className=" relative md:pb-0 pb-[70%] ">
                            <Image quality={80} className=" object-cover" fill alt="Contact us image" src='/images/contact-us.png' />
                        </div>
                    </div>
                </div >
            </div >



        </section >
    )
}

export default Contact