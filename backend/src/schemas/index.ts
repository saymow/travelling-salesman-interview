import * as yup from "yup";

export const createClientSchema = yup.object().shape({
  email: yup
    .string()
    .email("O formato do e-mail é inválido")
    .required("O e-mail é obrigatório"),
  name: yup.string().required("O nome é obrigatório"),
  phone: yup
    .string()
    .matches(
      /\d{2}\s\d{5}\s\d{4}/,
      "O formato do telefone é inválido. Use o formato XX XXXXX XXXX"
    )
    .required("O número de telefone é obrigatório"),
  location: yup
    .array()
    .of(yup.number().required("A coordenada é obrigatória"))
    .length(2, "A localização deve conter exatamente 2 coordenadas")
    .required("A localização é obrigatória"),
});

export const searchParamsSchema = yup.object().shape({
  limit: yup.number().required(),
  offset: yup.number().required(),
  q: yup.object().shape({
    name: yup.string(),
    email: yup.string(),
    phone: yup.string(),
  }),
});
