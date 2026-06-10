import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM = process.env.RESEND_FROM_EMAIL ?? 'PostFlow AI <bonjour@postflow.ai>'
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? ''
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
