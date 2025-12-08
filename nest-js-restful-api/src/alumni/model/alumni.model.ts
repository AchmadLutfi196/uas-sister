/* eslint-disable prettier/prettier */
export const AlumniRequestCreate = {
  schema: {
    type: 'object',
    properties: {
      studentId: { type: 'number', example: 1 },
      tanggalLulus: { type: 'date', example: '2023-01-01' },
    },
    required: ['studentId', 'tanggalLulus'],
  },
};

export const AlumniResponseCreate = {
  status: 201,
  description: 'Alumni created successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Alumni created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          studentId: { type: 'number', example: 1 },
          tanggalLulus: { type: 'date', example: '2023-01-01' },
          pekerjaan: { type: 'string', example: 'null' },
          perusahaan: { type: 'string', example: 'null' },
          createAt: { type: 'date', example: '2023-01-01' },
          updateAt: { type: 'date', example: '2023-01-01' },
        },
      },
    },
  },
};

export const AlumniResponseGetAll = {
  status: 200,
  description: 'Get all alumni successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Get all alumni successfully' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            studentId: { type: 'number', example: 1 },
            tanggalLulus: { type: 'date', example: '2023-01-01' },
            pekerjaan: { type: 'string', example: 'null' },
            perusahaan: { type: 'string', example: 'null' },
            createAt: { type: 'date', example: '2023-01-01' },
            updateAt: { type: 'date', example: '2023-01-01' },
          },
        },
      },
    },
  },
};