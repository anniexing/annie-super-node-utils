"use strict";
var MySqlUtils = require("./mysql-utils.js");
var mysql = new MySqlUtils({
    host: "localhost",
    user: "root",
    password: "N0rikos123",
    database: "sakila"
})
async function startTest() {
    try {
        var result = await mysql.query("select * from actor where actor_id=:actorId", { actorId: 1 });
        console.log("result:", result);
    } catch (err) {
        console.log("error:", err);
    } finally {
        mysql.release();
    }
    
    console.log("done.");
}

startTest().catch(err => {
    console.log("wow", err);
})