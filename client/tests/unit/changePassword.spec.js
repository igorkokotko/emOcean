import { mount, createLocalVue } from '@vue/test-utils'
import ChangePassword from '@/views/Settings/Tabs/ChangePassword/index.vue'
import AuthForgot from '@/views/Authentication/AuthForgot.vue'
import VueRouter from "vue-router"
import routes from "@/router/index.js"

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('ChangePassword', () => {
  it('has a button with text FORGOT PASSWORD', () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(ChangePassword, { localVue, router })

    router.push("/forgotpassword")

    expect(wrapper.find(AuthForgot).exists()).toBe(true)
  })
})
