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
    IconUsers,
    IconBook,
    IconCalendar,
    IconSettings,
    IconSun,
    IconMoon,
    IconBell,
    IconLogout,
    IconUser,
    IconSchool,
    IconChevronRight,
    IconChartBar,
    IconNews,
    IconCoin,
} from '@tabler/icons-react'
import { useAuth } from '../context'
import styles from './AdminLayout.module.css'

const navItems = [
    { icon: IconHome, label: 'Dashboard', href: '/admin/dashboard', description: 'Ringkasan sistem' },
    { icon: IconUsers, label: 'Manajemen User', href: '/admin/users', description: 'Kelola pengguna' },
    { icon: IconSchool, label: 'Mahasiswa', href: '/admin/students', description: 'Data mahasiswa' },
    { icon: IconUser, label: 'Dosen', href: '/admin/teachers', description: 'Data dosen' },
    { icon: IconBook, label: 'Mata Kuliah', href: '/admin/courses', description: 'Kelola mata kuliah' },
    { icon: IconCalendar, label: 'Jadwal', href: '/admin/schedules', description: 'Kelola jadwal' },
    { icon: IconCoin, label: 'Pembayaran', href: '/admin/payments', description: 'Data pembayaran' },
    { icon: IconNews, label: 'Berita', href: '/admin/news', description: 'Kelola berita' },
    { icon: IconChartBar, label: 'Laporan', href: '/admin/reports', description: 'Laporan & statistik' },
    { icon: IconSettings, label: 'Pengaturan', href: '/admin/settings', description: 'Konfigurasi sistem' },
]

export function AdminLayout() {
    const [opened, { toggle }] = useDisclosure()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

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
                            <Badge variant="filled" color="red" size="xs" ml={8}>
                                Admin
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
                            >
                                {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
                            </ActionIcon>
                        </Tooltip>

                        <Menu shadow="lg" width={220} position="bottom-end" withArrow>
                            <Menu.Target>
                                <ActionIcon variant="subtle" size="lg" radius="xl">
                                    <Avatar
                                        size="sm"
                                        color="red"
                                        radius="xl"
                                    >
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </Avatar>
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Paper p="sm" style={{ background: 'transparent' }}>
                                    <Group>
                                        <Avatar color="red" radius="xl" size="md">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <div>
                                            <Text fw={600} size="sm">{user?.name}</Text>
                                            <Text size="xs" c="dimmed">{user?.email}</Text>
                                        </div>
                                    </Group>
                                </Paper>
                                <Divider my="xs" />
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
                                <Divider my="xs" />
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
                        Admin Panel
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
