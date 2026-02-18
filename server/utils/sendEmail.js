import nodeMailer from "nodemailer";
export const sendEmail = async ({ email, subject, message }) => {
    console.log(`[EMAIL] Initializing transporter for subject: ${subject}`);
    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        secure: true,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html: message,
    };

    try {
        console.log(`[EMAIL] Sending email to ${email} with subject: ${subject}`);
        await transporter.sendMail(mailOptions);
        console.log(`[EMAIL] Email sent successfully to ${email}`);
    } catch (error) {
        console.error(`[EMAIL] Failed to send email to ${email}: ${error.message}`);
        throw error;
    }
}


