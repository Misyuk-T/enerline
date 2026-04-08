import { defineField, defineType } from 'sanity';

import { AboutFactIcon } from '../../types/content';

export const aboutFactSchema = defineType({
  name: 'aboutFact',
  title: 'Факт про компанію',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Іконка',
      type: 'string',
      options: {
        list: [
          { title: 'Локація', value: AboutFactIcon.MapPin },
          { title: 'Обладнання', value: AboutFactIcon.Cog },
          { title: 'Сонячний напрямок', value: AboutFactIcon.SunMedium },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Текст',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'icon',
    },
  },
});
