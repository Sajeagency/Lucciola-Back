export const HTTP_STATUS = {
  // 2xx Success
  OK: 200, // La solicitud se completó con éxito.
  CREATED: 201, // La solicitud se ha completado y se ha creado un nuevo recurso.
  ACCEPTED: 202, // La solicitud ha sido aceptada para procesamiento, pero puede no estar completada.
  NO_CONTENT: 204, // La solicitud se ha completado con éxito, pero no hay representación para devolver (por ejemplo, en una respuesta vacía).

  // 3xx Redirection
  MOVED_PERMANENTLY: 301, // La página solicitada se ha movido permanentemente a otra ubicación.
  FOUND: 302, // La página solicitada se ha encontrado, pero se ha movido temporalmente a otra ubicación.
  SEE_OTHER: 303, // La respuesta a la solicitud se puede encontrar en otro lugar.
  NOT_MODIFIED: 304, // La página no ha sido modificada desde la última solicitud.
  TEMPORARY_REDIRECT: 307, // Se solicita al cliente realizar una redirección temporal.
  PERMANENT_REDIRECT: 308, // El recurso solicitado se ha movido permanentemente a otra ubicación.

  // 4xx Client Errors
  BAD_REQUEST: 400, // La solicitud no pudo ser comprendida o estaba mal formada.
  UNAUTHORIZED: 401, // Se necesita autenticación o la autenticación ha fallado.
  FORBIDDEN: 403, // El servidor ha entendido la solicitud, pero se niega a cumplirla.
  NOT_FOUND: 404, // No se encontró el recurso solicitado.
  METHOD_NOT_ALLOWED: 405, // El método de solicitud no está permitido para el recurso solicitado.
  CONFLICT: 409, // La solicitud no se pudo completar debido a un conflicto con el estado actual del recurso.
  GONE: 410, // Indica que el recurso solicitado ya no está disponible y no se conocerá su ubicación futura.
  UNPROCESSABLE_ENTITY: 422, // La solicitud está bien formada, pero no se pudo seguir debido a errores semánticos.
  TOO_MANY_REQUESTS: 429, // El usuario ha enviado demasiadas solicitudes en un período de tiempo dado.

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR: 500, // Error genérico del servidor.
  NOT_IMPLEMENTED: 501, // El servidor no soporta la funcionalidad necesaria para completar la solicitud.
  BAD_GATEWAY: 502, // El servidor, mientras actuaba como puerta de enlace o proxy, recibió una respuesta no válida desde el servidor ascendente.
  SERVICE_UNAVAILABLE: 503, // El servidor no está listo para manejar la solicitud. Comúnmente utilizado para mensajes de mantenimiento temporales.
  GATEWAY_TIMEOUT: 504, // El servidor, mientras actuaba como puerta de enlace o proxy, no recibió una respuesta oportuna desde el servidor ascendente o alguna otra fuente necesaria para completar la solicitud.
};
