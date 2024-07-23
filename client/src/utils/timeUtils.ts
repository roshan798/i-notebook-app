export const getRelativeTime = (
    createTimeDate: string | number | Date
): string => {
    const now = new Date() // Get the current date and time
    const createdAtDate = new Date(createTimeDate) // Parse the input date
    const diffInSeconds = Math.floor(
        (now.getTime() - createdAtDate.getTime()) / 1000
    ) // Calculate the difference in seconds

    // Define time intervals in seconds for various units
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ]

    // Iterate through the intervals to find the appropriate label and count
    for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i]
        const count = Math.floor(diffInSeconds / interval.seconds)
        if (count > 0) {
            return count === 1
                ? `1 ${interval.label} ago`
                : `${count} ${interval.label}s ago`
        }
    }

    return 'just now'
}

export const formatDate = (dateString: string | number | Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }
    return new Intl.DateTimeFormat('en-IN', options).format(
        new Date(dateString)
    )
}
