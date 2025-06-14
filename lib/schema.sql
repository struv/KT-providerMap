-- Create providers table
CREATE TABLE IF NOT EXISTS providers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create clinics table
CREATE TABLE IF NOT EXISTS clinics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_providers_coordinates ON providers (latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_clinics_coordinates ON clinics (latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_providers_name ON providers (name);
CREATE INDEX IF NOT EXISTS idx_clinics_name ON clinics (name);

-- Add comments to tables and columns
COMMENT ON TABLE providers IS 'Healthcare providers with their location information';
COMMENT ON TABLE clinics IS 'Medical clinics with their location information';

COMMENT ON COLUMN providers.latitude IS 'Latitude in decimal degrees (DECIMAL(10,8))';
COMMENT ON COLUMN providers.longitude IS 'Longitude in decimal degrees (DECIMAL(11,8))';
COMMENT ON COLUMN clinics.latitude IS 'Latitude in decimal degrees (DECIMAL(10,8))';
COMMENT ON COLUMN clinics.longitude IS 'Longitude in decimal degrees (DECIMAL(11,8))'; 