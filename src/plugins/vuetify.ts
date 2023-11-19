import '@mdi/font/css/materialdesignicons.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
// override vuetify styles
import 'vuetify/styles';
import { createVuetify, type ThemeDefinition } from 'vuetify';
import { aliases, md } from 'vuetify/iconsets/md';
import { mdi } from 'vuetify/iconsets/mdi';

const basicTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFF',
    primary: '#00AE31', // green
    'primary-darken-1': '#096200',
    secondary: '#7204E0', // purple
    'secondary-darken-1': '#4a078c',
    'app-yellow': '#FFE785',
    surface: '#FFFFFF',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
};

export default createVuetify({
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
      mdi,
    },
  },
  theme: {
    defaultTheme: 'basicTheme',
    themes: {
      basicTheme,
    },
  },
});