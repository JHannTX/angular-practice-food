export function getIndex(object: Object, type: string): number {
    return Object.keys(object).indexOf(type);
}