import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button,
  Box
} from '@mui/material';
import { itemsApi } from '../../services/api';

// Отображение деталей конкретного объявления
export const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: item, isLoading } = useQuery(
    ['item', id],
    () => itemsApi.getById(Number(id))
  );

  if (isLoading) return <div>Loading...</div>;
  if (!item) return <div>Item not found</div>;

  return (
    <Box sx={{ p: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5">{item.name}</Typography>
          <Typography>{item.description}</Typography>
          <Typography>{item.location}</Typography>
          <Typography>Категория: {item.type}</Typography>
          
          {/* Дополнительные поля в зависимости от типа */}
          {item.type === 'Недвижимость' && (
            <>
              <Typography>Тип недвижимости: {item.propertyType}</Typography>
              <Typography>Площадь: {item.area} кв.м</Typography>
              <Typography>Комнаты: {item.rooms}</Typography>
              <Typography>Цена: {item.price}</Typography>
            </>
          )}
          
          <Button 
            onClick={() => navigate(`/form?id=${item.id}`)}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Редактировать
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
