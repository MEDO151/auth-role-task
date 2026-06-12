import { toast } from "sonner";

export const showErrorToast =(message?: string) => {
    toast.error(message || "Something went wrong");
};

export const showSuccessToast =(message: string) => {
    toast.success(message);
};