import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

// Configure dotenv
dotenv.config();

// ES modules equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "cldb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET || "your_secret_key",
      (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      }
    );
  } else {
    res.sendStatus(401);
  }
};

// Routes
app.post(
  "/api/signup/candidat",
  upload.fields([
    { name: "CV", maxCount: 1 },
    { name: "lettreMotivation", maxCount: 1 },
    { name: "imageProfil", maxCount: 1 }, // Add profile image to the upload fields
  ]),
  async (req, res) => {
    try {
      // Get text fields from both body and files
      const {
        email,
        motdepass,
        telephone,
        adresse,
        TwoFactorEnable,
        dateNaissance,
        competences,
        experience,
        formation,
        disponible,
        salaireAttendu,
        langues,
        profileURL,
      } = req.body;

      // Hash password
      const hashedPassword = await bcrypt.hash(motdepass, 10);

      // Start transaction
      const conn = await pool.getConnection();
      await conn.beginTransaction();

      try {
        // Handle profile image path
        let imageProfilPath = null;
        if (req.files.imageProfil && req.files.imageProfil[0]) {
          imageProfilPath = req.files.imageProfil[0].path;
        }

        // Insert into Utilisateur
        const [userResult] = await conn.query(
          "INSERT INTO Utilisateur (email, motdepass, telephone, adresse, imageProfil, TwoFactorEnable) VALUES (?, ?, ?, ?, ?, ?)",
          [
            email,
            hashedPassword,
            telephone,
            adresse,
            imageProfilPath, // Use the file path instead of URL
            TwoFactorEnable || false,
          ]
        );

        const userId = userResult.insertId;

        // Insert into Membre
        await conn.query(
          "INSERT INTO Membre (id, dateNaissance, competences, experience, formation, disponible, salaireAttendu, langues, profileURL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            userId,
            dateNaissance,
            competences,
            experience,
            formation,
            disponible,
            salaireAttendu,
            langues, // This now comes as a comma-separated string from the frontend
            profileURL,
          ]
        );

        // Handle file uploads
        if (req.files.CV) {
          await conn.query(
            "INSERT INTO Fichiers (utilisateur_id, type_fichier, chemin_fichier) VALUES (?, ?, ?)",
            [userId, "CV", req.files.CV[0].path]
          );
        }

        if (req.files.lettreMotivation) {
          await conn.query(
            "INSERT INTO Fichiers (utilisateur_id, type_fichier, chemin_fichier) VALUES (?, ?, ?)",
            [userId, "LettreMotivation", req.files.lettreMotivation[0].path]
          );
        }

        await conn.commit();
        conn.release();

        res.status(201).json({ message: "Candidat registered successfully" });
      } catch (error) {
        await conn.rollback();
        conn.release();
        console.error("Database error:", error);
        throw error;
      }
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        error: "Registration failed",
        details: error.message,
      });
    }
  }
);

// Similarly update the entreprise route if needed
app.post(
  "/api/signup/entreprise",
  upload.single("imageProfil"), // Handle single file upload for entreprise
  async (req, res) => {
    try {
      const {
        email,
        motdepass,
        telephone,
        adresse,
        TwoFactorEnable,
        secteurActivite,
        tailleEntreprise,
        description,
        sitwebURL,
      } = req.body;

      const hashedPassword = await bcrypt.hash(motdepass, 10);

      // Handle profile image path
      let imageProfilPath = null;
      if (req.file) {
        imageProfilPath = req.file.path;
      }

      const conn = await pool.getConnection();
      await conn.beginTransaction();

      try {
        const [userResult] = await conn.query(
          "INSERT INTO Utilisateur (email, motdepass, telephone, adresse, imageProfil, TwoFactorEnable) VALUES (?, ?, ?, ?, ?, ?)",
          [
            email,
            hashedPassword,
            telephone,
            adresse,
            imageProfilPath,
            TwoFactorEnable || false,
          ]
        );

        const userId = userResult.insertId;

        await conn.query(
          "INSERT INTO Entreprise (id, secteurActivite, tailleEntreprise, description, sitwebURL) VALUES (?, ?, ?, ?, ?)",
          [userId, secteurActivite, tailleEntreprise, description, sitwebURL]
        );

        await conn.commit();
        conn.release();

        res.status(201).json({ message: "Entreprise registered successfully" });
      } catch (error) {
        await conn.rollback();
        conn.release();
        console.error("Database error:", error);
        throw error;
      }
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        error: "Registration failed",
        details: error.message,
      });
    }
  }
);

