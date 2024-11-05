import Image from "next/image";

const data: any[] = ['/images/courses/certificate.png', '/images/courses/certificate.png', '/images/courses/certificate.png', '/images/courses/certificate.png',];

const MyCertificates = () => {
    return (
        <section>
            <h1 className='mb-3 lg:text-5xl text-4xl text-primary  font-bold  -tracking-[2.5px]'>My Certificate</h1>
            <p className=" lg:mb-10 mb-8  lg:text-2xl text-xl font-light">View your certificates.</p>
            <div className=' grid grid-cols-2 gap-7'>
                {data?.map((item, i) => <a key={i} title="Click to download" download rel="noopener noreferrer" target="_blank" href={item}>
                    <Image src={item} alt='certificate' className=" w-full h-full" width={787} height={561} />
                </a>)}
            </div>

        </section>
    )
}

export default MyCertificates