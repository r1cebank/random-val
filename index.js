class RandomVal {
    constructor(initValue) {
        this.values = initValue || [];
        this.currentIndex = 0;
    }
    add(data) {
        if (!this.values.includes(data)) {
            this.values.push(data);
        }
    }
    get(index) {
        return this.values[index];
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
    getRoundRobin() {
        const currentValue = this.values[this.currentIndex];
        this.currentIndex = (this.currentIndex === this.values.length - 1) ? 0 : this.currentIndex + 1;
        return currentValue;
    }
    resetRoundRobin() {
        this.currentIndex = 0;
    }
}

export default RandomVal;
