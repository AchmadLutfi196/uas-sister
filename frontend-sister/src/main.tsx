import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme, virtualColor } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'

// Import Mantine styles
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'

import App from './App.tsx'
import './index.css'

// Custom Mantine theme with consistent colors
const theme = createTheme({
  primaryColor: 'violet',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  },
  colors: {
    violet: [
      '#f3e8ff',
      '#e9d5ff',
      '#d8b4fe',
      '#c084fc',
      '#a855f7',
      '#9333ea',
      '#7c3aed',
      '#6d28d9',
      '#5b21b6',
      '#4c1d95',
    ],
    // Virtual color for primary text that auto-adapts
    primary: virtualColor({
      name: 'primary',
      dark: 'gray',
      light: 'dark',
    }),
  },
  defaultRadius: 'md',
  // Component-level customization for consistent theming
  components: {
    // Text component
    Text: {
      defaultProps: {
        color: 'inherit',
      },
    },
    // Title component
    Title: {
      defaultProps: {
        color: 'inherit',
      },
    },
    // Card component
    Card: {
      styles: () => ({
        root: {
          color: 'var(--text-primary)',
        },
      }),
    },
    // Paper component
    Paper: {
      styles: () => ({
        root: {
          color: 'var(--text-primary)',
        },
      }),
    },
    // Table component
    Table: {
      styles: () => ({
        table: {
          color: 'var(--text-primary)',
        },
        th: {
          color: 'var(--text-secondary)',
        },
        td: {
          color: 'var(--text-primary)',
        },
      }),
    },
    // Menu component
    Menu: {
      styles: () => ({
        dropdown: {
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
        },
        item: {
          color: 'var(--text-primary)',
        },
        label: {
          color: 'var(--text-secondary)',
        },
      }),
    },
    // NavLink component
    NavLink: {
      styles: () => ({
        root: {
          color: 'var(--text-primary)',
        },
        label: {
          color: 'inherit',
        },
        description: {
          color: 'var(--text-secondary)',
        },
      }),
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <ModalsProvider>
        <Notifications position="top-right" />
        <App />
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>,
)
