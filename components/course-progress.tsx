"use client"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const CourseProgress = (props: {
    value: number,
    strokeWidth: number,
    showText?: boolean
}) => {
    return (
        <CircularProgressbar styles={buildStyles({
            pathColor: `rgb(var(--primaryColor) / 1)`,
            trailColor: '#373737',
            textColor: `rgb(var(--primaryColor) / 1)`,
            textSize: 26,


        })}
            text={props?.showText ? `${props?.value}%` : ""}
            strokeWidth={props?.strokeWidth}
            value={props?.value} />
    )
}

export default CourseProgress