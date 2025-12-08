import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
    AppShell,
    Burger,
    Group,
    NavLink,
    Text,
    ActionIcon,
    useMantineColorScheme,
    Tooltip,
    Badge,
    Box,
    Avatar,
    Menu,
    Divider,
    Paper,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
    IconHome,
    IconBook,
    IconCalendar,
    IconCreditCard,
    IconSettings,
    IconSun,
    IconMoon,
    IconBell,
    IconLogout,
    IconUser,
    IconClipboardList,
    IconSchool,
    IconChevronRight,
} from '@tabler/icons-react'
import { useAuth } from '../context'
import type { UserWithStudent } from '../types'
import styles from './StudentLayout.module.css'

const navItems = [
    { icon: IconHome, label: 'Dashboard', href: '/student/dashboard', description: 'Beranda utama' },
    { icon: IconClipboardList, label: 'KRS', href: '/student/krs', description: 'Kartu Rencana Studi' },
    { icon: IconCalendar, label: 'Jadwal Kuliah', href: '/student/schedule', description: 'Lihat jadwal' },
    { icon: IconBook, label: 'Absensi', href: '/student/absensi', description: 'Kehadiran kuliah' },
    { icon: IconSchool, label: 'Nilai', href: '/student/grades', description: 'Transkrip nilai' },
    { icon: IconCreditCard, label: 'Pembayaran', href: '/student/payment', description: 'Status pembayaran' },
    { icon: IconSettings, label: 'Pengaturan', href: '/student/settings', description: 'Konfigurasi akun' },
]

export function StudentLayout() {
    const [opened, { toggle }] = useDisclosure()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const studentUser = user as UserWithStudent

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    const isDark = colorScheme === 'dark'

    return (
        <AppShell
            header={{ height: 70 }}
            navbar={{
                width: 280,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
            className={styles.shell}
        >
            <AppShell.Header className={styles.header}>
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <Box className={styles.logo}>
                            <Text size="xl" fw={800} className="gradient-text">
                                SISTER
                            </Text>
                            <Badge variant="light" color="violet" size="xs" ml={8}>
                                Student
                            </Badge>
                        </Box>
                    </Group>

                    <Group gap="xs">
                        <Tooltip label="Notifikasi" withArrow>
                            <ActionIcon
                                variant="subtle"
                                size="lg"
                                radius="xl"
                                color="gray"
                                style={{ transition: 'all 0.2s ease' }}
                            >
                                <IconBell size={20} />
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip label={isDark ? 'Mode Terang' : 'Mode Gelap'} withArrow>
                            <ActionIcon
                                onClick={toggleColorScheme}
                                variant="subtle"
                                size="lg"
                                radius="xl"
                                color="gray"
                                style={{
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                            >
                                {isDark ? (
                                    <IconSun size={20} style={{ transition: 'transform 0.3s ease' }} />
                                ) : (
                                    <IconMoon size={20} style={{ transition: 'transform 0.3s ease' }} />
                                )}
                            </ActionIcon>
                        </Tooltip>

                        <Menu shadow="lg" width={220} position="bottom-end" withArrow>
                            <Menu.Target>
                                <ActionIcon variant="subtle" size="lg" radius="xl">
                                    <Avatar
                                        size="sm"
                                        color="violet"
                                        radius="xl"
                                        style={{
                                            border: '2px solid var(--border-color)',
                                            transition: 'border-color 0.2s ease',
                                        }}
                                    >
                                        {studentUser?.name?.charAt(0).toUpperCase()}
                                    </Avatar>
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown style={{
                                background: 'var(--bg-card)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid var(--border-color)',
                            }}>
                                <Paper p="sm" style={{ background: 'transparent' }}>
                                    <Group>
                                        <Avatar color="violet" radius="xl" size="md">
                                            {studentUser?.name?.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <div>
                                            <Text fw={600} size="sm">{studentUser?.name}</Text>
                                            <Text size="xs" c="dimmed">{studentUser?.student?.nim}</Text>
                                        </div>
                                    </Group>
                                </Paper>
                                <Divider my="xs" color="var(--border-color)" />
                                <Menu.Item
                                    leftSection={<IconUser size={16} />}
                                    rightSection={<IconChevronRight size={14} />}
                                >
                                    Profil
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconSettings size={16} />}
                                    rightSection={<IconChevronRight size={14} />}
                                >
                                    Pengaturan
                                </Menu.Item>
                                <Divider my="xs" color="var(--border-color)" />
                                <Menu.Item
                                    color="red"
                                    leftSection={<IconLogout size={16} />}
                                    onClick={handleLogout}
                                >
                                    Keluar
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md" className={styles.navbar}>
                <Box className={styles.navContent}>
                    <Text size="xs" fw={600} c="dimmed" mb="md" tt="uppercase" style={{ letterSpacing: '0.05em' }}>
                        Menu Utama
                    </Text>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.href}
                            label={
                                <Text size="sm" fw={500}>
                                    {item.label}
                                </Text>
                            }
                            description={
                                <Text size="xs" c="dimmed">
                                    {item.description}
                                </Text>
                            }
                            leftSection={<item.icon size={20} stroke={1.5} />}
                            active={location.pathname === item.href}
                            onClick={() => {
                                navigate(item.href)
                                toggle()
                            }}
                            className={styles.navLink}
                            variant="filled"
                            style={{
                                '--nav-link-bg': location.pathname === item.href
                                    ? 'var(--nav-active-bg)'
                                    : 'transparent',
                            } as React.CSSProperties}
                        />
                    ))}
                </Box>
            </AppShell.Navbar>

            <AppShell.Main className={styles.main}>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}
