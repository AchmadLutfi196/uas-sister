/* eslint-disable prettier/prettier */
import { DynamicModule, Module } from '@nestjs/common';
import { ValidationService } from './validation/validation.service';
import { AdminService } from './admin/admin.service';
import { CourseService } from './course/course.service';
import { EnrollmentService } from './enrollment/enrollment.service';
import { StudentService } from './student/student.service';
import { TeacherService } from './teacher/teacher.service';
import { ScheduleService } from './schedule/schedule.service';
import { AbsensiService } from './absensi/absensi.service';
import { BeasiswaService } from './beasiswa/beasiswa.service';
import { PembayaranService } from './pembayaran/pembayaran.service';
import { BeritaService } from './berita/berita.service';
import { KritikSaranService } from './kritik-saran/kritik-saran.service';
import { AlumniService } from './alumni/alumni.service';
import { UserService } from './user/user.service';
import { EvaluationService } from './evaluation/evaluation.service';
import { AnnouncementsService } from './announcements/announcements.service';

@Module({
  providers: [
    AdminService,
    TeacherService,
    StudentService,
    EnrollmentService,
    CourseService,
    ScheduleService,
    ValidationService,
    AbsensiService,
    BeasiswaService,
    PembayaranService,
    BeritaService,
    KritikSaranService,
    PembayaranService,
    AlumniService,
    UserService,
    EvaluationService,
    AnnouncementsService,
  ],
})
export class ValidationModule {
  static forRoot(): DynamicModule {
    return {
      module: ValidationModule,
      global: true,
      providers: [
        ValidationService,
        AdminService,
        TeacherService,
        StudentService,
        EnrollmentService,
        CourseService,
        ScheduleService,
      ],
      exports: [
        ValidationService,
        AdminService,
        TeacherService,
        StudentService,
        EnrollmentService,
        CourseService,
        ScheduleService,
        AbsensiService,
        BeasiswaService,
        BeritaService,
        KritikSaranService,
        PembayaranService,
        AlumniService,
        UserService,
        EvaluationService,
        AnnouncementsService,
      ],
    };
  }
}
