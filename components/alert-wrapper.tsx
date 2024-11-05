import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
const AlertWrapper = (
    props: {
        title: string,
        description: string,
        className?: string,
        variant?: "default" | "destructive" | "info" | "warning" | "secondary" | null | undefined
    }
) => {
    return (
        <Alert className={props?.className ?? ""} variant={props?.variant}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>
                {props?.title}
            </AlertTitle>
            <AlertDescription>
                {props?.description}
            </AlertDescription>
        </Alert>
    )
}

export default AlertWrapper