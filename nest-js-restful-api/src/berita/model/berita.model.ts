/* eslint-disable prettier/prettier */
export const BeritaRequestCreate = {
  schema: {
    type: 'object',
    properties: {
      judul: { type: 'string', example: 'Judul Berita' },
      konten: { type: 'string', example: 'Konten Berita' },
      gambar: { type: 'string', example: 'link' },
    },
    required: ['judul', 'konten', 'gambar'],
  },
};

export const BeritaResponseCreate = {
  status: 201,
  description: 'Berita created successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Berita created successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          judul: { type: 'string', example: 'Judul Berita' },
          konten: { type: 'string', example: 'Konten Berita' },
          gambar: { type: 'string', example: 'link' },
        },
      },
    },
  },
};

export const BeritaRequestUpdate = {
  schema: {
    type: 'object',
    properties: {
      judul: { type: 'string', example: 'Judul Berita' },
      konten: { type: 'string', example: 'Konten Berita' },
      gambar: { type: 'string', example: 'link' },
    },
  },
};

export const BeritaResponseUpdate = {
  status: 200,
  description: 'Berita updated successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Berita updated successfully' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          judul: { type: 'string', example: 'Judul Berita' },
          konten: { type: 'string', example: 'Konten Berita' },
          gambar: { type: 'string', example: 'link' },
        },
      },
    },
  },
};

export const BeritaResponseDelete = {
  status: 200,
  description: 'Berita deleted successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Berita deleted successfully' },
    },
  },
};

export const BeritaResponseGetAll = {
  status: 200,
  description: 'Berita get all successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Berita get all successfully' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            judul: { type: 'string', example: 'Judul Berita' },
            konten: { type: 'string', example: 'Konten Berita' },
            gambar: { type: 'string', example: 'link' },
          },
        },
      },
    },
  },
};
