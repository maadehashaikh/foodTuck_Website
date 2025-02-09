import type { StructureResolver } from 'sanity/structure'
import type { ListBuilder } from '@sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S: ListBuilder) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems())
