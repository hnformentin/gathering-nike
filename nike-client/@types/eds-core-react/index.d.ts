declare module "@equinor/eds-core-react" {
  import * as icons from "@equinor/eds-icons";
  import { Icon } from "@equinor/eds-icons";
  import { ComponentType } from "react";

  export interface TypographyProps {
    className?: string;
    children: React.ReactNode;
    variant?:
      | "h1"
      | "h2"
      | "h3"
      | "h4"
      | "h5"
      | "h6"
      | "overline"
      | "ingress"
      | "caption"
      | "meta"
      | "body_short"
      | "body_long";
    bold?: boolean;
    italic?: boolean;
    link?: boolean;
  }

  export const Typography: React.ComponentType<TypographyProps>;

  export interface IconProps {
    name: keyof typeof icons;
    /**
     * Title for svg if used semantically
     */
    title?: string;
    /**
     * Valid colors
     */
    color?: string;
    /**
     * Vertical spacing
     */
    size?: 16 | 24 | 32 | 40 | 48;
    rotation?: 0 | 90 | 180 | 270;
  }

  export const Icon: ComponentType<IconProps> & {
    add: (icons: { [icon: keyof icons]: Icon }) => void;
  };

  // TODO: add proper types based on EDS' PropTypes settings
  export const TextField: any;
  export const Button: any;
  export const Radio: any;
  export const Checkbox: any;
  export const Avatar: any;
  export const Tabs: any;
  export const List: any;
  export const Accordion: any;
  export const Table: any;
}
