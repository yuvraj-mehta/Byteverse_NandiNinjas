export const getTokenCookieOptions = (
  expires = new Date(
    Date.now() + Number(process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
  )
) => {
  const configuredFrontendUrls = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URLS,
  ]
    .filter(Boolean)
    .join(",");
  const useCrossSiteCookie =
    process.env.NODE_ENV === "production" ||
    configuredFrontendUrls.includes("https://");

  return {
    expires,
    httpOnly: true,
    secure: useCrossSiteCookie,
    sameSite: useCrossSiteCookie ? "none" : "lax",
  };
};

export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();
  const safeUser = user.toObject ? user.toObject() : { ...user };

  delete safeUser.password;
  delete safeUser.verificationCode;
  delete safeUser.verficationCodeExpire;
  delete safeUser.resetPasswordToken;
  delete safeUser.resetPasswordExpire;

  res.status(statusCode).cookie("token", token, getTokenCookieOptions()).json({
    success: true,
    message,
    user: safeUser,
  });
};
