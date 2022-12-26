import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";

interface ICidades {
  nome: string
}

export const createValidator = validation((getSchema) => ({
  body: getSchema<ICidades>(yup.object().shape({
    nome: yup.string().required().min(3)
  }))
}));


export const create = async (req: Request<{}, {}, ICidades>, res: Response) => {
  console.log(req.body);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado")
}