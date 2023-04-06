// Custom response
export const crudResponse = (status: boolean, data: null, message: string) => {
  const resp = {
    status: status,
    data: data,
    mensaje: message,
  }
  return resp
}
