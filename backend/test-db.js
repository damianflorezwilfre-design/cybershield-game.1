const mongoose = require('mongoose');

const uri = "mongodb+srv://damianflorezwilfre_db_user:rSVvhGxszqCQa0tS@cluster0.lrtdcev.mongodb.net/cybershield?appName=Cluster0";

async function testConnection() {
    try {
        console.log("Intentando conectar a Atlas...");
        await mongoose.connect(uri);
        console.log("¡CONEXIÓN EXITOSA!");
        process.exit(0);
    } catch (err) {
        console.error("ERROR DE CONEXIÓN:", err.message);
        process.exit(1);
    }
}

testConnection();
