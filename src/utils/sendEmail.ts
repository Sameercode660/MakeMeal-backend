import { Resend } from "resend";
import { EmailTemplate } from "./EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOtp(email: string) {
    const {data, error} = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: 'mesh789736@gmail.com',
        subject: "Hello, world",
        react: EmailTemplate({email: "Sameer", otp: 123456})
    })

    if(error) {
        return error
    }

    return data
}