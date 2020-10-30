import { createMuiTheme } from '@material-ui/core';
import { tokens } from '@equinor/eds-tokens';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: tokens.colors.interactive.primary__resting.hex,
      dark: tokens.colors.interactive.primary__hover.hex,
      light: tokens.colors.interactive.primary__hover_alt.hex,
    },
    secondary: {
      main: tokens.colors.interactive.secondary__resting.hex,
      dark: tokens.colors.interactive.secondary__link_hover.hex,
      light: tokens.colors.interactive.secondary__highlight.hex,
    },
    error: {
      main: tokens.colors.interactive.danger__resting.hex,
      dark: tokens.colors.interactive.danger__hover.hex,
      light: tokens.colors.interactive.danger__highlight.hex,
    },
    warning: {
      main: tokens.colors.interactive.warning__resting.hex,
      dark: tokens.colors.interactive.warning__hover.hex,
      light: tokens.colors.interactive.warning__highlight.hex,
    },
    success: {
      main: tokens.colors.interactive.success__resting.hex,
      dark: tokens.colors.interactive.success__hover.hex,
      light: tokens.colors.interactive.success__highlight.hex,
    },
    background: { default: tokens.colors.ui.background__default.hex },
    text: {
      primary: tokens.colors.text.static_icons__default.hex,
      secondary: tokens.colors.text.static_icons__secondary.hex,
      hint: tokens.colors.text.static_icons__tertiary.hex,
    },
    divider: tokens.colors.ui.background__medium.hex,
  },
  typography: {
    fontFamily: ['Equinor', 'Arial', 'Roboto', 'Helvetica', 'sans-serif'].join(','),
    fontSize: 16,
    htmlFontSize: 16,
  },
  spacing: 8,
  shape: {
    borderRadius: parseInt(tokens.shape.corners.borderRadius.replace('px', '')),
  },
  mixins: {
    toolbar: {
      ...defaultTheme.mixins.toolbar,
      [defaultTheme.breakpoints.up('sm')]: {
        minHeight: 78,
      },
    },
  },
  overrides: {
    MuiTab: {
      root: {
        ...tokens.typography.navigation.menu_tabs,
      },
    },
    MuiAppBar: {
      colorDefault: {
        backgroundColor: tokens.colors.ui.background__default.hex,
      },
    },
    MuiToolbar: {
      regular: {
        [defaultTheme.breakpoints.up('sm')]: {
          minHeight: 64,
        },
      },
      gutters: {
        [defaultTheme.breakpoints.up('sm')]: {
          paddingLeft: 48,
          paddingRight: 48,
        },
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: defaultTheme.spacing(5),
      },
    },
  },
  props: {
    MuiAppBar: {
      color: 'default',
    },
    MuiSnackbar: {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      autoHideDuration: 4000,
    },
  },
});

export default theme;
