import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';
import vuetify from '@/plugins/vuetify';

describe('HomeView', () => {
  it('renders properly', () => {
    const wrapper = mount(HomeView, {
      global: { plugins: [vuetify] },
    });
    expect(wrapper).exist;
  });
});
