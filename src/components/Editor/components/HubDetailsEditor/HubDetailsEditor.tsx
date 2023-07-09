'use client'

import constants from '@/constants/constants'
import metadata from '@/constants/metadata'
import { HubType } from '@/types/hubTypes'
import { ErrorMessage, Field, useFormikContext } from 'formik'
import React, { FC, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'

interface HubDetailsEditorProps {
    handleNavigation: (index: number) => void
}

const HubDetailsEditor: FC<HubDetailsEditorProps> = ({ handleNavigation }) => {
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
        <div className="min-h-[75vh] flex flex-col justify-center">
            <div className="flex gap-5 h-full">
                <div className="w-1/2 flex flex-col gap-10">
                    <h1 className="text-5xl">Lets get started!</h1>

                    <span className="flex flex-col">
                        <label htmlFor="title" className="text-2xl text-neutral">
                            Title
                        </label>
                        <Field
                            id="title"
                            name="title"
                            className="bg-transparent text-3xl pb-2 focus:outline-0 border-b-2 border-neutral w-[50%]"
                        />
                        <ErrorMessage name="title">
                            {(errorMessage) => <p className="text-error">{errorMessage}</p>}
                        </ErrorMessage>
                    </span>
                </div>

                <div className="w-1/2">
                    {isImageLoading ? (
                        <div className="my-5 w-full flex justify-center">
                            <TailSpin color="#9ca3af" width={30} height={30} />
                        </div>
                    ) : values.image ? (
                        <img
                            src={values.image}
                            alt="hub_image"
                            className="w-full aspect-video object-cover rounded-md"
                        />
                    ) : (
                        <>
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
                            <ErrorMessage name="image">
                                {(errorMessage) => <p className="text-error">{errorMessage}</p>}
                            </ErrorMessage>
                        </>
                    )}
                </div>
            </div>

            <div className="mt-20">
                <button
                    className="text-xl bg-primary text-white px-5 py-3 rounded-md"
                    onClick={() => handleNavigation(1)}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default HubDetailsEditor
