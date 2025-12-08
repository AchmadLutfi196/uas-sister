// prisma/seed.ts - Script untuk membuat akun admin
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Hash password untuk admin
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Cek apakah admin sudah ada
    const existingAdmin = await prisma.user.findFirst({
        where: {
            role: 'ADMIN',
        },
    });

    if (existingAdmin) {
        console.log('⚠️ Admin sudah ada dengan email:', existingAdmin.email);
        return;
    }

    // Buat akun admin
    const admin = await prisma.user.create({
        data: {
            name: 'Administrator',
            email: 'admin@sister.ac.id',
            password: hashedPassword,
            role: 'ADMIN',
            Admin: {
                create: {},
            },
        },
        include: {
            Admin: true,
        },
    });

    console.log('✅ Admin berhasil dibuat:');
    console.log('   Email:', admin.email);
    console.log('   Password: admin123');
    console.log('   Role:', admin.role);
}

main()
    .catch((e) => {
        console.error('❌ Error saat seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
