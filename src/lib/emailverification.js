import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const sendmail = function OTP(email, Otp) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,

            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        if (!email) {
            return {
                message: "some problem in email/wrong email"
            }
        }

        else {
            const info = transporter.sendMail({
                from: 'study notion',
                to: `${email}`,
                subject: "OTP SEND SUCCESSFULLY",
                html: `<h1>heloo your otp ${Otp} </h1> `
            })
            console.log(info);

            if (info) {
                return {
                    message: "otp send sucessfully"
                }
            }
            else {
                return {
                    message: "problem to send email"
                }
            }
        }
    } catch (error) {
        return {
            message: "something went wrong try again"
        }
    }
}
export default sendmail;
