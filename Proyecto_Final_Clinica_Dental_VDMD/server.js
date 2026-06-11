const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cors());

// ── Contraseña de administrador ──
const PASSWORD_ADMIN = "admin123"; // Cambia esta contraseña por una más segura en producción
function verificarPassword(password) {
    return password === PASSWORD_ADMIN;
}

// ── Conexión a MongoDB Atlas ──
const MONGO_URI = "mongodb://a24308051280862_db_user:vale123@ac-ffxb5po-shard-00-00.xgixgdn.mongodb.net:27017,ac-ffxb5po-shard-00-01.xgixgdn.mongodb.net:27017,ac-ffxb5po-shard-00-02.xgixgdn.mongodb.net:27017/ClinicaDental?ssl=true&replicaSet=atlas-sd5kr6-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB exitosamente"))
    .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// ═══════════════════════════════════════
//  ESQUEMAS Y MODELOS
// ═══════════════════════════════════════

// Pacientes — campos usados en inicio.html
const PacienteSchema = new mongoose.Schema({
    numero:                 String,
    nombre:                 String,
    nacimiento_edad:        String,
    estado_civil_ocupacion: String,
    direccion:              String,
    datos_medicos:          String,
    emergencia:             String
});
const Paciente = mongoose.model('Paciente', PacienteSchema);

// Doctores / Dentistas — campos usados en inicio.html
const DoctorSchema = new mongoose.Schema({
    numero:       String,
    nombre:       String,
    especialidad: String,
    horario:      String,
    academica:    String,
    fiscales:     String,
    contacto:     String
});
const Doctor = mongoose.model('Doctor', DoctorSchema);

// Consultorios — campos usados en inicio.html
const ConsultorioSchema = new mongoose.Schema({
    tipo_sala:            String,
    estado:               String,
    equipamiento:         String,
    ultima_limpieza:      String,
    eficiencia_operativa: String
});
const Consultorio = mongoose.model('Consultorio', ConsultorioSchema);

// Historial Clínico — campos usados en inicio.html
const HistorialClinicoSchema = new mongoose.Schema({
    id_paciente:        String,
    doctor_responsable: String,
    procedimiento:      String,
    reprogramacion:     String,
    adeudo:             String,
    sala:               String,
    hora_atencion:      String,
    notas:              String
});
const HistorialClinico = mongoose.model('HistorialClinico', HistorialClinicoSchema);

// ═══════════════════════════════════════
//  RUTAS — PACIENTES
// ═══════════════════════════════════════

app.get('/api/pacientes', async (req, res) => {
    try {
        res.json(await Paciente.find());
    } catch {
        res.status(500).json({ error: "Error al obtener pacientes" });
    }
});

app.post('/api/pacientes', async (req, res) => {
    try {
        const nuevo = new Paciente(req.body);
        await nuevo.save();
        res.json({ mensaje: "Paciente guardado correctamente" });
    } catch {
        res.status(500).json({ error: "Error al registrar paciente" });
    }
});

app.put('/api/pacientes/:id', async (req, res) => {
    try {
        if (!verificarPassword(req.body.password))
            return res.status(401).json({ error: "Contraseña incorrecta" });
        const datos = { ...req.body };
        delete datos.password;
        await Paciente.findByIdAndUpdate(req.params.id, datos);
        res.json({ mensaje: "Paciente actualizado correctamente" });
    } catch {
        res.status(500).json({ error: "Error al actualizar paciente" });
    }
});

app.delete('/api/pacientes/:id', async (req, res) => {
    try {
        if (!verificarPassword(req.body.password))
            return res.status(401).json({ error: "Contraseña incorrecta" });
        await Paciente.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Paciente eliminado correctamente" });
    } catch {
        res.status(500).json({ error: "Error al eliminar paciente" });
    }
});

// ═══════════════════════════════════════
//  RUTAS — DOCTORES / DENTISTAS
// ═══════════════════════════════════════

app.get('/api/doctores', async (req, res) => {
    try {
        res.json(await Doctor.find());
    } catch {
        res.status(500).json({ error: "Error al obtener doctores" });
    }
});

