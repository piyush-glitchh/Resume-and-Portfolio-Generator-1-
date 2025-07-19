-- Create the portfolios table with correct column names
CREATE TABLE IF NOT EXISTS portfolios (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  template TEXT NOT NULL,
  customization JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_portfolios_created_at ON portfolios(created_at);

-- Enable Row Level Security
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (portfolios are meant to be shared)
CREATE POLICY "Allow public read access" ON portfolios
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON portfolios
  FOR INSERT WITH CHECK (true);
