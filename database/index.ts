import {db} from './init'

export type Equipment = {
    id: number,
    name: string,
    weight: number
}

export function getAllEquipment(): Equipment[] | null {
    if(!db) {
        console.log('db error')
        return null
    }

    const changes = db.query("SELECT * FROM equipment;").all()
    return changes as Equipment[];
}