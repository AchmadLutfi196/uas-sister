/* eslint-disable prettier/prettier */
export const BeasiswaRequestRegister = {
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Beasiswa' },
      mulai: { type: 'date', example: '2024-01-01' },
      akhir: { type: 'date', example: '2025-01-01' },
      link: { type: 'string', example: 'Beasiswa' },
    },
    required: ['name', 'mulai', 'akhir', 'link'],
  },
};

export const BeasiswaResponseRegister = {
  status: 201,
  description: 'Beasiswa created successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Beasiswa created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Beasiswa' },
          mulai: { type: 'date', example: '2024-01-01' },
          akhir: { type: 'date', example: '2025-01-01' },
          link: { type: 'string', example: 'Beasiswa' },
        },
      },
    },
  },
};

export const BeasiswaRequestUpdate = {
  schema: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'Beasiswa' },
      mulai: { type: 'date', example: '2024-01-01' },
      akhir: { type: 'date', example: '2025-01-01' },
      link: { type: 'string', example: 'Beasiswa' },
    },
  },
};

export const BeasiswaResponseUpdate = {
  status: 201,
  description: 'Beasiswa updated successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Beasiswa updated successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Beasiswa' },
          mulai: { type: 'date', example: '2024-01-01' },
          akhir: { type: 'date', example: '2025-01-01' },
          link: { type: 'string', example: 'Beasiswa' },
        },
      },
    },
  },
};

export const BeasiswaResponseDelete = {
  status: 201,
  description: 'Beasiswa deleted successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Beasiswa deleted successfully' },
    },
  },
};

export const BeasiswaResponseGetAll = {
  status: 200,
  description: 'Get all beasiswa',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success get all beasiswa' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'Beasiswa' },
            mulai: { type: 'date', example: '2024-01-01' },
            akhir: { type: 'date', example: '2025-01-01' },
            link: { type: 'string', example: 'Beasiswa' },
          },
        },
      },
    },
  },
};
