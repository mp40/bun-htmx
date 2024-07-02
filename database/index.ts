import {db} from './init'

export type Equipment = {
    id: number,
    name: string,
    weight: number
}

export type Character = {
    id: number,
    userId: number,
    name: string,
    str: number,
    int: number,
    wil: number,
    hlt: number,
    agi: number
}

export function getAllEquipment(): Equipment[] | null {
    if(!db) {
        console.log('db error')
        return null
    }

    const changes = db.query("SELECT * FROM equipment;").all()
    return changes as Equipment[];
}

export function createCharacter(payload: Omit<Character, "id">): Character | null {
    if(!db) {
        console.log('db error')
        return null
    }

    const q = db.query("INSERT INTO character (userId, name, str, int, wil, hlt, agi) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7) RETURNING *")

    const character = q.get({
        "?1": payload.userId,
        "?2": payload.name,
        "?3": payload.str,
        "?4": payload.int,
        "?5": payload.wil,
        "?6": payload.hlt,
        "?7": payload.agi
    })

    return character as Character;
}

export function getCharactersByUser(userId: number): Character[] | null {
    if(!db) {
        console.log('db error')
        return null
    }

    const characters = db.query("SELECT * FROM character WHERE userId = ?1;").all({"?1": userId})
    return characters as Character[];
}