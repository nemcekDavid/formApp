import { z, ZodObject, ZodTypeAny } from "zod"
import { FieldProps } from "@/types/fieldProps"

export function generateZodSchema(items: FieldProps[]): ZodObject<any> {
  const shape: Record<string, ZodTypeAny> = {}

  items.forEach((item) => {
    let fieldSchema: ZodTypeAny

    switch (item.type) {
      case "string":
      case "multi-line":
        fieldSchema = z.string()
        break
      case "number":
        fieldSchema = z.preprocess((val) => Number(val), z.number())
        break
      case "date":
        fieldSchema = z.string().regex(/^\d{1,2}\.\d{1,2}\.\d{4}$/, "Invalid date format")
        break
      case "boolean":
        fieldSchema = z.union([z.literal("true"), z.literal("false")])
        break
      case "enum":
        if (item.options && Array.isArray(item.options)) {
          fieldSchema = z.enum(item.options as [string, ...string[]])
        } else {
          fieldSchema = z.string()
        }
        break
      default:
        fieldSchema = z.any()
    }

    if (item.required) {
      shape[item.label] = fieldSchema
    } else {
      shape[item.label] = fieldSchema.optional()
    }
  })

  return z.object(shape)
}
