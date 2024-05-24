export interface ShorkEvent {
    default: {
        name: string,
        execute: () => void
    }
}