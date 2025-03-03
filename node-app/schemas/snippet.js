import z from 'zod'

// Usamos zod para validar la request
const snippetSchema = z.object({
  user_id: z.string().nonempty(
    { message: 'User id is required' }
  ).uuid(
    { message: 'Not valid uuid' }
  ),
  title: z.string().nonempty(
    { message: 'Title is required' }
  ).max(100,
    { message: 'Exceeded title max length of 100 chars' }
  ),
  description: z.string().max(255,
    { message: 'Exceeded description max lenght of 255 chars' }
  ),
  lang: z.string().nonempty(
    { message: 'Lang is required' }
  ).max(30,
    { message: 'Exceeded lang max length of 30 chars' }
  ),
  code: z.string()
})

export const validateSchema = (object) => {
  return snippetSchema.safeParse(object)
}
