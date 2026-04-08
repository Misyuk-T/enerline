import { defineArrayMember, defineField, defineType } from 'sanity';

import { SectionId } from '../../types/content';

export const advantagesSchema = defineType({
  name: SectionId.Advantages,
  title: 'Переваги',
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
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Картки переваг',
      type: 'array',
      of: [defineArrayMember({ type: 'advantageItem' })],
      validation: (rule) => rule.required().min(3),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
