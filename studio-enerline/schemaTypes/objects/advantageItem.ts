import { defineField, defineType } from 'sanity';

import { AdvantageIcon } from '../../types/content';

export const advantageItemSchema = defineType({
  name: 'advantageItem',
  title: 'Перевага',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Іконка',
      type: 'string',
      options: {
        list: [
          { title: 'Запас енергії', value: AdvantageIcon.Zap },
          { title: 'Промисловість', value: AdvantageIcon.Factory },
          { title: 'Документ / умови', value: AdvantageIcon.FileText },
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
      rows: 4,
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
