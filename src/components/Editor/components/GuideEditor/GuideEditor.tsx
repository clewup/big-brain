import constants from '@/constants/constants'
import metadata from '@/constants/metadata'
import { HubType } from '@/types/hubTypes'
import { Field, useFormikContext } from 'formik'
import React, { FC, useState } from 'react'
import { Minus, Plus } from 'react-feather'
import { TailSpin } from 'react-loader-spinner'

interface GuideEditorProps {
    activeGuideIndex: number
    activeSectionIndex: number
}

const GuideEditor: FC<GuideEditorProps> = ({ activeGuideIndex, activeSectionIndex }) => {
    const { setFieldValue, values } = useFormikContext<HubType>()

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
        <div>
            <Field
                name={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].title`}
                className="text-4xl py-5 font-semibold"
            />

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
            )}

            {values.sections[activeSectionIndex].guides[activeGuideIndex].sections.map((section, guideSectionIndex) => (
                <div key={guideSectionIndex} className="flex flex-col my-10 relative">
                    <button
                        type="button"
                        onClick={() => removeGuideSection(activeSectionIndex, activeGuideIndex, guideSectionIndex)}
                        className="text-neutral absolute top-0 right-0">
                        <Minus />
                    </button>

                    <Field
                        name={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].sections[${guideSectionIndex}].title`}
                        className="text-2xl"
                    />
                    <Field
                        name={`sections[${activeSectionIndex}].guides[${activeGuideIndex}].sections[${guideSectionIndex}].content`}
                    />
                </div>
            ))}

            <button
                type="button"
                onClick={() => addGuideSection(activeSectionIndex, activeGuideIndex)}
                className="w-full bg-primary py-3 text-white rounded-md flex justify-center">
                <Plus size={30} />
            </button>
        </div>
    )
}

export default GuideEditor
