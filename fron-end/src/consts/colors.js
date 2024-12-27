export const colors = {
    FC: 'orange-500',
    EP: 'cyan-500',
    IP: 'pink-500',
    RC: 'green-500',
    RU: 'purple-500',
    PP: 'blue-500',
    PW: 'red-500'
};

export const getColors = (array, prefix) => {
    return array.map((item) => `${prefix}${colors[item]}`);
};
