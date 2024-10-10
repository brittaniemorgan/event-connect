const express = require('express');
const { Event } = require('../models');
const authenticateToken = require('../middleware/authMiddleware');
const emailService = require('../services/emailService');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOADS_FOLDER);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});


router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    const newEvent = await Event.create({ ...req.body, image: image });
    emailService.sendNewEventEmail(newEvent);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, date, location, category, status } = req.body;
    const image = req.file ? req.file.filename : null;
    console.log(req.body)
    const [updated] = await Event.update({ title, date, location, status, category, image }, { where: { id: req.params.id } });
    if (updated) {
      const updatedEvent = await Event.findByPk(req.params.id);
      emailService.sendEventUpdateEmail(updatedEvent);
      res.json(updatedEvent);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deleted = await Event.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
