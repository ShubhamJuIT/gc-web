import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const AlertDialogWrapper = (props: {
    children: React.ReactNode
    title: string,
    description?: string,
    actionText?: string,
    cancelText?: string,
    actionBtnClassName?: string,
    onAction: () => void
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {props.children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>

                    <AlertDialogTitle className=" mb-1">{props?.title}</AlertDialogTitle>
                    <AlertDialogDescription>{props?.description ?? ""}</AlertDialogDescription>

                </AlertDialogHeader>
                <AlertDialogFooter className=" gap-2">
                    <AlertDialogCancel>
                        {props?.cancelText ?? "Cancel"}
                    </AlertDialogCancel>
                    <AlertDialogAction className={`${props?.actionBtnClassName ?? ""} 
                    bg-transparent  hover:bg-transparent hover:opacity-95 border border-secondary  text-secondary`} onClick={props?.onAction}>
                        {props?.actionText ?? "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default AlertDialogWrapper