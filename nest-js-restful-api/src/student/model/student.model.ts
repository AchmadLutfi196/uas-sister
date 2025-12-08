/* eslint-disable prettier/prettier */
import { v4 as uuid } from 'uuid';

export const StudentRequestRegister = {
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'John Doe' },
      email: { type: 'string', example: 'V9xv2@example.com' },
      password: { type: 'string', example: 'password123' },
      nim: { type: 'string', example: '12345678' },
      tanggalLahir: { type: 'date', example: '2005-03-27' },
      gender: { type: 'string', example: 'MAN' },
      programStudi: { type: 'string', example: 'Teknik Informatika' },
      academicAdvisorId: { type: 'number', example: 1 },
      fakultas: { type: 'string', example: 'Fakultas Teknik' },
    },
    required: [
      'name',
      'email',
      'password',
      'nim',
      'tanggalLahir',
      'gender',
      'programStudi',
      'academicAdvisorId',
      'fakultas',
    ],
  },
};

export const StudentResponseRegister = {
  status: 201,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Student created successfully' },
      data: {
        type: 'object',
        example: {
          id: 1,
          name: 'John Doe',
          email: 'pKQ9T@example.com',
          tanggalLahir: '2005-03-27',
          gender: 'MAN',
          role: 'STUDENT',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          token: null,
          recoveryToken: null,
          student: {
            id: 1,
            userId: 1,
            nim: '12345678',
            statusStudent: 'ACTIVE',
            programStudi: 'Teknik Informatika',
            academicAdvisorId: 1,
            fakultas: 'Fakultas Teknik',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
          },
        },
      },
    },
  },
};

export const StudentRequestLogin = {
  schema: {
    type: 'object',
    properties: {
      nim: { type: 'string', example: '12345678' },
      password: { type: 'string', example: 'password123' },
    },
    required: ['nim', 'password'],
  },
};

export const StudentResponseLogin = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Login success' },
      data: {
        type: 'object',
        example: {
          id: 1,
          name: 'John Doe',
          email: 'pKQ9T@example.com',
          role: 'STUDENT',
          tanggalLahir: '2005-03-27',
          gender: 'MAN',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          token: uuid(),
          recoveryToken: null,
          student: {
            id: 1,
            userId: 1,
            nim: '12345678',
            statusStudent: 'ACTIVE',
            programStudi: 'Teknik Informatika',
            academicAdvisorId: 1,
            fakultas: 'Fakultas Teknik',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
          },
        },
      },
    },
  },
};

export const StudentResponseLogout = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'success logout student' },
      data: {
        type: 'object',
        example: {
          id: 1,
          name: 'John Doe',
          email: 'pKQ9T@example.com',
          role: 'STUDENT',
          tanggalLahir: '2005-03-27',
          gender: 'MAN',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          token: null,
          recoveryToken: null,
          student: {
            id: 1,
            userId: 1,
            nim: '12345678',
            statusStudent: 'ACTIVE',
            programStudi: 'Teknik Informatika',
            academicAdvisorId: 1,
            fakultas: 'Fakultas Teknik',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
          },
        },
      },
    },
  },
};

export const StudentResponseGetStudents = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'success get all students' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'YqyZ4@example.com' },
            tanggalLahir: { type: 'date', example: '2005-03-27' },
            gender: { type: 'string', example: 'MAN' },
            student: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  example: 1,
                },
                userId: {
                  type: 'number',
                  example: 1,
                },
                nim: {
                  type: 'string',
                  example: '123456789',
                },
                statusStudent: {
                  type: 'string',
                  example: 'ACTIVE',
                },
                programStudi: {
                  type: 'string',
                  example: 'Teknik Informatika',
                },
                academicAdvisorId: {
                  type: 'number',
                  example: 1,
                },
                fakultas: {
                  type: 'string',
                  example: 'Fakultas Teknik',
                },
                createdAt: {
                  type: 'string',
                  example: '2023-01-01T00:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  example: '2023-01-01T00:00:00.000Z',
                },
              },
            },
            createAt: {
              type: 'string',
              example: '2023-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              example: '2023-01-01T00:00:00.000Z',
            },
            token: {
              type: 'string',
              example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
            },
            recoveryToken: { type: 'string', example: null },
          },
        },
      },
    },
  },
};

export const StudentRequestUpdate = {
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'John Doe' },
      email: { type: 'string', example: 'YqyZ4@example.com' },
      password: { type: 'string', example: 'password123' },
      telephone: { type: 'string', example: '08123456789' },
    },
  },
};

export const StudentResponseUpdate = {
  status: 201,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'success update student' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'YqyZ4@example.com' },
          role: { type: 'string', example: 'STUDENT' },
          telephone: { type: 'string', example: '08123456789' },
          student: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              userId: { type: 'number', example: 1 },
              nim: { type: 'string', example: '123456789' },
              statusStudent: {
                type: 'string',
                example: 'ACTIVE',
              },
              programStudi: {
                type: 'string',
                example: 'Teknik Informatika',
              },
              academicAdvisorId: {
                type: 'number',
                example: 1,
              },
              fakultas: {
                type: 'string',
                example: 'Fakultas Teknik',
              },
              createdAt: {
                type: 'string',
                example: '2023-01-01T00:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                example: '2023-01-01T00:00:00.000Z',
              },
            },
          },
          createAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
          updatedAt: {
            type: 'string',
            example: '2023-01-01T00:00:00.000Z',
          },
          token: {
            type: 'string',
            example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
          },
          recoveryToken: { type: 'string', example: null },
        },
      },
    },
  },
};

export const StudentRequestDelete = {
  name: 'id',
  type: 'number',
  required: true,
  example: 1,
};

export const StudentResponseDelete = {
  status: 201,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'success delete student' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'YqyZ4@example.com' },
          student: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              userId: { type: 'number', example: 1 },
              nim: { type: 'string', example: '123456789' },
              statusStudent: {
                type: 'string',
                example: 'ACTIVE',
              },
              programStudi: {
                type: 'string',
                example: 'Teknik Informatika',
              },
              academicAdvisorId: {
                type: 'number',
                example: 1,
              },
              fakultas: {
                type: 'string',
                example: 'Fakultas Teknik',
              },
              createdAt: {
                type: 'string',
                example: '2023-01-01T00:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                example: '2023-01-01T00:00:00.000Z',
              },
            },
          },
          createdAt: {
            type: 'string',
            example: '2023-01-01T00:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            example: '2023-01-01T00:00:00.000Z',
          },
          token: {
            type: 'string',
            example: '765ceff9-ed3b-44b6-89ec-46bd58758e58',
          },
          recoveryToken: { type: 'string', example: null },
        },
      },
    },
  },
};

export const StudentResponseGetStudent = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Login success' },
      data: {
        type: 'object',
        example: {
          id: 1,
          name: 'John Doe',
          email: 'pKQ9T@example.com',
          role: 'STUDENT',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          token: 'token',
          recoveryToken: null,
          student: {
            id: 1,
            userId: 1,
            nim: '12345678',
            statusStudent: 'ACTIVE',
            programStudi: 'Teknik Informatika',
            academicAdvisorId: 1,
            fakultas: 'Fakultas Teknik',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
          },
        },
      },
    },
  },
};
