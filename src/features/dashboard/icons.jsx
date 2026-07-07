const base = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
}

export const UsersIcon = () => (
    <svg {...base}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </svg>
)

export const HudIcon = () => (
    <svg {...base}>
        <path d="M12 3l8 8H4l8-8z" />
        <path d="M12 3v16" />
        <path d="M4 11v9" />
        <path d="M20 11v9" />
        <path d="M4 20h16" />
    </svg>
)

export const CalendarIcon = () => (
    <svg {...base}>
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M3.5 10h17" />
        <circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none" />
    </svg>
)

export const BasketIcon = () => (
    <svg {...base}>
        <path d="M4 9h16l-1.5 10.2a2 2 0 0 1-2 1.8H7.5a2 2 0 0 1-2-1.8L4 9z" />
        <path d="M8 9V7a4 4 0 0 1 8 0v2" />
        <path d="M9 13v4" />
        <path d="M15 13v4" />
    </svg>
)

export const TicketIcon = () => (
    <svg {...base}>
        <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z" />
        <path d="M15 5v2" />
        <path d="M15 11v2" />
        <path d="M15 17v2" />
    </svg>
)

export const RevenueIcon = () => (
    <svg {...base}>
        <rect x="2.5" y="6" width="19" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M6 9v.01" />
        <path d="M18 15v.01" />
    </svg>
)
