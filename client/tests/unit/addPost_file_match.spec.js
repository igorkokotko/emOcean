import { shallowMount } from '@vue/test-utils'
import AddPost from '@/views/Feed/AddPost.vue'

describe('AddPost.vue (function upload video)', () => {
  it('case 1. files variable = "video" ', () => {
    const files = 'video'
    const wrapper = shallowMount(AddPost, {
      uploadVideo: { files }
    })
    console.log(wrapper)
  })
})
