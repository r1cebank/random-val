import RandomVal from '../index.js';

test('Correctly generate randomVal instance', () => {
    expect(typeof (new RandomVal())).toBe('object');
    expect((new RandomVal()).currentIndex).toBe(0);
    expect((new RandomVal()).constructor.name).toBe('RandomVal');
    expect(Array.isArray(new RandomVal().values)).toBeTruthy();
});

test('Correctly give initial values', () => {
    const randomVal = new RandomVal([
        'random-0',
        'random-1'
    ]);
    expect(randomVal.values[0]).toBe('random-0');
    expect(randomVal.values[1]).toBe('random-1');
    expect(randomVal.values.length).toBe(2);
});

test('Correctly add given values', () => {
    const randomVal = new RandomVal();
    randomVal.add('random-0');
    randomVal.add('random-1');
    expect(randomVal.values[0]).toBe('random-0');
    expect(randomVal.values[1]).toBe('random-1');
    expect(randomVal.values.length).toBe(2);
});

test('Correctly give index values', () => {
    const randomVal = new RandomVal([
        'random-0',
        'random-1'
    ]);
    expect(randomVal.get(0)).toBe('random-0');
});

test('Support object types', () => {
    const randomVal = new RandomVal([
        new RandomVal(['random-0']),
        new RandomVal(['random-1'])
    ]);
    expect(randomVal.values[0].getExcept()).toBe('random-0');
    expect(randomVal.values[1].getExcept()).toBe('random-1');
    expect(randomVal.values.length).toBe(2);
});

test('Support object except', () => {
    const val1 = { url: 'xxx' };
    const val2 = { url: 'zzz' };
    const randomVal = new RandomVal([
        val1,
        val2
    ]);
    expect(randomVal.getExcept(val1)).toBe(val2);
});

test('Support object get', () => {
    const val1 = { url: 'xxx' };
    const val2 = { url: 'zzz' };
    const randomVal = new RandomVal([
        val1,
        val2
    ]);
    expect(typeof randomVal.getVal()).toBe('object');
});

test('Correctly give random values', () => {
    const randomVal = new RandomVal([
        'random-0',
        'random-1'
    ]);
    expect(randomVal.values.includes(randomVal.getExcept())).toBeTruthy();
});

test('Correctly give random values', () => {
    const randomVal = new RandomVal([
        'random-0',
        'random-1'
    ]);
    expect(randomVal.values.includes(randomVal.getVal())).toBeTruthy();
});

test('Correctly ignore random values', () => {
    const randomVal = new RandomVal([
        'random-0',
        'random-1'
    ]);
    expect(randomVal.getExcept('random-0')).not.toBe('random-0');
    expect(randomVal.getExcept('random-0')).toBe('random-1');
});

test('Correctly get round robin values', () => {
    const randomVal = new RandomVal([
        'random-0'
    ]);
    expect(randomVal.getRoundRobin()).toBe('random-0');
    expect(randomVal.getRoundRobin()).toBe('random-0');
});

test('Correctly get round robin values (2)', () => {
    const randomVal = new RandomVal([
        'random-0',
        'random-1',
        'random-2',
        'random-3',
        'random-4'
    ]);
    expect(randomVal.getRoundRobin()).toBe('random-0');
    expect(randomVal.getRoundRobin()).toBe('random-1');
    expect(randomVal.getRoundRobin()).toBe('random-2');
    expect(randomVal.getRoundRobin()).toBe('random-3');
    expect(randomVal.getRoundRobin()).toBe('random-4');
    expect(randomVal.getRoundRobin()).toBe('random-0');
});

test('Correctly reset round robin', () => {
    const randomVal = new RandomVal([
        'random-0',
        'random-1',
        'random-2',
        'random-3',
        'random-4'
    ]);
    expect(randomVal.getRoundRobin()).toBe('random-0');
    randomVal.resetRoundRobin();
    expect(randomVal.getRoundRobin()).toBe('random-0');
});

test('Correctly ignore random values (2)', () => {
    const randomVal = new RandomVal([
        'random-0',
        'random-1',
        'random-2',
        'random-3',
        'random-4',
        'random-5',
        'random-6',
    ]);
    expect(randomVal.getExcept('random-3')).not.toBe('random-3');
});

test('Correctly distribute values', () => {
    const RUN_TIMES = 2000;
    const randomVal = new RandomVal([
        0,
        1,
        2,
        3,
        4,
        5,
        6,
    ]);
    const hitCount = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < RUN_TIMES; i++) {
        hitCount[randomVal.getExcept()]++;
    }
    const max = Math.max.apply(Math, hitCount);
    const min = Math.min.apply(Math, hitCount);
    expect(((max - min) / RUN_TIMES)).toBeLessThan(0.1);
});
