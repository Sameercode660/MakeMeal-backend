import {z} from 'zod'


export function nameValidatin(name: string): boolean {
    const nameSchema = z.string().refine(value => {
        return /^[a-zA-Z]+$/.test(value)
    })

    const checkSchema = nameSchema.safeParse(name)

    if(checkSchema.success) {
        return true
    }

    return false
}

export function emailValidation(email: string): boolean {
    const emailSchema = z.string().email()

    const checkEmail = emailSchema.safeParse(email)

    if(checkEmail.success) {
        return true
    }
    return false
}

export function phoneNumberValidation(phone: string): boolean {

    if(phone.length > 12) {
        return false
    }
    const phoneSchema = z.string().refine(value => {
        return /^[0-9]+$/.test(value)
    })

    const checkPhoneNumber = phoneSchema.safeParse(phone)

    if(checkPhoneNumber.success) {
        return true
    }

    return false
}

