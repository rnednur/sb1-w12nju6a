import React from 'react';
import { Link } from 'react-router-dom';
import type { Catalog } from '../../types/catalog';

interface CatalogCardProps {
  catalog: Catalog;
}

export function CatalogCard({ catalog }: CatalogCardProps) {
  return (
    <Link
      to={`/catalogs/${catalog.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900">{catalog.name}</h2>
        {catalog.description && (
          <p className="mt-2 text-gray-600">{catalog.description}</p>
        )}
        <div className="mt-4 text-sm text-gray-500">
          Created {new Date(catalog.created_at).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}