import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CatalogCard } from './catalog/CatalogCard';
import { CatalogForm } from './catalog/CatalogForm';
import { Modal } from './ui/Modal';
import { useCatalogs } from '../hooks/useCatalogs';

export function CatalogList() {
  const { catalogs, loading, refetch } = useCatalogs();
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Data Catalogs</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Catalog
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catalogs.map((catalog) => (
          <CatalogCard key={catalog.id} catalog={catalog} />
        ))}
      </div>

      <Modal
        title="Create New Catalog"
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      >
        <CatalogForm
          onClose={() => setShowCreateModal(false)}
          onSuccess={refetch}
        />
      </Modal>
    </div>
  );
}