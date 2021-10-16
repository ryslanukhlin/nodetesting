import { checkSchema } from 'express-validator';

export const validRegisterChema = checkSchema({
    login: {
        isString: {
            errorMessage: 'Логин должно быть строкой',
        },
        isLength: {
            errorMessage: 'никнейм должен быть не меньше 3 букв',
            options: { min: 3 },
        },
    },
    password: {
        isString: {
            errorMessage: 'Пароль должно быть строкой',
        },
        isLength: {
            errorMessage: 'пароль должен быть не меньше 6 букв',
            options: { min: 6 },
        },
    },
});
