/* eslint-disable prettier/prettier */
export const EnrollmentRequestRegister = {
  schema: {
    type: 'object',
    properties: {
      scheduleId: {
        type: 'array',
        items: { type: 'number', example: 1 },
      },
    },
    required: ['scheduleId'],
  },
};

export const EnrollmentResponseRegister = {
  status: 201,
  description: 'Success register course',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Success register course' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            studentId: { type: 'number', example: 1 },
            scheduleId: { type: 'number', example: 1 },
            grade: { type: 'number', example: 0 },
            createdAt: {
              type: 'string',
              example: '2020-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              example: '2020-01-01T00:00:00.000Z',
            },
          },
        },
      },
    },
  },
};

export const EnrollmentRequestDelete = {
  schema: {
    type: 'object',
    properties: {
      scheduleId: {
        type: 'array',
        items: { type: 'number', example: 1 },
      },
    },
    required: ['scheduleId'],
  },
};

export const EnrollmentResponseDelete = {
  status: 201,
  description: 'Success delete course',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Success delete course' },
    },
  },
};

export const EnrollmentResponseGetStudentEnrollments = {
  status: 201,
  description: 'Success register course',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Success register course' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            studentId: { type: 'number', example: 1 },
            scheduleId: { type: 'number', example: 1 },
            schedule: {
              day: { type: 'string', example: 'MONDAY' },
              time: { type: 'string', example: '08:00' },
              room: { type: 'string', example: 'R1' },
              courseId: { type: 'number', example: 1 },
              course: {
                name: { type: 'string', example: 'DPW' },
                code: { type: 'string', example: 'S140' },
                teacherId: { type: 'number', example: 1 },
                sks: { type: 'number', example: 4 },
                semester: { type: 'string', example: 'semester_2' },
                programStudi: { type: 'string', example: 'Informatika' },
                createAt: {
                  type: 'string',
                  example: '2022-11-17T16:00:00.000Z',
                },
                updateAt: {
                  type: 'string',
                  example: '2022-11-17T16:00:00.000Z',
                },
              },
            },
            grade: { type: 'number', example: 0 },
            createdAt: {
              type: 'string',
              example: '2020-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              example: '2020-01-01T00:00:00.000Z',
            },
          },
        },
      },
    },
  },
};
