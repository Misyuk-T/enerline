import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { singletonDocumentActions, singletonDocumentTypes } from './constants';
import { schemaTypes } from './schemaTypes';
import { siteStructure } from './structure';

export default defineConfig({
  name: 'enerline-studio',
  title: 'Enerline Admin',
  projectId: '62aq38g6',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: siteStructure,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (previousActions, context) =>
      singletonDocumentTypes.includes(context.schemaType)
        ? previousActions.filter(
            (documentAction) =>
              typeof documentAction.action === 'string' &&
              singletonDocumentActions.has(documentAction.action),
          )
        : previousActions,
    newDocumentOptions: (previousOptions, context) =>
      context.creationContext.type === 'global'
        ? previousOptions.filter(
            (templateItem) => !singletonDocumentTypes.includes(templateItem.templateId),
          )
        : previousOptions,
  },
});
