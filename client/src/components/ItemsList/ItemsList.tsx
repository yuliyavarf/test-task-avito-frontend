import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  Pagination,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { itemsApi } from '../../services/api';
import { ItemType } from '../../types/item';

// Список всех объявлений
export const ItemsList: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<ItemType | ''>('');

  const { data: items, isLoading } = useQuery(['items'], itemsApi.getAll);

  const filteredItems = items?.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (!selectedType || item.type === selectedType)
  ) || [];

  const paginatedItems = filteredItems.slice((page - 1) * 5, page * 5);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 2 }}>
      <Button 
        variant="contained" 
        onClick={() => navigate('/form')}
        sx={{ mb: 2 }}
      >
        Разместить объявление
      </Button>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as ItemType)}
          displayEmpty
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Все категории</MenuItem>
          <MenuItem value="Недвижимость">Недвижимость</MenuItem>
          <MenuItem value="Авто">Авто</MenuItem>
          <MenuItem value="Услуги">Услуги</MenuItem>
        </Select>
      </Box>

      <Grid container spacing={2}>
        {paginatedItems.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>{item.location}</Typography>
                <Typography>{item.type}</Typography>
                <Button 
                  onClick={() => navigate(`/item/${item.id}`)}
                  variant="outlined"
                >
                  Открыть
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(filteredItems.length / 5)}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{ mt: 2 }}
      />
    </Box>
  );
}; 