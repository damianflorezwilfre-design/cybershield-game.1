const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware de autenticación simple
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No hay token, autorización denegada' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};

// Guardar progreso de nivel
router.post('/progress', auth, async (req, res) => {
  try {
    const { levelId, score, timeSpent, completed } = req.body;
    
    let progress = await Progress.findOne({ userId: req.user.id, levelId });
    
    if (progress) {
      progress.score = Math.max(progress.score, score);
      progress.timeSpent = timeSpent;
      progress.completed = completed || progress.completed;
      await progress.save();
    } else {
      progress = new Progress({
        userId: req.user.id,
        levelId,
        score,
        completed,
        timeSpent
      });
      await progress.save();
    }

    // Actualizar XP global del usuario si completó
    if (completed) {
      const user = await User.findById(req.user.id);
      user.xp += score;
      if (user.currentLevel === levelId) {
          user.currentLevel += 1;
      }
      await user.save();
    }

    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener estadísticas del usuario
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const progress = await Progress.find({ userId: req.user.id });
    res.json({ user, progress });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;
