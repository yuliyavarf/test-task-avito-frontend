import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container } from '@mui/material';
import { ItemForm } from './components/ItemForm';
import { ItemsList } from './components/ItemsList';
import { ItemDetails } from './components/ItemDetails';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path="/form" element={<ItemForm />} />
            <Route path="/list" element={<ItemsList />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/" element={<ItemsList />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App; 