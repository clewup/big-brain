'use client'

import constants from '@/constants/constants'
import metadata from '@/constants/metadata'
import { HubType } from '@/types/hubTypes'
import 'easymde/dist/easymde.min.css'
import { ErrorMessage, Field, useFormikContext } from 'formik'
import React, { FC, useState } from 'react'
import { Minus, Plus } from 'react-feather'
import { TailSpin } from 'react-loader-spinner'
import SimpleMDE from 'react-simplemde-editor'

interface GuideEditorProps {
    activeGuideIndex: number
    activeSectionIndex: number
    handleNavigation: (index: number) => void
}

const GuideEditor: FC<GuideEditorProps> = ({ activeGuideIndex, activeSectionIndex, handleNavigation }) => {
    const { handleChange, setFieldValue, values } = useFormikContext<HubType>()

    const [isImageLoading, setImageLoading] = useState(false)

    function addGuideSection(sectionIndex: number, guideIndex: number) {
        setFieldValue(`sections[${sectionIndex}].guides[${guideIndex}].sections`, [
            ...values.sections[sectionIndex].guides[guideIndex].sections,
            {
                content: 'Content',
                title: `Section ${values.sections[sectionIndex].guides[guideIndex].sections.length + 1}`,
            },
        ])
    }

    function removeGuideSection(sectionIndex: number, guideIndex: number, guideSectionIndex: number) {
        const _guideSections = values.sections[sectionIndex].guides[guideIndex].sections
        _guideSections.splice(guideSectionIndex, 1)

        setFieldValue(`sections[${sectionIndex}].guides[${guideIndex}].sections`, _guideSections)
    }

    async function uploadImage(image: Blob | undefined, sectionIndex: number, guideIndex: number) {
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

        setFieldValue(`sections[${sectionIndex}].guides[${guideIndex}].image`, cloudinaryData.url)
        setImageLoading(false)
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="flex">
                <div className="w-1/2">
                    <span className="flex flex-col">
                        <label
                            htmlFor={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].title`}
                            className="text-2xl text-neutral">
                            Guide Title
                        </label>
                        <Field
                            id={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].title`}
                            name={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].title`}
                            className="text-3xl pb-2 focus:outline-0 border-b-2 border-neutral w-[50%]"
                        />
                        <ErrorMessage name={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].title`}>
                            {(errorMessage) => <p className="text-error">{errorMessage}</p>}
                        </ErrorMessage>
                    </span>
                </div>
                <div className="w-1/2">
                    {isImageLoading ? (
                        <div className="my-5 w-full flex justify-center">
                            <TailSpin color="#9ca3af" width={50} height={50} />
                        </div>
                    ) : values.sections[activeSectionIndex].guides[activeGuideIndex].image ? (
                        <img
                            src={values.sections[activeSectionIndex].guides[activeGuideIndex].image}
                            alt="guide_image"
                            className="w-full aspect-video object-cover rounded-md"
                        />
                    ) : (
                        <>
                            <div className="w-full relative">
                                <img
                                    src={metadata.images.placeholder}
                                    alt="guide_image"
                                    className="w-full aspect-video object-cover rounded-md"
                                />

                                <input
                                    type="file"
                                    className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] file-input"
                                    onChange={({ target: { files } }) =>
                                        uploadImage(files?.[0], activeSectionIndex, activeGuideIndex)
                                    }
                                />
                            </div>

                            <ErrorMessage name={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].image`}>
                                {(errorMessage) => <p className="text-error">{errorMessage}</p>}
                            </ErrorMessage>
                        </>
                    )}
                </div>
            </div>

            {values.sections[activeSectionIndex].guides[activeGuideIndex].sections.map((section, guideSectionIndex) => (
                <div
                    key={guideSectionIndex}
                    className="flex flex-col relative gap-10 border-neutral border-2 rounded-md p-5">
                    {guideSectionIndex > 0 && (
                        <button
                            type="button"
                            onClick={() => removeGuideSection(activeSectionIndex, activeGuideIndex, guideSectionIndex)}
                            className="text-neutral absolute top-5 right-5">
                            <Minus />
                        </button>
                    )}

                    <span className="flex flex-col">
                        <label
                            htmlFor={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].sections[${guideSectionIndex}].title`}
                            className="text-2xl text-neutral">
                            Guide Section Title
                        </label>
                        <Field
                            id={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].sections[${guideSectionIndex}].title`}
                            name={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].sections[${guideSectionIndex}].title`}
                            className="text-3xl pb-2 focus:outline-0 border-b-2 border-neutral w-[50%]"
                        />

                        <ErrorMessage
                            name={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].sections[${guideSectionIndex}].title`}>
                            {(errorMessage) => <p className="text-error">{errorMessage}</p>}
                        </ErrorMessage>
                    </span>

                    <Field>
                        {() => (
                            <SimpleMDE
                                value={
                                    values.sections[activeSectionIndex].guides[activeGuideIndex].sections[
                                        guideSectionIndex
                                    ].content
                                }
                                onChange={(value) =>
                                    setFieldValue(
                                        `sections[${activeSectionIndex}].guides[${activeGuideIndex}].sections[
                                        ${guideSectionIndex}
                                    ].content}`,
                                        value
                                    )
                                }
                            />
                        )}
                    </Field>

                    <ErrorMessage
                        name={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].sections[${guideSectionIndex}].content`}>
                        {(errorMessage) => <p className="text-error">{errorMessage}</p>}
                    </ErrorMessage>
                </div>
            ))}

            <button
                type="button"
                onClick={() => addGuideSection(activeSectionIndex, activeGuideIndex)}
                className="w-full bg-primary py-3 text-white rounded-md flex justify-center">
                <Plus size={30} />
            </button>

            <div className="flex gap-5">
                <button
                    className="text-xl bg-primary text-white px-5 py-3 rounded-md"
                    onClick={() => handleNavigation(1)}>
                    Back
                </button>
            </div>
        </div>
    )
}

export default GuideEditor
