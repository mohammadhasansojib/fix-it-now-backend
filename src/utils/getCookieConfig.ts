

export const cookieConfig = (maxAge: number) => {
    return {
        maxAge,
        httpOnly: true,
        secure: false,
        sameSite: "none"
    };
}