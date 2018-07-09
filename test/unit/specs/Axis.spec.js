import { mount } from '@vue/test-utils'
import * as d3 from 'd3'
import Axis from '@/components/Axis.vue'

const createCmp = propsData => mount(Axis, { propsData })

describe('Axis.vue', () => {
  let wrapper

  it('has the expected html structure', () => {
    wrapper = createCmp({
      width: 600,
      height: 400,
      scaleX: d3.scaleLinear(),
      scaleY: d3.scaleLinear()
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
