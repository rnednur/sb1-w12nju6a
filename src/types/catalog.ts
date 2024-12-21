export interface Catalog {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  user_id: string;
}

export interface Table {
  id: string;
  catalog_id: string;
  name: string;
  schema: string;
  description: string | null;
  created_at: string;
}

export interface Column {
  id: string;
  table_id: string;
  name: string;
  data_type: string;
  description: string | null;
  is_nullable: boolean;
  created_at: string;
}

export interface Relationship {
  id: string;
  catalog_id: string;
  source_table_id: string;
  target_table_id: string;
  relationship_type: string;
  created_at: string;
}