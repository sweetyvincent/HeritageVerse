import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const seed = async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    console.log('Starting seed process...');
    
    // In a real app we'd run the schema.sql here or via migrations
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf8');
      await pool.query(schema);
      console.log('Schema created/updated successfully.');
    } else {
      console.log('Warning: schema.sql not found at', schemaPath);
    }
    
    console.log('Note: Seed data is currently simulated in-memory via mockData.ts for offline support.');
    console.log('Seed completed successfully!');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await pool.end();
  }
};

seed();
