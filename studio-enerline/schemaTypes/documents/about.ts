import { defineArrayMember, defineField, defineType } from 'sanity';

import { SectionId } from '../../types/content';

export const aboutSchema = defineType({
  name: SectionId.About,
  title: 'Про компанію',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Опис',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Зображення слайдера',
      type: 'array',
      of: [defineArrayMember({ type: 'imageWithAlt' })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'facts',
      title: 'Картки фактів',
      type: 'array',
      of: [defineArrayMember({ type: 'aboutFact' })],
      validation: (rule) => rule.required().min(3),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
