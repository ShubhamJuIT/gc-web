import Image from "next/image"

const data = [
    {
        imgUrl: "/images/news-1.png",
        description: "Why is Gaming a $6 Billion Blossoming Oasis in the Middle East?"
    },
    {
        imgUrl: "/images/news-2.png",
        description: "Gaming's future is being redefined by AI in 2024"
    },
    {
        imgUrl: "/images/news-3.png",
        description: `MENA gaming industry gets a boost with $1.5 million angel investment for GameCentric`
    },
]
const News = () => {
    return (
        <section>
            <div className="container">
                <div className=" lg:pb-14 md:pb-12 sm:pb-10 pb-7">

                    <h2 className=" lg:mb-14 md:mb-12 sm:mb-10 mb-8 xl:text-[146px] lg:text-9xl md:text-7xl text-6xl   text-secondary font-semibold text-center">News</h2>

                    <div className=" grid sm:grid-cols-3 md:gap-7 gap-8">
                        {data.map((item, index) => (
                            <div className=" relative" key={index}>
                                <div className=" -z-10 rounded-[300px] absolute bg-secondary lg:blur-[150px] blur-[120px] lg:w-[200px] md:w-[100px] w-14  h-[350px] mx-auto  top-0 left-0 right-0  bottom-0 "></div>
                                <div className=" mb-3">
                                    <Image width={300} height={300} className=" rounded-2xl w-full h-full" alt="News Image" src={item?.imgUrl} />
                                </div>

                                <p className=" md:text-start text-center lg:text-xl md:text-lg font-semibold">{item?.description}</p>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </section>
    )
}

export default News