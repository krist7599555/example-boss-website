import { Database } from "bun:sqlite";
const db = new Database("gimbodata.sqlite");
const data = await db.query('SELECT * FROM users').all()
console.log(data)
// await db.exec('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname text not null, lastname text not null, gender text not null)')

// const users = [
//     { firstname: "Lydia", lastname: "Day", gender: "male" },
//     { firstname: "Celia", lastname: "Lambert", gender: "male" },
//     { firstname: "Chase", lastname: "Price", gender: "female" },
//     { firstname: "Verna", lastname: "Yates", gender: "female" },
//     { firstname: "Martha", lastname: "Hunter", gender: "male" },
//     { firstname: "Duane", lastname: "Myers", gender: "female" },
//     { firstname: "Micheal", lastname: "Padilla", gender: "male" },
//     { firstname: "Anne", lastname: "Harvey", gender: "female" },
//     { firstname: "Aaron", lastname: "Malone", gender: "female" },
//     { firstname: "Katharine", lastname: "Bates", gender: "male" },
//     { firstname: "Luke", lastname: "Morales", gender: "male" },
//   ];

//   for (const u of users) {
//     console.log(u)
//     await db.exec('INSERT INTO users (firstname, lastname, gender) VALUES ($1, $2, $3)',[u.firstname, u.lastname, u.gender])
//   }
//   console.log("DONE")