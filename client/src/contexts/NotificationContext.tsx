import { createContext, useState, useContext, ReactNode } from 'react';

interface Notification {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    id: number;
    anchorOrigin?: {
        vertical: 'top' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
    delay?: number;
}

interface NotificationContextType {
    notifications: Notification[];
    addNotification: (
        message: string,
        type: Notification['type'],
        anchorOrigin?: Notification['anchorOrigin'],
        delay?: number
    ) => void;
    removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [counter, setCounter] = useState(0);

    const addNotification = (
        message: string,
        type: Notification['type'],
        anchorOrigin: Notification['anchorOrigin'] = { vertical: 'bottom', horizontal: 'right' },
        deley: Notification['delay'] = 5000
    ) => {
        setCounter((prevCounter) => prevCounter + 1);
        const newNotification = { message, type, id: counter, anchorOrigin, deley };
        setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    };

    const removeNotification = (id: number) => {
        setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export { NotificationProvider, useNotification };
