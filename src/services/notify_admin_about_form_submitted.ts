import { FormType } from "@/types";

export async function notifyAdminAboutFormSubmitted(emailInfo: FormType): Promise<{ error: boolean, message: string }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailInfo)
        });

        const result = await response.json();
        console.log('result! of notify admin', result)
        if (!result) {
            return {
                error: true,
                message: 'something went wrong submitting the form',
            }
        }
        return {
            error: false,
            message: 'Form was submitted!'
        }
    } catch (err) {
        console.log("error submitting the form", err)
        return {
            error: true,
            message: 'something went wrong submitting the form',
        }
    }

}