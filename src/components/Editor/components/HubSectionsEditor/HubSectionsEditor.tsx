'use client'

import { AuthorType } from '@/types/authorTypes'
import { HubType } from '@/types/hubTypes'
import { Field, useFormikContext } from 'formik'
import moment from 'moment/moment'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { Minus, Plus } from 'react-feather'

interface HubSectionsEditorProps {
    setActiveGuideIndex: Dispatch<SetStateAction<number>>
    setActiveSectionIndex: Dispatch<SetStateAction<number>>
}

const HubSectionsEditor: FC<HubSectionsEditorProps> = ({ setActiveGuideIndex, setActiveSectionIndex }) => {
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
        <div>
            {values.sections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                    <div className="flex gap-2">
                        <Field
                            name={`sections[${sectionIndex}].title`}
                            placeholder="Section Title"
                            className="font-semibold"
                        />

                        {sectionIndex > 0 && (
                            <button type="button" onClick={() => removeSection(sectionIndex)} className="text-neutral">
                                <Minus />
                            </button>
                        )}
                    </div>

                    <div className="ml-10">
                        {section.guides.map((guide, guideIndex) => (
                            <div key={guideIndex} className="flex gap-2">
                                <p
                                    onClick={() => {
                                        setActiveSectionIndex(sectionIndex)
                                        setActiveGuideIndex(guideIndex)
                                    }}
                                    className="cursor-pointer">
                                    {guide.title}
                                </p>

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

                        <button type="button" onClick={() => addGuide(sectionIndex)} className="text-neutral">
                            <Plus />
                        </button>
                    </div>
                </div>
            ))}

            <button type="button" onClick={addSection} className="text-neutral mt-5">
                <Plus />
            </button>
        </div>
    )
}

export default HubSectionsEditor
