import Vue from 'vue'
import Vue2Editor, { Quill } from 'vue2-editor'

import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'

Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
Vue.use(Vue2Editor)
