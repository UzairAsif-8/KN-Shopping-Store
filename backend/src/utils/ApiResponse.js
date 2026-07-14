export class ApiResponse {
  static success(res, { message = 'Success', data = null, statusCode = 200, meta = null } = {}) {
    const payload = { success: true, message, data };
    if (meta) payload.meta = meta;
    return res.status(statusCode).json(payload);
  }

  static created(res, { message = 'Created successfully', data = null } = {}) {
    return ApiResponse.success(res, { message, data, statusCode: 201 });
  }

  static error(res, { message = 'Something went wrong', errors = [], statusCode = 500 } = {}) {
    return res.status(statusCode).json({ success: false, message, errors });
  }
}

export default ApiResponse;
