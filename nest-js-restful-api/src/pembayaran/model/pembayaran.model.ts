/* eslint-disable prettier/prettier */
export const PembayaranRequestCreate = {
  schema: {
    type: 'object',
    properties: {
      studentId: { type: 'number', example: 1 },
      total: { type: 'number', example: 100000 },
      jenisPembayaran: { type: 'string', example: 'BANK' },
      tanggal: { type: 'date', example: '2023-01-01' },
      statusPembayaran: { type: 'string', example: 'PENDING' },
    },
  },
};

export const PembayaranResponseCreate = {
  status: 201,
  description: 'Pembayaran created successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Pembayaran created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          studentId: { type: 'number', example: 1 },
          total: { type: 'number', example: 100000 },
          jenisPembayaran: { type: 'string', example: 'BANK' },
          tanggal: { type: 'date', example: '2023-01-01' },
          statusPembayaran: { type: 'string', example: 'PENDING' },
          createdAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
        },
      },
    },
  },
};

export const PembayaranResponseConfirm = {
  status: 201,
  description: 'Pembayaran confirmed successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Pembayaran confirmed successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          studentId: { type: 'number', example: 1 },
          total: { type: 'number', example: 100000 },
          jenisPembayaran: { type: 'string', example: 'BANK' },
          tanggal: { type: 'date', example: '2023-01-01' },
          statusPembayaran: { type: 'string', example: 'SUCCESS' },
          createdAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
        },
      },
    },
  },
};

export const PembayaranResponseGetStudent = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success get student' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            studentId: { type: 'number', example: 1 },
            total: { type: 'number', example: 100000 },
            jenisPembayaran: { type: 'string', example: 'BANK' },
            tanggal: { type: 'date', example: '2023-01-01' },
            statusPembayaran: { type: 'string', example: 'PENDING' },
            createdAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
          },
        },
      },
    },
  },
};
