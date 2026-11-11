import {type SchemaTypeDefinition} from 'sanity'

import {album} from './album'
import {article} from './article'
import {artist} from './artist'
import {blockContent} from './blockContent'
import {genre} from './genre'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [blockContent, genre, artist, album, article],
}
