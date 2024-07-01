import { Database } from "bun:sqlite";

export let db:Database


function createCharacterTable(db:Database){
    console.log('create equipment table')
    const create = db.query("CREATE TABLE character(id INTEGER PRIMARY KEY, userId INTEGER, name TEXT, str INTEGER, int INTEGER, wil INTEGER, hlt INTEGER, agi INTEGER);");
    create.run()
}

function createEquipmentTable(db:Database){
    console.log('create equipment table')
    const create = db.query("CREATE TABLE equipment(id INTEGER, name TEXT, weight FLOAT);");
    create.run()

    console.log("seed eqipment table")
    const seed = db.query("INSERT INTO equipment (id, name, weight) VALUES (1, 'MRE', 1.5), (2, 'D Ration (1 Day)', 0.25), (3, 'LRP Ration', 0.69)")
    seed.run()
}

export function initDatabase(){
    db = new Database(":memory:", {strict: true, readwrite: true});

    createEquipmentTable(db)
    createCharacterTable(db)
}

