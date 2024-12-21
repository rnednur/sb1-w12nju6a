/*
  # Data Catalog Schema

  1. New Tables
    - `catalogs`: Stores catalog information
      - `id` (uuid, primary key)
      - `name` (text): Name of the catalog
      - `description` (text): Description of the catalog
      - `created_at` (timestamp)
      - `user_id` (uuid): Reference to the authenticated user

    - `tables`: Stores table metadata
      - `id` (uuid, primary key)
      - `catalog_id` (uuid): Reference to the catalog
      - `name` (text): Table name
      - `schema` (text): Schema name
      - `description` (text): Table description
      - `created_at` (timestamp)

    - `columns`: Stores column metadata
      - `id` (uuid, primary key)
      - `table_id` (uuid): Reference to the table
      - `name` (text): Column name
      - `data_type` (text): Data type of the column
      - `description` (text): Column description
      - `is_nullable` (boolean): Whether the column can be null
      - `created_at` (timestamp)

    - `relationships`: Stores relationships between tables
      - `id` (uuid, primary key)
      - `catalog_id` (uuid): Reference to the catalog
      - `source_table_id` (uuid): Source table
      - `target_table_id` (uuid): Target table
      - `relationship_type` (text): Type of relationship
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Catalogs table
CREATE TABLE catalogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

ALTER TABLE catalogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own catalogs"
  ON catalogs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Tables table
CREATE TABLE tables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  catalog_id uuid REFERENCES catalogs(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  schema text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage tables in their catalogs"
  ON tables
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM catalogs
      WHERE catalogs.id = tables.catalog_id
      AND catalogs.user_id = auth.uid()
    )
  );

-- Columns table
CREATE TABLE columns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id uuid REFERENCES tables(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  data_type text NOT NULL,
  description text,
  is_nullable boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE columns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage columns in their tables"
  ON columns
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tables
      JOIN catalogs ON catalogs.id = tables.catalog_id
      WHERE tables.id = columns.table_id
      AND catalogs.user_id = auth.uid()
    )
  );

-- Relationships table
CREATE TABLE relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  catalog_id uuid REFERENCES catalogs(id) ON DELETE CASCADE NOT NULL,
  source_table_id uuid REFERENCES tables(id) ON DELETE CASCADE NOT NULL,
  target_table_id uuid REFERENCES tables(id) ON DELETE CASCADE NOT NULL,
  relationship_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE relationships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage relationships in their catalogs"
  ON relationships
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM catalogs
      WHERE catalogs.id = relationships.catalog_id
      AND catalogs.user_id = auth.uid()
    )
  );