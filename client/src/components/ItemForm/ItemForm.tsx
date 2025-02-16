import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { Item, ItemType } from '../types/item';
import * as yup from 'yup';


// Создание и редактирование объявлений
const schema = yup.object().shape({
  name: yup.string().required('Название обязательно'),
  description: yup.string().required('Описание обязательно'),
  location: yup.string().required('Локация обязательна'),
  image: yup.string().url('Некорректный URL').notRequired(),
  type: yup.string().required('Тип объявления обязателен'),
  
  propertyType: yup.string().when('type', {
    is: 'Недвижимость',
    then: yup.string().required('Тип недвижимости обязателен'),
    otherwise: yup.string().notRequired(),
  }),
  area: yup.number().when('type', {
    is: 'Недвижимость',
    then: yup.number().required('Площадь обязательна').positive('Должно быть положительным'),
    otherwise: yup.number().notRequired(),
  }),
  rooms: yup.number().when('type', {
    is: 'Недвижимость',
    then: yup.number().required('Количество комнат обязательно').positive('Должно быть положительным').integer('Должно быть целым числом'),
    otherwise: yup.number().notRequired(),
  }),
  price: yup.number().when('type', {
    is: 'Недвижимость',
    then: yup.number().required('Цена обязательна').positive('Должно быть положительным'),
    otherwise: yup.number().notRequired(),
  }),

  brand: yup.string().when('type', {
    is: 'Авто',
    then: yup.string().required('Марка автомобиля обязательна'),
    otherwise: yup.string().notRequired(),
  }),
  model: yup.string().when('type', {
    is: 'Авто',
    then: yup.string().required('Модель автомобиля обязательна'),
    otherwise: yup.string().notRequired(),
  }),
  year: yup.number().when('type', {
    is: 'Авто',
    then: yup.number().required('Год выпуска обязателен').positive('Должен быть положительным').integer('Должен быть целым числом'),
    otherwise: yup.number().notRequired(),
  }),
  mileage: yup.number().when('type', {
    is: 'Авто',
    then: yup.number().notRequired(),
    otherwise: yup.number().notRequired(),
  }),

  serviceType: yup.string().when('type', {
    is: 'Услуги',
    then: yup.string().required('Тип услуги обязателен'),
    otherwise: yup.string().notRequired(),
  }),
  experience: yup.number().when('type', {
    is: 'Услуги',
    then: yup.number().required('Опыт работы обязателен').positive('Должен быть положительным').integer('Должен быть целым числом'),
    otherwise: yup.number().notRequired(),
  }),
  cost: yup.number().when('type', {
    is: 'Услуги',
    then: yup.number().required('Стоимость услуги обязательна').positive('Должна быть положительной'),
    otherwise: yup.number().notRequired(),
  }),
  workSchedule: yup.string().when('type', {
    is: 'Услуги',
    then: yup.string().notRequired(),
    otherwise: yup.string().notRequired(),
  }),
});

interface ItemFormProps {
  initialData?: Item;
  onSubmit: (data: Omit<Item, 'id'>) => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({ initialData, onSubmit }) => {
  const [itemType, setItemType] = React.useState<ItemType>(
    initialData?.type || 'Недвижимость'
  );

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(schema),
  });

  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setItemType(event.target.value as ItemType);
  };

  const onSubmitHandler: SubmitHandler<Omit<Item, 'id'>> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Typography variant="h5" gutterBottom>
        {initialData ? 'Редактировать объявление' : 'Создать новое объявление'}
      </Typography>

      <TextField
        {...register('name')}
        label="Название"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register('description')}
        label="Описание"
        fullWidth
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <TextField
        {...register('location')}
        label="Локация"
        fullWidth
        error={!!errors.location}
        helperText={errors.location?.message}
      />

      <FormControl fullWidth>
        <InputLabel>Тип объявления</InputLabel>
        <Select
          value={itemType}
          onChange={handleTypeChange}
          {...register('type')}
          error={!!errors.type}
        >
          <MenuItem value="Недвижимость">Недвижимость</MenuItem>
          <MenuItem value="Авто">Авто</MenuItem>
          <MenuItem value="Услуги">Услуги</MenuItem>
        </Select>
        {errors.type && <span>{errors.type.message}</span>}
      </FormControl>

      {/* Поля для недвижимости */}
      {itemType === 'Недвижимость' && (
        <>
          <TextField
            {...register('propertyType')}
            label="Тип недвижимости"
            fullWidth
            error={!!errors.propertyType}
            helperText={errors.propertyType?.message}
          />
          <TextField
            {...register('area')}
            label="Площадь (кв. м)"
            type="number"
            fullWidth
            error={!!errors.area}
            helperText={errors.area?.message}
          />
          <TextField
            {...register('rooms')}
            label="Количество комнат"
            type="number"
            fullWidth
            error={!!errors.rooms}
            helperText={errors.rooms?.message}
          />
          <TextField
            {...register('price')}
            label="Цена"
            type="number"
            fullWidth
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        </>
      )}

      {/* Поля для авто */}
      {itemType === 'Авто' && (
        <>
          <TextField
            {...register('brand')}
            label="Марка автомобиля"
            fullWidth
            error={!!errors.brand}
            helperText={errors.brand?.message}
          />
          <TextField
            {...register('model')}
            label="Модель автомобиля"
            fullWidth
            error={!!errors.model}
            helperText={errors.model?.message}
          />
          <TextField
            {...register('year')}
            label="Год выпуска"
            type="number"
            fullWidth
            error={!!errors.year}
            helperText={errors.year?.message}
          />
          <TextField
            {...register('mileage')}
            label="Пробег (км)"
            type="number"
            fullWidth
            error={!!errors.mileage}
            helperText={errors.mileage?.message}
          />
        </>
      )}

      {/* Поля для услуг */}
      {itemType === 'Услуги' && (
        <>
          <TextField
            {...register('serviceType')}
            label="Тип услуги"
            fullWidth
            error={!!errors.serviceType}
            helperText={errors.serviceType?.message}
          />
          <TextField
            {...register('experience')}
            label="Опыт работы (лет)"
            type="number"
            fullWidth
            error={!!errors.experience}
            helperText={errors.experience?.message}
          />
          <TextField
            {...register('cost')}
            label="Стоимость услуги"
            type="number"
            fullWidth
            error={!!errors.cost}
            helperText={errors.cost?.message}
          />
          <TextField
            {...register('workSchedule')}
            label="График работы"
            fullWidth
            error={!!errors.workSchedule}
            helperText={errors.workSchedule?.message}
          />
        </>
      )}

      <Button type="submit" variant="contained">
        {initialData ? 'Сохранить' : 'Создать'}
      </Button>
    </form>
  );
};