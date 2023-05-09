export const mergeArrays = (arrays: unknown[][]) => {
    const mergedArray = arrays.reduce((prev, current) => {
        return prev.concat(current);
    }, []);
    return mergedArray.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
};
