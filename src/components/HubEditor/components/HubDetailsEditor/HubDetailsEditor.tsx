'use client'

import constants from '@/constants/constants'
import metadata from '@/constants/metadata'
import { HubType } from '@/types/hubTypes'
import { Field, useFormikContext } from 'formik'
import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'

const HubDetailsEditor = () => {
    const { setFieldValue, values } = useFormikContext<HubType>()

    const [isImageLoading, setImageLoading] = useState(false)

    async function uploadImage(image: Blob | undefined) {
        if (!image) return

        setImageLoading(true)
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', constants.CLOUDINARY_UPLOAD_PRESET)
        formData.append('cloud_name', constants.CLOUDINARY_CLOUD_NAME)

        const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dliog6kq6/image/upload', {
            body: formData,
            method: 'POST',
        })
        const cloudinaryData = await cloudinaryResponse.json()

        setFieldValue(`image`, cloudinaryData.url)
        setImageLoading(false)
    }

    return (
        <div>
            {isImageLoading ? (
                <div className="my-5 w-full flex justify-center">
                    <TailSpin color="#9ca3af" width={30} height={30} />
                </div>
            ) : values.image ? (
                <img src={values.image} alt="hub_image" className="w-full aspect-video object-cover rounded-md" />
            ) : (
                <div className="w-full relative">
                    <img
                        src={metadata.images.placeholder}
                        alt="hub_image"
                        className="w-full aspect-video object-cover rounded-md"
                    />

                    <input
                        type="file"
                        className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] file-input file-input-md w-[90%]"
                        onChange={({ target: { files } }) => uploadImage(files?.[0])}
                    />
                </div>
            )}

            <div className="flex justify-between items-end mt-5">
                <Field name="title" placeholder="Title" className="pb-5 text-4xl font-semibold w-full" />
            </div>
        </div>
    )
}

export default HubDetailsEditor
