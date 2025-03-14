type Events = Record<string, unknown>;
type Listener<Data = any> = (data: Data) => void;

export class EventEmitter<T extends Events> {
    private listeners: Map<keyof T, Set<Listener>> = new Map();

    on<K extends keyof T>(event: K, callback: Listener<T[K]>) {
        let listeners = this.listeners.get(event);
        if (!listeners) {
            listeners = new Set([callback]);

            this.listeners.set(event, listeners);
        } else {
            listeners.add(callback);
        }
        return () => {
            listeners.delete(callback);
        };
    }

    emit<K extends keyof T>(event: K, data: T[K]) {
        const listeners = this.listeners.get(event);
        if (listeners) {
            listeners.forEach((callback) => {
                callback(data);
            });
        }
    }
}
