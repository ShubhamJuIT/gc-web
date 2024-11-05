import { toast } from "@/components/ui/use-toast";


export function createErrorMessage(error: any) {
    if (!error) {
        return "Unknown";
    }
    var msg = preapreErrorMessage(error);
    console.error(msg);
    return msg;

}

export function preapreErrorMessage(error: any) {
    if (error.error instanceof ProgressEvent) {
        return error.statusText;
    }
    if (error.error) {
        if (error.error.errorMessage) {
            return error.error.errorMessage;
        } else if (error.error.error) {
            return `${JSON.stringify(error.error.error)} - ${error.status}`;
        }
        return `${JSON.stringify(error.error)} - ${error.status}`;
    } else if (error.response) {
        if (error.response.data) {
            if (error.response.data.errorMessage) {
                return error.response.data.errorMessage;
            } else if (error.response.data.message) {
                return error.response.data.message;
            }
        }
    }
    else if (error.message) {
        return error.message;
    }
    else {
        return `${error.name} - ${error.status}`;
    }
}

export function showErrorToast(error: any, title?: string) {

    toast({
        variant: 'destructive',
        title: "Something went wrong",
        description: `${createErrorMessage(error)}`,

    })
}