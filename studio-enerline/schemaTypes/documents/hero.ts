import { defineArrayMember, defineField, defineType } from 'sanity';

import { SectionId } from '../../types/content';

export const heroSchema = defineType({
  name: SectionId.Hero,
  title: 'Головний екран',
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
      name: 'highlights',
      title: 'Короткі акценти',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Основна кнопка',
      type: 'callToAction',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Додаткова кнопка',
      type: 'callToAction',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Головне зображення',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
