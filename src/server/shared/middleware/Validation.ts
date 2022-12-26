import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { SchemaOf, ValidationError } from "yup";

type TProperty = "body" | "header" | "params" | "query";

type TALLSchemas = Record<TProperty, SchemaOf<any>>;

type TGetSchema = <T>(schema: SchemaOf<T>) => SchemaOf<T>

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TALLSchemas>

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;


export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {

  const schemas = getAllSchemas(schema => schema)
  
  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false });
    } catch (erro) {
      const yupError = erro as ValidationError;
      const errors: Record<string, string> = {};
      
      yupError.inner.forEach((err) => {
        if (!err.path) return;
        errors[err.path] = err.message;
      });

      errorsResult[key] = errors
    }
  });
  if (Object.entries(errorsResult).length === 0) {
    return next();
    
  }else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
  }
};


