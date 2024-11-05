import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const TooltipWarpper = (props: {
    children: React.ReactNode,
    text: string
}) => {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger className=" cursor-pointer" asChild>
                    {props?.children}
                </TooltipTrigger>
                <TooltipContent sideOffset={10}>
                    <p>{props?.text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipWarpper