// utils/characterColors.ts

export const getColorForCharacter = (char: string): string => {
    const colorMap: { [key: string]: string } = {
        'A': '#f44336',  // Red
        'B': '#e91e63',  // Pink
        'C': '#9c27b0',  // Purple
        'D': '#673ab7',  // Deep Purple
        'E': '#3f51b5',  // Indigo
        'F': '#2196f3',  // Blue
        'G': '#03a9f4',  // Light Blue
        'H': '#00bcd4',  // Cyan
        'I': '#009688',  // Teal
        'J': '#4caf50',  // Green
        'K': '#8bc34a',  // Light Green
        'L': '#cddc39',  // Lime
        'M': '#ffeb3b',  // Yellow
        'N': '#ffc107',  // Amber
        'O': '#ff9800',  // Orange
        'P': '#ff5722',  // Deep Orange
        'Q': '#795548',  // Brown
        'R': '#9e9e9e',  // Grey
        'S': '#607d8b',  // Blue Grey
        'T': '#000000',  // Black
        'U': '#ffffff',  // White
        'V': '#f48fb1',  // Pink (Light)
        'W': '#b39ddb',  // Purple (Light)
        'X': '#c5e1a5',  // Light Green (Light)
        'Y': '#ffab91',  // Deep Orange (Light)
        'Z': '#e57373',  // Red (Light)
    };

    return colorMap[char.toUpperCase()] || '#9e9e9e'; 
};
