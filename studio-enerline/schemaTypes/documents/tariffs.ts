import { defineArrayMember, defineField, defineType } from 'sanity';

import { SectionId } from '../../types/content';

export const tariffsSchema = defineType({
  name: SectionId.Tariffs,
  title: 'Тарифи',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Підзаголовок',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rows',
      title: 'Плани / тарифи',
      type: 'array',
      of: [defineArrayMember({ type: 'tariffRow' })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'note',
      title: 'Примітка',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Текст кнопки',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaHref',
      title: 'Посилання кнопки',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
