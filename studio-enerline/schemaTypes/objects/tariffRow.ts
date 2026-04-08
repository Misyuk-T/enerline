import { defineArrayMember, defineField, defineType } from 'sanity';

export const tariffRowSchema = defineType({
  name: 'tariffRow',
  title: 'Тариф',
  type: 'object',
  fields: [
    defineField({
      name: 'category',
      title: 'Категорія',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Тариф',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'conditions',
      title: 'Короткі умови',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'details',
      title: 'Деталі в акордеоні',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'category',
      subtitle: 'price',
    },
  },
});
