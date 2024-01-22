import * as yup from "yup";

export const createClientSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  phone: yup.string().required(),
  location: yup.array().of(yup.number().required()).length(2).required(),
});

export const searchParamsSchema = yup.object().shape({
  limit: yup.number().required(),
  offset: yup.number().required(),
  q: yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    phone: yup.string(),
  }),
});
