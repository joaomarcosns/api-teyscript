import { Request, Response } from "express"
import * as yup from 'yup';

interface ICidades {
  nome: string
}

const bodyValidation: yup.SchemaOf<ICidades> = yup.object().shape({
  nome: yup.string().required().min(3)
})

export const create = async (req: Request<{}, {}, ICidades>, res: Response) => {
  let validateDate: ICidades | undefined = undefined

  try {
    validateDate = await bodyValidation.validate(req.body)
  } catch (error) {
    const yupError = error as yup.ValidationError
    return res.json({
      error: {
        default: yupError.message
      }
    })
  }
  console.log(validateDate);
  return res.send(req.body)
}