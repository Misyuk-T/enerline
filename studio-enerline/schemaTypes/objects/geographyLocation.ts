import { defineField, defineType } from 'sanity';

import { GeographyLocationKind } from '../../types/content';

export const geographyLocationSchema = defineType({
  name: 'geographyLocation',
  title: 'Точка на карті',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Назва',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'Місто',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Адреса',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Опис',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Тип точки',
      type: 'string',
      options: {
        list: [
          { title: 'Офіс', value: GeographyLocationKind.Headquarters },
          { title: 'Клієнт', value: GeographyLocationKind.Client },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'x',
      title: 'Позиція X (%)',
      type: 'number',
      validation: (rule) => rule.required().min(0).max(100),
    }),
    defineField({
      name: 'y',
      title: 'Позиція Y (%)',
      type: 'number',
      validation: (rule) => rule.required().min(0).max(100),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'city',
    },
  },
});
