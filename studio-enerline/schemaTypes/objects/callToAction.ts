import { defineField, defineType } from 'sanity';

export const callToActionSchema = defineType({
  name: 'callToAction',
  title: 'Кнопка / посилання',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Текст',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Посилання',
      type: 'string',
      description: 'Наприклад: #contacts',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'href',
    },
  },
});
