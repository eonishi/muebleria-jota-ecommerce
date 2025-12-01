// La idea es formatear la respuestas de la DB,
// cambiando '_id' por 'id' y sacando '__v' (es algo de mongo)
// Esto es para que el controller/vista puedan ser agnósticas a la respuesta del model

// Uso: FooSchema.plugin(commonFormat)
export function commonFormat(schema, options) {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, returnedObject) => {
      delete returnedObject._id
    }
  })
}
