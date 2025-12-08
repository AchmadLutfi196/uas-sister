/* eslint-disable prettier/prettier */
export const KritikSaranRequestCreate = {
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'John' },
      email: { type: 'string', example: 'pKQ9T@example.com' },
      pesan: { type: 'string', example: 'Webnya keren' },
    },
    required: ['name', 'email', 'pesan'],
  },
};

export const KritikSaranResponseCreate = {
  status: 201,
  description: 'Kritik saran created successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Kritik saran created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John' },
          email: { type: 'string', example: 'pKQ9T@example.com' },
          pesan: { type: 'string', example: 'Webnya keren' },
          createdAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
        },
      },
    },
  },
};

export const KritikSaranRequestUpdate = {
  schema: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      pesan: { type: 'string', example: 'Webnya keren' },
    },
  },
};

export const KritikSaranResponseUpdate = {
  status: 201,
  description: 'Kritik saran updated successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Kritik saran updated successfully' },
    },
  },
};

export const KritikSaranResponseDelete = {
  status: 201,
  description: 'Kritik saran deleted successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Kritik saran deleted successfully' },
    },
  },
};

export const KritikSaranResponseGetAll = {
  status: 200,
  description: 'Kritik saran get all successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Kritik saran get all successfully' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John' },
            email: { type: 'string', example: 'pKQ9T@example.com' },
            pesan: { type: 'string', example: 'Webnya keren' },
            createdAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
          },
        },
      },
    },
  },
};
