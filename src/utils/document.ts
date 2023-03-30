export const getSassVariable = (name: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
}