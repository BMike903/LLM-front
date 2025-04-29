export function asterisksToBold(str: string) {
    const splitted = str.split("**");
    const result = splitted.map((item, index) => {
        if (index % 2 === 0) {
            return item;
        } else {
            return <b key={index}>{item}</b>;
        }
    });
    return result;
}
