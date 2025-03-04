import z from 'zod'

// Usamos zod para validar los query params
const querySchema = z.object({
  id: z.string().uuid().optional()

})

export const validatequery = (object) => {
  return querySchema.safeParse(object)
}
