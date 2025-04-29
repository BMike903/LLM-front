export function asterisksToBold(str: string) {
    while (str.includes("**")) {
        str = str.replace("**", "<b>");
        str = str.replace("**", "</b>");
    }
    return str;
}
