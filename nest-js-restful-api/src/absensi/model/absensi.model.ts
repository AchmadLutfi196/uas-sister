/* eslint-disable prettier/prettier */
export const AbsensiRequestRegister = {
  schema: {
    type: 'object',
    properties: {
      scheduleId: { type: 'number', example: 1 },
      statusKehadiran: { type: 'string', example: 'HADIR' },
      pertemuan: { type: 'number', example: 1 },
      materi: { type: 'string', example: 'Dasar python' },
    },
    required: ['scheduleId', 'statusKehadiran', 'pertemuan', 'materi'],
  },
};

export const AbsensiResponseRegister = {
  status: 201,
  description: 'Success register absensi',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Success register absensi' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            studentId: { type: 'number', example: 1 },
            scheduleId: { type: 'number', example: 1 },
            statusKehadiran: { type: 'string', example: 'HADIR' },
            pertemuan: { type: 'number', example: 1 },
            materi: { type: 'string', example: 'Dasar python' },
            keterangan: { type: 'string', example: 'Belum ada keterangan' },
          },
        },
      },
    },
  },
};

export const AbsensiRequestUpdate = {
  schema: {
    type: 'object',
    properties: {
      studentId: { type: 'number', example: 1 },
      scheduleId: { type: 'number', example: 1 },
      statusKehadiran: { type: 'string', example: 'HADIR' },
      pertemuan: { type: 'number', example: 1 },
      materi: { type: 'string', example: 'Dasar python' },
    },
  },
}

export const AbsensiResponseUpdate = {
  status: 201,
  description: 'Success update absensi',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Success update absensi' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            studentId: { type: 'number', example: 1 },
            scheduleId: { type: 'number', example: 1 },
            statusKehadiran: { type: 'string', example: 'HADIR' },
            pertemuan: { type: 'number', example: 1 },
            materi: { type: 'string', example: 'Dasar python' },
            keterangan: { type: 'string', example: 'Belum ada keterangan' },
          },
        },
      },
    },
  },
};