app.post("/api/signup/entreprise", async (req, res) => {
  try {
    const {
      email,
      motdepass,
      telephone,
      adresse,
      imageProfil,
      TwoFactorEnable,
      secteurActivite,
      tailleEntreprise,
      description,
      sitwebURL,
    } = req.body;

    const hashedPassword = await bcrypt.hash(motdepass, 10);

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
      const [userResult] = await conn.query(
        "INSERT INTO Utilisateur (email, motdepass, telephone, adresse, imageProfil, TwoFactorEnable) VALUES (?, ?, ?, ?, ?, ?)",
        [
          email,
          hashedPassword,
          telephone,
          adresse,
          imageProfil,
          TwoFactorEnable || false,
        ]
      );

      const userId = userResult.insertId;

      await conn.query(
        "INSERT INTO Entreprise (id, secteurActivite, tailleEntreprise, description, sitwebURL) VALUES (?, ?, ?, ?, ?)",
        [userId, secteurActivite, tailleEntreprise, description, sitwebURL]
      );

      await conn.commit();
      conn.release();

      res.status(201).json({ message: "Entreprise registered successfully" });
    } catch (error) {
      await conn.rollback();
      conn.release();
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, motdepass } = req.body;

    const [users] = await pool.query(
      "SELECT u.*, m.id AS isMembre, e.id AS isEntreprise, a.id AS isAdmin FROM Utilisateur u " +
        "LEFT JOIN Membre m ON u.id = m.id " +
        "LEFT JOIN Entreprise e ON u.id = e.id " +
        "LEFT JOIN Admin a ON u.id = a.id " +
        "WHERE u.email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(motdepass, user.motdepass);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Determine user type
    let userType = "unknown";
    if (user.isAdmin) userType = "admin";
    else if (user.isMembre) userType = "membre";
    else if (user.isEntreprise) userType = "entreprise";

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, userType },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    res.json({ token, userType, userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.get("/api/user/:id", authenticateJWT, async (req, res) => {
  try {
    const userId = req.params.id;

    // Verify the requesting user has access to this data
    if (req.user.userId != userId && req.user.userType !== "admin") {
      return res.sendStatus(403);
    }

    // Get base user info
    const [users] = await pool.query("SELECT * FROM Utilisateur WHERE id = ?", [
      userId,
    ]);
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];
    let userData = {
      id: user.id,
      email: user.email,
      telephone: user.telephone,
      adresse: user.adresse,
      datecreation: user.datecreation,
      imageProfil: user.imageProfil,
      TwoFactorEnable: user.TwoFactorEnable,
    };

    // Get specific user type data
    if (req.user.userType === "membre" || req.user.userType === "admin") {
      const [membres] = await pool.query("SELECT * FROM Membre WHERE id = ?", [
        userId,
      ]);
      if (membres.length > 0) {
        userData = { ...userData, ...membres[0], userType: "membre" };

        // Get files
        const [files] = await pool.query(
          "SELECT * FROM Fichiers WHERE utilisateur_id = ?",
          [userId]
        );
        userData.files = files;
      }
    }

    if (req.user.userType === "entreprise" || req.user.userType === "admin") {
      const [entreprises] = await pool.query(
        "SELECT * FROM Entreprise WHERE id = ?",
        [userId]
      );
      if (entreprises.length > 0) {
        userData = { ...userData, ...entreprises[0], userType: "entreprise" };
      }
    }

    if (req.user.userType === "admin") {
      const [admins] = await pool.query("SELECT * FROM Admin WHERE id = ?", [
        userId,
      ]);
      if (admins.length > 0) {
        userData = { ...userData, ...admins[0], userType: "admin" };
      }
    }

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
