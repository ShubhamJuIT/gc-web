
export const underscoreCapitalise = (status: string): string => {
    if (!status) {
        return '';
    }

    return status
        .toLowerCase()
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const prepareSearchParamString = (data: {
    q?: string, // query
    p?: string, // page number
    ps?: string,// page size
    at?: string,// account Type (For users only)
    st?: string // user status || course status
}): string => {
    return Object.entries(data)
        .filter(([_, value]) => value)  // Filter out falsy values
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');



}


export const truncateString = (str: string, maxLength: number) => {
    if (str?.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    }
    return str;
}


export const getAlphabetCharacter = (index: number): string => {
    // Using ASCII code to generate A, B, C, ...
    return String.fromCharCode(65 + index); // 65 is ASCII code for 'A'
};