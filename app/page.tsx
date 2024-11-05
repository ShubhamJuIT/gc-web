import CoursesHome from "@/components/courses-home"
import GridLoader from "@/components/grid-loader"
import Hero from "@/components/hero"
import News from "@/components/news"
import WhoWeAre from "@/components/who-we-are"
import { Suspense } from "react"


const Home = () => {
  return (
    <>
      <Hero />
      <WhoWeAre />

      <Suspense fallback={<GridLoader />}>
        <CoursesHome showFeatured={true} />
      </Suspense>

      <Suspense fallback={<GridLoader />}>
        <CoursesHome showFeatured={false} />
      </Suspense>


      <News />
    </>
  )
}

export default Home