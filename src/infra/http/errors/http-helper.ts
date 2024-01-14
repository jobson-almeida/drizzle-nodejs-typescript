export class Status {
  constructor(readonly statusCode: number, readonly body?: any) { }

  static success(body: any) {
    return new Status(200, body)
  }

  static created() {
    return new Status(201)
  }

  static noContent() {
    return new Status(204)
  }

  static badRequest(error: Error) {
    return new Status(400, { error: error.message })
  }

  static notFound(error?: Error) {
    if (error?.message) return new Status(404, { error: error?.message })
    return new Status(404)
  }

  static conflict(error: Error) {
    return new Status(409, { error: error.message })
  }

  static internalServerError() {
    return new Status(500, { error: "Internal server error" })
  }
}

