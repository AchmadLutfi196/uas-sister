import { useState } from 'react'
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
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
    IconHome,
    IconDashboard,
    IconUsers,
    IconSettings,
    IconChartBar,
    IconSun,
    IconMoon,
    IconBell,
    IconSearch,
} from '@tabler/icons-react'
import styles from './MainLayout.module.css'

interface MainLayoutProps {
    children: React.ReactNode
}

const navItems = [
    { icon: IconHome, label: 'Home', href: '/', active: true },
    { icon: IconDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: IconUsers, label: 'Users', href: '/users', badge: '12' },
    { icon: IconChartBar, label: 'Analytics', href: '/analytics' },
    { icon: IconSettings, label: 'Settings', href: '/settings' },
]

export function MainLayout({ children }: MainLayoutProps) {
    const [opened, { toggle }] = useDisclosure()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const [activeNav, setActiveNav] = useState('/')

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
                            <Text
                                size="xl"
                                fw={800}
                                className="gradient-text"
                            >
                                SISTER
                            </Text>
                            <Badge variant="light" color="violet" size="xs" ml={8}>
                                v1.0
                            </Badge>
                        </Box>
                    </Group>

                    <Group gap="xs">
                        <Tooltip label="Search">
                            <ActionIcon variant="subtle" size="lg" radius="xl" color="gray">
                                <IconSearch size={20} />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Notifications">
                            <ActionIcon variant="subtle" size="lg" radius="xl" color="gray">
                                <IconBell size={20} />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label={colorScheme === 'dark' ? 'Light mode' : 'Dark mode'}>
                            <ActionIcon
                                onClick={toggleColorScheme}
                                variant="subtle"
                                size="lg"
                                radius="xl"
                                color="gray"
                            >
                                {colorScheme === 'dark' ? (
                                    <IconSun size={20} />
                                ) : (
                                    <IconMoon size={20} />
                                )}
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md" className={styles.navbar}>
                <Box className={styles.navContent}>
                    <Text size="xs" fw={500} c="dimmed" mb="sm" tt="uppercase">
                        Navigation
                    </Text>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            leftSection={<item.icon size={20} stroke={1.5} />}
                            rightSection={
                                item.badge ? (
                                    <Badge size="xs" color="violet" variant="filled">
                                        {item.badge}
                                    </Badge>
                                ) : null
                            }
                            active={activeNav === item.href}
                            onClick={(e) => {
                                e.preventDefault()
                                setActiveNav(item.href)
                            }}
                            className={styles.navLink}
                            variant="filled"
                        />
                    ))}
                </Box>
            </AppShell.Navbar>

            <AppShell.Main className={styles.main}>
                {children}
            </AppShell.Main>
        </AppShell>
    )
}
