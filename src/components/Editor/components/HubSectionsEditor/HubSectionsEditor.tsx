'use client'

import { AuthorType } from '@/types/authorTypes'
import { HubType } from '@/types/hubTypes'
import { ErrorMessage, Field, useFormikContext } from 'formik'
import moment from 'moment/moment'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { Minus, Plus } from 'react-feather'

interface HubSectionsEditorProps {
    setActiveGuideIndex: Dispatch<SetStateAction<number>>
    setActiveSectionIndex: Dispatch<SetStateAction<number>>
    handleNavigation: (index: number) => void
}

const HubSectionsEditor: FC<HubSectionsEditorProps> = ({
    handleNavigation,
    setActiveGuideIndex,
    setActiveSectionIndex,
}) => {
    const { setFieldValue, values } = useFormikContext<HubType>()

    function addSection() {
        setFieldValue('sections', [
            ...values.sections,
            {
                guides: [
                    {
                        author: {} as AuthorType,
                        categories: [],
                        comments: [],
                        createdAt: moment().toDate(),
                        image: '',
                        sections: [
                            {
                                content: 'Content',
                                title: 'Section 1',
                            },
                        ],
                        title: 'Guide 1',
                    },
                ],
                title: '',
            },
        ])
    }
    function removeSection(sectionIndex: number) {
        if (sectionIndex === 0) return

        const _sections = values.sections
        _sections.splice(sectionIndex, 1)

        setActiveSectionIndex(0)
        setActiveGuideIndex(0)
        setFieldValue('sections', _sections)
    }

    function addGuide(sectionIndex: number) {
        setFieldValue(`sections[${sectionIndex}].guides`, [
            ...values.sections[sectionIndex].guides,
            {
                author: {} as AuthorType,
                categories: [],
                comments: [],
                createdAt: moment().toDate(),
                image: '',
                sections: [
                    {
                        content: 'Content',
                        title: 'Section 1',
                    },
                ],
                title: `Guide ${values.sections[sectionIndex].guides.length + 1}`,
            },
        ])
    }
    function removeGuide(sectionIndex: number, guideIndex: number) {
        const _guides = values.sections[sectionIndex].guides
        _guides.splice(guideIndex, 1)

        setActiveSectionIndex(0)
        setActiveGuideIndex(0)
        setFieldValue(`sections[${sectionIndex}].guides`, _guides)
    }

    return (
        <div className="flex flex-col gap-10">
            {values.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="border-neutral border-2 rounded-md p-5 flex flex-col gap-5">
                    <div className="flex gap-2 relative">
                        <span className="flex flex-col w-full">
                            <label htmlFor={`sections[${sectionIndex}].title`} className="text-2xl text-neutral">
                                Section Title
                            </label>
                            <Field
                                id={`sections[${sectionIndex}].title`}
                                name={`sections[${sectionIndex}].title`}
                                className="text-3xl pb-2 focus:outline-0 border-b-2 border-neutral w-[50%]"
                            />
                            <ErrorMessage name={`sections[${sectionIndex}].title`}>
                                {(errorMessage) => <p className="text-error">{errorMessage}</p>}
                            </ErrorMessage>
                        </span>

                        {sectionIndex > 0 && (
                            <button
                                type="button"
                                onClick={() => removeSection(sectionIndex)}
                                className="text-neutral absolute top-5 right-5">
                                <Minus />
                            </button>
                        )}
                    </div>

                    <div className="ml-10">
                        {section.guides.map((guide, guideIndex) => (
                            <div key={guideIndex} className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setActiveSectionIndex(sectionIndex)
                                        setActiveGuideIndex(guideIndex)
                                        handleNavigation(2)
                                    }}
                                    className="text-xl">
                                    {guide.title}
                                </button>

                                {guideIndex > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeGuide(sectionIndex, guideIndex)}
                                        className="text-neutral">
                                        <Minus />
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => addGuide(sectionIndex)}
                            className="text-white py-1 bg-primary flex justify-center items-center px-10 mt-2 rounded-md">
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={addSection}
                className="w-full bg-primary py-3 text-white rounded-md flex justify-center">
                <Plus />
            </button>

            <div className="flex gap-5">
                <button
                    type="button"
                    className="text-xl bg-primary text-white px-5 py-3 rounded-md"
                    onClick={() => handleNavigation(0)}>
                    Back
                </button>

                <button type="submit" className="text-xl bg-success text-white px-5 py-3 rounded-md">
                    Save
                </button>
            </div>
        </div>
    )
}

export default HubSectionsEditor
