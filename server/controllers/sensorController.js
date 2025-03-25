import { supabase } from '../config/supabase.js';

// Get the latest sensor data
export const getSensorData = async (req, res) => {
  try {
    // Query the latest record from the sensor_data table
    const { data, error } = await supabase
      .from('sensor_data')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      res.status(200).json(data[0]);
    } else {
      res.status(404).json({ message: 'No sensor data found' });
    }
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    res.status(500).json({ message: 'Failed to fetch sensor data', error: error.message });
  }
};

// Save new sensor data
export const saveSensorData = async (req, res) => {
  try {
    const { fsr1, fsr2, fsr3 } = req.body;

    // Validate input
    if (fsr1 === undefined || fsr2 === undefined || fsr3 === undefined) {
      return res.status(400).json({ message: 'Missing required sensor values' });
    }

    // Determine status based on pressure value
    const getStatus = (value) => {
      if (value === 0) return 'No pressure';
      if (value < 50) return 'Low pressure';
      if (value < 100) return 'Medium pressure';
      if (value < 150) return 'High pressure';
      return 'Very high pressure';
    };

    // Prepare data for insertion
    const sensorData = {
      fsr1,
      status1: getStatus(fsr1),
      fsr2,
      status2: getStatus(fsr2),
      fsr3,
      status3: getStatus(fsr3),
      timestamp: new Date().toISOString()
    };

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('sensor_data')
      .insert([sensorData])
      .select();

    if (error) {
      throw error;
    }

    res.status(201).json({ message: 'Sensor data saved successfully', data });
  } catch (error) {
    console.error('Error saving sensor data:', error);
    res.status(500).json({ message: 'Failed to save sensor data', error: error.message });
  }
};