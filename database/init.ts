import { Database } from "bun:sqlite";

export let db:Database

function createEquipment(db:Database){
    console.log('create equipment table')
    const create = db.query("CREATE TABLE equipment(id INTEGER, name TEXT, weight FLOAT);");
    const created = create.run()
    console.log(created)

    console.log("seed eqipment table")
    const seed = db.query("INSERT INTO equipment (id, name, weight) VALUES (1, 'MRE', 1.5), (2, 'D Ration (1 Day)', 0.25), (3, 'LRP Ration', 0.69)")
    const seeded = seed.run()
    console.log(seeded)
}

export function initDatabase(){
    db = new Database(":memory:", {strict: true, readwrite: true});

    createEquipment(db)
}

