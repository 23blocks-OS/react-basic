import * as Yup from 'yup';

const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    name: Yup.string().required(),
    password: Yup.string().required(),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match')
});

export default schema;