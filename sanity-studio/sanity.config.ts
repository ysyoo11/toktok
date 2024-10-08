import {defineConfig, isDev} from 'sanity'
import {visionTool} from '@sanity/vision'
import {deskTool} from 'sanity/desk'
import {media} from 'sanity-plugin-media'
import {schema} from './schemas'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import {dataset, projectId} from './env'

const devOnlyPlugins = [getStartedPlugin()]

export default defineConfig({
  name: 'default',
  title: 'TokTok',
  projectId,
  dataset,
  plugins: [deskTool(), visionTool(), media(), ...(isDev ? devOnlyPlugins : [])],
  schema,
})
