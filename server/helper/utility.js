exports.validate = function (form, fields) {
  if (fields?.length) {
    fields.forEach((f, i) => {
      if (!form.hasOwnProperty(f) || !form[f]) {
        throw { message: f + ' field is required' }
      }
    })
  }
}

exports.assert = function (data, err, input) {
  if (!data) throw { message: err, ...(input && { inputError: input }) }

  return true
}
