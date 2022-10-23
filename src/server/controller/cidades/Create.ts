import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

interface ICidades {
  nome: string
  estado: string
}

const bodyValidation: yup.SchemaOf<ICidades> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3)
})

export const create = async (req: Request<{}, {}, ICidades>, res: Response) => {
  let validateDate: ICidades | undefined = undefined

  try {
    validateDate = await bodyValidation.validate(req.body, { abortEarly: false})
  } catch (erro) {
    const yupError = erro as yup.ValidationError
    const errors: Record<string, string> = {}

    yupError.inner.forEach(err => {
      if(!err.path) return;
      errors[err.path] = err.message
    })

    return res.status(StatusCodes.BAD_REQUEST).json({ errors })
  }
  console.log(validateDate);
  return res.send(req.body)
}