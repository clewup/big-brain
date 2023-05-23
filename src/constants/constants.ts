const constants = {
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    APPLICATION_ID: Number(process.env.NEXT_PUBLIC_LOCKR_APPLICATION_ID),
    CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
    CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string,
}

export default constants
