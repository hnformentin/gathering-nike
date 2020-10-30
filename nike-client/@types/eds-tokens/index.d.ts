declare module '@equinor/eds-tokens' {
  import { TypographyStyleOptions } from '@material-ui/core/styles/createTypography';

  export interface Color {
    hex: string;
    hsla: string;
    rgba: string;
  }
  export interface Shape {
    minHeight: string;
    minWidth: string;
    borderRadius: string;
  }

  export const tokens: {
    colors: {
      text: {
        static_icons__default: Color;
        static_icons__secondary: Color;
        static_icons__tertiary: Color;
        static_icons__primary_white: Color;
      };
      ui: {
        background__default: Color;
        background__light: Color;
        background__scrim: Color;
        background__overlay: Color;
        background__medium: Color;
        background__info: Color;
        background__warning: Color;
        background__danger: Color;
      };
      infographic: {
        substitute__purple_berry: Color;
        substitute__pink_rose: Color;
        substitute__pink_salmon: Color;
        substitute__green_cucumber: Color;
        substitute__green_succulent: Color;
        substitute__green_mint: Color;
        substitute__blue_ocean: Color;
        substitute__blue_overcast: Color;
        substitute__blue_sky: Color;
        primary__moss_green_100: Color;
        primary__moss_green_55: Color;
        primary__moss_green_34: Color;
        primary__moss_green_21: Color;
        primary__moss_green_13: Color;
        primary__energy_red_100: Color;
        primary__energy_red_55: Color;
        primary__energy_red_34: Color;
        primary__energy_red_21: Color;
        primary__energy_red_13: Color;
        primary__weathered_red: Color;
        primary__slate_blue: Color;
        primary__spruce_wood: Color;
        primary__mist_blue: Color;
        primary__lichen_green: Color;
      };
      logo: {
        fill_positive: Color;
        fill_negative: Color;
      };
      interactive: {
        primary__selected_highlight: Color;
        primary__resting: Color;
        primary__hover: Color;
        primary__hover_alt: Color;
        secondary__highlight: Color;
        secondary__resting: Color;
        secondary__link_hover: Color;
        danger__highlight: Color;
        danger__resting: Color;
        danger__hover: Color;
        danger__text: Color;
        warning__highlight: Color;
        warning__resting: Color;
        warning__hover: Color;
        warning__text: Color;
        success__highlight: Color;
        success__resting: Color;
        success__hover: Color;
        success__text: Color;
        table__cell__fill_resting: Color;
        table__cell__fill_hover: Color;
        table__cell__fill_activated: Color;
        table__header__fill_activated: Color;
        table__header__fill_hover: Color;
        table__header__fill_resting: Color;
        disabled__text: Color;
        text_highlight: Color;
        focus: Color;
        disabled__border: Color;
        disabled__fill: Color;
        link_on_interactive_colors: Color;
        icon_on_interactive_colors: Color;
        link_in_snackbars: Color;
        pressed_overlay_dark: Color;
        field__fill_resting: Color;
        field__fill_hover: Color;
        field__fill_activated: Color;
      };
      tabs: {
        inactive_text: Color;
      };
    };

    shape: {
      circle: Shape;
      rounded: Shape;
      button: Shape;
      corners: Shape;
      icon_button: Shape;
      field: Shape;
      straight: Shape;
      caret: Shape;
    };

    typography: {
      heading: {
        h1_bold: TypographyStyleOptions;
        h1: TypographyStyleOptions;
        h2: TypographyStyleOptions;
        h3: TypographyStyleOptions;
        h4: TypographyStyleOptions;
        h5: TypographyStyleOptions;
        h6: TypographyStyleOptions;
      };
      navigation: {
        menu_title: TypographyStyleOptions;
        menu_tabs: TypographyStyleOptions;
        label: TypographyStyleOptions;
        drawer_active: TypographyStyleOptions;
        drawer_inactive: TypographyStyleOptions;
        button: TypographyStyleOptions;
        breadcrumb: TypographyStyleOptions;
        breadcrumb_hover: TypographyStyleOptions;
      };
      input: {
        label: TypographyStyleOptions;
        text: TypographyStyleOptions;
        text_monospaced: TypographyStyleOptions;
        helper: TypographyStyleOptions;
      };
      paragraph: {
        body_short_italic: TypographyStyleOptions;
        caption: TypographyStyleOptions;
        meta: TypographyStyleOptions;
        body_short: TypographyStyleOptions;
        body_short_bold_italic: TypographyStyleOptions;
        body_short_bold: TypographyStyleOptions;
        body_short_link: TypographyStyleOptions;
        overline: TypographyStyleOptions;
        ingress: TypographyStyleOptions;
        body_long: TypographyStyleOptions;
        body_long_link: TypographyStyleOptions;
        body_long_italic: TypographyStyleOptions;
        body_long_bold: TypographyStyleOptions;
        body_long_bold_italic: TypographyStyleOptions;
      };
      table: {
        cell_header: TypographyStyleOptions;
        cell_text: TypographyStyleOptions;
        cell_text_bold: TypographyStyleOptions;
        cell_text_link: TypographyStyleOptions;
        cell_numeric_monospaced: TypographyStyleOptions;
      };
      ui: {
        tooltip: TypographyStyleOptions;
        snackbar: TypographyStyleOptions;
        accordion_header: TypographyStyleOptions;
        chip__badge: TypographyStyleOptions;
        chart: TypographyStyleOptions;
      };
    };
  };
}
