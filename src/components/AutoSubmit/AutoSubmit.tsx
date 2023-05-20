'use client'

import { useFormikContext } from 'formik'
import { useEffect } from 'react'

// should only be used in forms where text inputs are not being used
const AutoSubmit = () => {
    const { values, submitForm } = useFormikContext()

    useEffect(() => {
        submitForm()
    }, [values])

    return <></>
}

export default AutoSubmit