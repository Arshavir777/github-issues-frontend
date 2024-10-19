export const formatDateTime = (dateString: string | Date, withTime = true): string => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;

    if (!withTime) {
        return formattedDate;
    }
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    const formattedTime = `${hour12}:${minutes} ${ampm}`;
    return `${formattedDate} ${formattedTime}`;
};
