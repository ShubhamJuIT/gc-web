
export const getDateFromTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

