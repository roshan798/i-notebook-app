export const getRelativeTime = (
    createTimeDate: string | number | Date
): string => {
    const now = new Date() 
    const createdAtDate = new Date(createTimeDate) 
    const diffInSeconds = Math.floor(
        (now.getTime() - createdAtDate.getTime()) / 1000
    ) 

    const intervals = [
        { label: 'y', seconds: 31536000 },
        { label: 'mo', seconds: 2592000 },
        { label: 'd', seconds: 86400 },
        { label: 'h', seconds: 3600 },
        { label: 'm', seconds: 60 },
        { label: 's', seconds: 1 },
    ];

    // Iterate through the intervals to find the appropriate label and count
    for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i]
        const count = Math.floor(diffInSeconds / interval.seconds)
        if (count > 0) {
            return count === 1
                ? `1${interval.label} ago`
                : `${count} ${interval.label}s ago`
        }
    }

    return 'just now'
}

export const formatDate = (dateString: string | number | Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }
    return new Intl.DateTimeFormat('en-IN', options).format(
        new Date(dateString)
    )
}
