import RandomVal from '../index.js';

test('Correctly generate randomVal instance', () => {
    expect(typeof (new RandomVal())).toBe('object');
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
    expect(randomVal.getVal('random-0')).not.toBe('random-0');
    expect(randomVal.getVal('random-0')).toBe('random-1');
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
    expect(randomVal.getVal('random-3')).not.toBe('random-3');
});
