const Pool = require("pg").Pool;

// Are there any better options than just hard coding the values here?
const pool = new Pool({
    user: process.env.DB_USER,
    // host: "34.131.196.161",
    host: process.env.INSTANCE_UNIX_SOCKET,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    // port: process.env.PORT || 8080
    port: 5432,

});


module.exports = pool;