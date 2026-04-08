import { defineField, defineType } from 'sanity';

import { SectionId } from '../../types/content';

export const contactsSchema = defineType({
  name: SectionId.Contacts,
  title: 'Контакти',
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
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Телефон',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Регіон',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'formNote',
      title: 'Примітка під формою',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'submitLabel',
      title: 'Текст кнопки',
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
