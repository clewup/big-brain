import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    image: Yup.string(),
    content: Yup.string().required('Content is required'),
    date: Yup.date().required('Date is required'),
    tags: Yup.array()
        .of(Yup.string())
        .min(1, 'At least one tag is required'),
});

export default validationSchema;
