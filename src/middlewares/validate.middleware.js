export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: result.error.flatten().fieldErrors,
    });
  }

  req.body = result.data; // datos ya parseados y con defaults aplicados
  next();
};
