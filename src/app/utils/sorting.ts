export enum SortOrder {
    Ascending = 1,
    Descending = -1
}

export function dynamicSortByName(order: string, direction: SortOrder) {
    return (obj1, obj2) => {
        const result = (obj1[order].toLowerCase() < obj2[order].toLowerCase()) ?
        -1 : (obj1[order].toLowerCase() > obj2[order].toLowerCase()) ?
        1 : 0;
        return result * direction;
    };
}

export function dynamicSortByNum(order: string, direction: SortOrder) {
    return (obj1, obj2) => {
        const result = (obj1[order].length < obj2[order].length) ? -1 : (obj1[order].length > obj2[order].length) ? 1 : 0;
        return result * direction;
    };
}
