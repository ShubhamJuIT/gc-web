import { SkeletonCard } from "./skeleton-card"


const GridLoader = () => {
    return (
        <section className=" my-5">
            <div className="container ">
                <div className=" grid lg:grid-cols-4 md:grid-cols-2  gap-5">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </div>
        </section>


    )
}

export default GridLoader