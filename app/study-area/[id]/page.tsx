import StudyAreaDetails from '@/components/study-areas/study-area-details'
import React from 'react'

const StudyArea = ({
    params
}: {
    params: {
        id: string
    }
}) => {
    console.log(params?.id)
    return (
        <section className=" mb-14">
            <div className=" container">
                <div className="  lg:pt-24 pt-28">
                    <StudyAreaDetails courseId={params?.id} />
                </div>
            </div>
        </section>

    )
}

export default StudyArea