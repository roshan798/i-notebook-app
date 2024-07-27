import { useEffect } from 'react'
import { Snackbar, Alert, Slide, SlideProps } from '@mui/material'
import { useNotification } from '../../contexts/NotificationContext'

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />
}
const Notification = () => {
    const { notifications, removeNotification } = useNotification()

    useEffect(() => {
        if (notifications.length > 0) {
            const timer = setTimeout(() => {
                removeNotification(notifications[0].id)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [notifications, removeNotification])

    return (
        <>
            {notifications.map((notification) => (
                <Snackbar
                    key={notification.id}
                    open={true}
                    autoHideDuration={notification.delay}
                    onClose={() => removeNotification(notification.id)}
                    anchorOrigin={notification.anchorOrigin}
                    TransitionComponent={SlideTransition}>
                    <Alert
                        onClose={() => removeNotification(notification.id)}
                        severity={notification.type}
                        sx={{ width: '100%' }}>
                        {notification.message}
                    </Alert>
                </Snackbar>
            ))}
        </>
    )
}

export default Notification
