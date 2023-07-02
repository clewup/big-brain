import * as yup from 'yup'

const guideSchema = yup.object().shape({
    categories: yup.array().of(yup.string()).min(1).required(),
    content: yup.string().required(),
    image: yup.string().required(),
    title: yup.string().required(),
})

export default guideSchema
