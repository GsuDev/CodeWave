import z from 'zod'

// Usamos zod para validar los query params
const querySchema = z.object({
  user_id: z.string().nonempty(
    { message: 'User id is required' }
  ).uuid(
    { message: 'Not valid uuid' }
  ).optional(),
  title: z.string().nonempty(
    { message: 'Title is required' }
  ).max(100,
    { message: 'Exceeded title max length of 100 chars' }
  ).optional(),
  description: z.string().max(255,
    { message: 'Exceeded description max lenght of 255 chars' }
  ).optional(),
  lang: z.string().nonempty(
    { message: 'Lang is required' }
  ).max(30,
    { message: 'Exceeded lang max length of 30 chars' }
  ).optional(),
  code: z.string().nonempty(
    { message: 'Code is required' }
  ).optional()
})

export const validateQuery = (object) => {
  return querySchema.safeParse(object)
}
