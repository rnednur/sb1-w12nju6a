import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CatalogList } from './components/CatalogList';
import { CatalogDetail } from './components/CatalogDetail';
import { KnowledgeGraph } from './components/KnowledgeGraph';
import { Auth } from './components/Auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<CatalogList />} />
          <Route path="/catalogs/:id" element={<CatalogDetail />} />
          <Route path="/catalogs/:id/graph" element={<KnowledgeGraph />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;