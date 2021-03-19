export const readFile = (file) => {
    let reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort();
            reject(new DOMException("Cannot parse file. "));
        };

        reader.onload = (e) => resolve(e.target.result);
        reader.readAsText(file);
    });
}