const { Client } = require('pg');
const serverConfig = {
    Port: 8000,
    Url: "SinglePageApp",
    Host: "localhost"
}
const client = new Client({
    user: process.env.user || "user",
    host: process.env.host || "localhost",
    database: process.env.database || "db",
    password: process.env.password,
    port: process.env.port || 5432,
});
 
module.exports = {client, serverConfig}