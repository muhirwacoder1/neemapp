import express from 'express';
import { getSensorData, saveSensorData } from '../controllers/sensorController.js';

const router = express.Router();

// Get latest sensor data
router.get('/latest', getSensorData);

// Save new sensor data
router.post('/data', saveSensorData);

export { router as sensorRoutes };