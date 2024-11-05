
const SimpleLoader = (props: {
    wrapperClassName?: string;
}) => {
    return (
        <div
            role="status"
            aria-live="polite"
            className={`${props?.wrapperClassName ?? ""} no-data`}>
            <div aria-label="Loading..." className='loader'></div>
        </div>
    )
}

export default SimpleLoader