import type { StructureBuilder } from 'sanity/structure';

import { singletonDocumentTitles, singletonDocumentTypes } from '../constants';

export const siteStructure = (structureBuilder: StructureBuilder) =>
  structureBuilder
    .list()
    .title('Контент сайту')
    .items(
      singletonDocumentTypes.map((documentType) =>
        structureBuilder
          .listItem()
          .id(documentType)
          .title(singletonDocumentTitles[documentType])
          .child(
            structureBuilder
              .editor()
              .id(documentType)
              .schemaType(documentType)
              .documentId(documentType)
              .title(singletonDocumentTitles[documentType]),
          ),
      ),
    );
