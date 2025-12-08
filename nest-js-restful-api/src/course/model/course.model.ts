/* eslint-disable prettier/prettier */
export const CourseRequestCreate = {
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'PAW' },
      code: { type: 'string', example: 'S140' },
      sks: { type: 'number', example: 4 },
      semester: { type: 'string', example: 'semester_3' },
      programStudi: { type: 'string', example: 'Informatika' },
      fakultas: { type: 'string', example: 'Fakultas Teknik' },
    },
    required: [
      'name',
      'code',
      'sks',
      'semester',
      'programStudi',
      'fakultas',
    ],
  },
};

export const CourseResponseCreate = {
  status: 201,
  description: 'Created a new course',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Course created successfully' },
      data: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'PAW' },
          code: { type: 'string', example: 'S140' },
          sks: { type: 'number', example: 4 },
          semester: { type: 'string', example: 'semester_3' },
          programStudi: { type: 'string', example: 'Informatika' },
          fakultas: { type: 'string', example: 'Fakultas Teknik' },
          createAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
          updateAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
        },
      },
    },
  },
};

export const CourseRequestUpdate = {
  schema: {
    type: 'object',
    properties: {
      code: { type: 'string', example: 'S140' },
      name: { type: 'string', example: 'DPW' },
      sks: { type: 'number', example: 4 },
      semester: { type: 'string', example: 'semester_2' },
      programStudi: { type: 'string', example: 'Informatika' },
      fakultas: { type: 'string', example: 'Fakultas Teknik' },
    },
  },
};

export const CourseResponseUpdate = {
  status: 201,
  description: 'Updated course',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Course updated successfully' },
      data: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'DPW' },
          code: { type: 'string', example: 'S140' },
          sks: { type: 'number', example: 4 },
          semester: { type: 'string', example: 'semester_2' },
          programStudi: { type: 'string', example: 'Informatika' },
          fakultas: { type: 'string', example: 'Fakultas Teknik' },
          createAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
          updateAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
        },
      },
    },
  },
};

export const CourseRequestDelete = {
  name: 'code',
  description: 'Course code',
  required: true,
  example: 'S140',
};

export const CourseResponseDelete = {
  status: 200,
  description: 'Course deleted successfully',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Course deleted successfully' },
      data: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'PAW' },
          code: { type: 'string', example: 'S140' },
          sks: { type: 'number', example: 4 },
          semester: { type: 'string', example: 'semester_2' },
          programStudi: { type: 'string', example: 'Informatika' },
          fakultas: { type: 'string', example: 'Fakultas Teknik' },
          createAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
          updateAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
        },
      },
    },
  },
};

export const CourseResponseGetCourses = {
  status: 200,
  description: 'Get all courses',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success get courses' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'PAW' },
            code: { type: 'string', example: 'S140' },
            sks: { type: 'number', example: 4 },
            semester: { type: 'string', example: 'semester_2' },
            programStudi: { type: 'string', example: 'Informatika' },
            fakultas: { type: 'string', example: 'Fakultas Teknik' },
            createAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
            updateAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
            schedule: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  day: { type: 'string', example: 'Senin' },
                  time: { type: 'string', example: '08:00-10:00' },
                  room: { type: 'string', example: 'Lab CC' },
                },
              },
            },
            teacher: {
              type: 'object',
              properties: {
                nip: { type: 'string', example: '123456789' },
                gelar: { type: 'string', example: 'Profesor' },
                keahlian: { type: 'string', example: 'Web Programmer' },
                user: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    name: { type: 'string', example: 'John Doe' },
                    email: { type: 'string', example: 'XHkQO@example.com' },
                    password: { type: 'string', example: 'password' },
                    role: { type: 'string', example: 'TEACHER' },
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
              },
            },
          },
        },
      },
    },
  },
};

export const CourseRequestGetCourse = {
  name: 'code',
  description: 'Course code',
  required: true,
  example: 'S140',
};

export const CourseResponseGetCourse = {
  status: 200,
  description: 'Get course by code',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success get course' },
      data: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'PAW' },
          code: { type: 'string', example: 'S140' },
          sks: { type: 'number', example: 4 },
          semester: { type: 'string', example: 'semester_2' },
          programStudi: { type: 'string', example: 'Informatika' },
          fakultas: { type: 'string', example: 'Fakultas Teknik' },
          createAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
          updateAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
        },
      },
    },
  },
};

export const CourseRequestGetCoursesByName = {
  name: 'name',
  description: 'Course name',
  required: true,
  example: 'PAW',
};

export const CourseResponseGetCoursesByName = {
  status: 200,
  description: 'Get course by name',
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success get course' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'PAW' },
            code: { type: 'string', example: 'S140' },
            sks: { type: 'number', example: 4 },
            semester: { type: 'string', example: 'semester_2' },
            programStudi: { type: 'string', example: 'Informatika' },
            fakultas: { type: 'string', example: 'Fakultas Teknik' },
            createAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
            updateAt: { type: 'string', example: '2022-11-17T16:00:00.000Z' },
          },
        },
      },
    },
  },
};
