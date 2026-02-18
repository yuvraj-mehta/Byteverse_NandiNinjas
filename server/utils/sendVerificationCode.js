import { generateVerificationOtpEmailTemplate } from "./emailTemplates.js";
import { sendEmail } from "./sendEmail.js";


export async function sendVerificationCode(verificationCode, email) {
    try {
        console.log(`[REGISTER][OTP] Preparing verification email for ${email}`);
        const message = generateVerificationOtpEmailTemplate(verificationCode);
        console.log(`[REGISTER][OTP] Email template generated for ${email}`);
        await sendEmail({
            email,
            subject: "Verification Code (Bookworm Library Management System)",
            message
        });
        console.log(`[REGISTER][OTP] Verification email send completed for ${email}`);
    } catch (error) {
        console.error(`[REGISTER][OTP] Verification email send failed for ${email}: ${error.message}`);
        throw new Error(`Verification code failed to send: ${error.message}`);
    }
}