app.post('/api/doctores', async (req, res) => {
    try {
        const nuevo = new Doctor(req.body);
        await nuevo.save();
        res.json({ mensaje: "Dentista guardado correctamente" });
    } catch {
        res.status(500).json({ error: "Error al registrar dentista" });
    }
});

app.put('/api/doctores/:id', async (req, res) => {
    try {
        if (!verificarPassword(req.body.password))
            return res.status(401).json({ error: "Contraseña incorrecta" });
        const datos = { ...req.body };
        delete datos.password;
        await Doctor.findByIdAndUpdate(req.params.id, datos);
        res.json({ mensaje: "Dentista actualizado correctamente" });
    } catch {
        res.status(500).json({ error: "Error al actualizar dentista" });
    }
});

app.delete('/api/doctores/:id', async (req, res) => {
    try {
        if (!verificarPassword(req.body.password))
            return res.status(401).json({ error: "Contraseña incorrecta" });
        await Doctor.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Dentista eliminado correctamente" });
    } catch {
        res.status(500).json({ error: "Error al eliminar dentista" });
    }
});

// ═══════════════════════════════════════
//  RUTAS — CONSULTORIOS
// ═══════════════════════════════════════

app.get('/api/consultorios', async (req, res) => {
    try {
        res.json(await Consultorio.find());
    } catch {
        res.status(500).json({ error: "Error al obtener consultorios" });
    }
});

app.post('/api/consultorios', async (req, res) => {
    try {
        const nuevo = new Consultorio(req.body);
        await nuevo.save();
        res.json({ mensaje: "Consultorio guardado correctamente" });
    } catch {
        res.status(500).json({ error: "Error al registrar consultorio" });
    }
});

app.put('/api/consultorios/:id', async (req, res) => {
    try {
        if (!verificarPassword(req.body.password))
            return res.status(401).json({ error: "Contraseña incorrecta" });
        const datos = { ...req.body };
        delete datos.password;
        await Consultorio.findByIdAndUpdate(req.params.id, datos);
        res.json({ mensaje: "Consultorio actualizado correctamente" });
    } catch {
        res.status(500).json({ error: "Error al actualizar consultorio" });
    }
});

app.delete('/api/consultorios/:id', async (req, res) => {
    try {
        if (!verificarPassword(req.body.password))
            return res.status(401).json({ error: "Contraseña incorrecta" });
        await Consultorio.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Consultorio eliminado correctamente" });
    } catch {
        res.status(500).json({ error: "Error al eliminar consultorio" });
    }
});

// ═══════════════════════════════════════
//  RUTAS — HISTORIAL CLÍNICO
// ═══════════════════════════════════════

app.get('/api/historialesClinico', async (req, res) => {
    try {
        res.json(await HistorialClinico.find());
    } catch {
        res.status(500).json({ error: "Error al obtener historiales" });
    }
});

app.post('/api/historialesClinico', async (req, res) => {
    try {
        const nuevo = new HistorialClinico(req.body);
        await nuevo.save();
        res.json({ mensaje: "Historial guardado correctamente" });
    } catch {
        res.status(500).json({ error: "Error al guardar historial" });
    }
});

app.put('/api/historialesClinico/:id', async (req, res) => {
    try {
        if (!verificarPassword(req.body.password))
            return res.status(401).json({ error: "Contraseña incorrecta" });
        const datos = { ...req.body };
        delete datos.password;
        await HistorialClinico.findByIdAndUpdate(req.params.id, datos);
        res.json({ mensaje: "Historial actualizado correctamente" });
    } catch {
        res.status(500).json({ error: "Error al actualizar historial" });
    }
});

app.delete('/api/historialesClinico/:id', async (req, res) => {
    try {
        if (!verificarPassword(req.body.password))
            return res.status(401).json({ error: "Contraseña incorrecta" });
        await HistorialClinico.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Historial eliminado correctamente" });
    } catch {
        res.status(500).json({ error: "Error al eliminar historial" });
    }
});

// ═══════════════════════════════════════
//  INICIO DEL SERVIDOR
// ═══════════════════════════════════════
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));