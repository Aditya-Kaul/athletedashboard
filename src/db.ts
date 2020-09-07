import Sequelize from 'sequelize';

const dev = {
    db: "testdb",
    username: "root",
    password: "password"
}

console.log("In db.ts");
const db = new Sequelize(
    dev.db,
    dev.username,
    dev.password,

    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

db.authenticate();

export default db;