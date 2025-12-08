/* eslint-disable prettier/prettier */
import { Role } from 'src/types/user.type';
import { v4 as uuid } from 'uuid';

export const AdminRequestRegister = {
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'John Doe' },
      email: { type: 'string', example: 'V9xv2@example.com' },
      password: { type: 'string', example: 'password123' },
    },
    required: ['name', 'email', 'password'],
  },
};

export const AdminResponseRegister = {
  status: 201,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Admin created successfully' },
      data: {
        type: 'object',
        example: {
          id: 1,
          name: 'John Doe',
          email: 'pKQ9T@example.com',
          role: 'ADMIN',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          token: null,
          recoveryToken: null,
        },
      },
    },
  },
};

export const AdminRequestLogin = {
  schema: {
    type: 'object',
    properties: {
      email: { type: 'string', example: 'V9xv2@example.com' },
      password: { type: 'string', example: 'password123' },
    },
    required: ['email', 'password'],
  },
};

export const AdminResponseLogin = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Admin logged in successfully' },
      data: {
        type: 'object',
        example: {
          id: 1,
          name: 'John Doe',
          email: 'pKQ9T@example.com',
          role: 'ADMIN',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          token: uuid(),
          recoveryToken: null,
        },
      },
    },
  },
};

export const AdminResponseLogout = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'admin logged out successfully' },
      data: {
        type: 'object',
        example: {
          id: 1,
          name: 'John Doe',
          email: 'pKQ9T@example.com',
          role: 'ADMIN',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          token: null,
          recoveryToken: null,
        },
      },
    },
  },
};

export const AdminRequestUpdate = {
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'John' },
      email: { type: 'string', example: 'pKQ9T@example.com' },
      password: { type: 'string', example: 'password123' },
    },
  },
};

export const AdminResponseUpdate = {
  status: 201,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'User updated successfully' },
      data: {
        type: 'object',
        example: {
          id: 1,
          name: 'John',
          email: 'pKQ9T@example.com',
          role: 'ADMIN',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          token: null,
          recoveryToken: null,
        },
      },
    },
  },
};

export const AdminRequestUpdateUser = {
  schema: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      role: { type: 'string', enum: Object.values(Role) },
      name: { type: 'string', example: 'John' },
      email: { type: 'string', example: 'pKQ9T@example.com' },
      password: { type: 'string', example: 'password123' },
    },
    required: ['id', 'role'],
  },
};

export const AdminResponseUpdateUser = {
  status: 201,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'User updated successfully' },
      data: {
        type: 'object',
        example: {
          id: 1,
          name: 'John',
          email: 'pKQ9T@example.com',
          role: 'ADMIN',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          token: null,
          recoveryToken: null,
        },
      },
    },
  },
};

export const AdminRequestDeleteUser = {
  schema: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      role: { type: 'string', enum: Object.values(Role) },
    },
    required: ['id', 'role'],
  },
};

export const AdminResponseDeleteUser = {
  status: 201,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'User deleted successfully' },
      data: {
        type: 'object',
        example: {
          id: 1,
          name: 'John',
          email: 'pKQ9T@example.com',
          role: 'ADMIN',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          token: null,
          recoveryToken: null,
        },
      },
    },
  },
};

export const AdminRequestGetStudentName = {
  name: 'name',
  example: 'John',
  required: false,
  description: 'Name of the student',
};

export const AdminResponseGetStudentName = {
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
            name: { type: 'string', example: 'John' },
            email: { type: 'string', example: 'pKQ9T@example.com' },
            role: { type: 'string', example: 'STUDENT' },
            createdAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
            },
            token: { type: 'string', example: null },
            recoveryToken: { type: 'string', example: null },
          },
        },
      },
    },
  },
};

export const AdminRequestGetTeacherName = {
  name: 'name',
  example: 'John',
  required: false,
  description: 'Name of the teacher',
};

export const AdminResponseGetTeacherName = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success get teacher' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John' },
            email: { type: 'string', example: 'pKQ9T@example.com' },
            role: { type: 'string', example: 'TEACHER' },
            createdAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
            },
            token: { type: 'string', example: null },
            recoveryToken: { type: 'string', example: null },
          },
        },
      },
    },
  },
};

export const AdminRequestGetStudentId = {
  name: 'id',
  required: true,
  description: 'ID of the student',
};

export const AdminResponseGetStudentId = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success get student' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John' },
          email: { type: 'string', example: 'pKQ9T@example.com' },
          role: { type: 'string', example: 'STUDENT' },
          createdAt: {
            type: 'string',
            example: '2022-01-01T00:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            example: '2022-01-01T00:00:00.000Z',
          },
          token: { type: 'string', example: null },
          recoveryToken: { type: 'string', example: null },
        },
      },
    },
  },
};

export const AdminRequestGetTeacherId = {
  name: 'id',
  required: true,
  description: 'ID of the teacher',
};

export const AdminResponseGetTeacherId = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success get teacher' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John' },
          email: { type: 'string', example: 'pKQ9T@example.com' },
          role: { type: 'string', example: 'TEACHER' },
          createdAt: {
            type: 'string',
            example: '2022-01-01T00:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            example: '2022-01-01T00:00:00.000Z',
          },
          token: { type: 'string', example: null },
          recoveryToken: { type: 'string', example: null },
        },
      },
    },
  },
};

export const AdminResponseUsers = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success get users' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John' },
            email: { type: 'string', example: 'pKQ9T@example.com' },
            role: { type: 'string', example: 'STUDENT' },
            createdAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              example: '2022-01-01T00:00:00.000Z',
            },
            token: { type: 'string', example: null },
            recoveryToken: { type: 'string', example: null },
          },
        },
      },
    },
  },
}

export const AdminResponseDetail = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success get user' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John' },
          email: { type: 'string', example: 'pKQ9T@example.com' },
          role: { type: 'string', example: 'ADMIN' },
          createdAt: {
            type: 'string',
            example: '2022-01-01T00:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            example: '2022-01-01T00:00:00.000Z',
          },
          token: { type: 'string', example: null },
          recoveryToken: { type: 'string', example: null },
        },
      },
    },
  },
}