class RandomVal {
    constructor(initValue) {
        this.values = initValue || [];
    }
    add(data) {
        if (!this.values.includes(data)) {
            this.values.push(data);
        }
    }
    getVal(ignored) {
        if (ignored && this.values.includes(ignored)) {
            const ignoredIndex = this.values.indexOf(ignored);
            const valueClone = this.values.slice(0);
            valueClone.splice(ignoredIndex, 1);
            const randomIndex = Math.floor(Math.random() * valueClone.length);
            return valueClone[randomIndex];
        }
        const randomIndex = Math.floor(Math.random() * this.values.length);
        return this.values[randomIndex];
    }
}

export default RandomVal;
