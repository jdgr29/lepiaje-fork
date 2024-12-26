import { FormType } from "@/types";

export async function submitForm(formData: FormType): Promise<{ error: boolean, message: string }> {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/form`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        console.log('result! of submit', result)
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