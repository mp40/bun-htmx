const name = ['Leo', 'Roy', 'Sam', 'Joe', 'Ben', 'Ray', 'Avi', 'Ian', 'Dan', 'Tom']

export function getRandomName(): string{
    const max = name.length - 1;
    const index =  Math.floor(Math.random() * (max - 0 + 1)) + 0;
    const d = new Date()
    return `${name[index]}_${d.getMilliseconds()}`
}