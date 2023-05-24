export type NotificationType = {
    text: string
    variant?: 'success' | 'info' | 'error' | 'warning'
    callback?: () => void
}
