import { sql } from '@vercel/postgres';
import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Test the connection
async function testConnection() {
  try {
    await pool.query('SELECT NOW()');
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw new Error('Failed to connect to database');
  }
}

// Initialize connection
testConnection().catch(console.error);

// Export both the sql helper and the pool for different use cases
export { sql, pool };

// Helper function to handle database errors
export function handleDatabaseError(error: unknown): never {
  console.error('Database error:', error);
  throw new Error('An error occurred while accessing the database');
}

// Example usage
async function getData() {
  try {
    const result = await sql`SELECT * FROM your_table`;
    return result.rows;
  } catch (error) {
    handleDatabaseError(error);
  }
} 