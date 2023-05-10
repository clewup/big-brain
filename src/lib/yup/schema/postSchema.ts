import * as yup from 'yup'

const postSchema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
    image: yup.string().required(),
    categories: yup.array().of(yup.string()).min(1).required(),
    comments: yup.array().of(yup.string()),
})

export default postSchema
