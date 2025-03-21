import * as React from "react";
import type { MergeElementProps } from "../typings";

export interface InputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement | HTMLDivElement> {
  ref?: React.Ref<HTMLSelectElement | HTMLDivElement>;
}

type BaseProps<P = {}> = P & {
  /** The content of the component. */
  children?: React.ReactNode;
  /**
   * Append to the classNames applied to the component so you can override or
   * extend the styles.
   */
  className?: string;
  /** The name of the Select. */
  name?: string;
  /**
   * The value of the select. Providing an empty string will Select no options.
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
   */
  value?: string[] | string;
  /** The default value. Use when the component is not controlled. */
  defaultValue?: string[] | string;
  /** The helper text content. */
  helperText?: string;
  /** The helper icon element placed before the helper text. */
  helperIcon?: React.ReactNode;
  /**
   * The leading adornment for this component.
   *
   * This can be used to add a prefix, an action, or an icon to the leading of your input.
   */
  leadingAdornment?: React.ReactNode;
  /**
   * The trailing adornment for this component.
   *
   * This can be used to add a suffix, an action, or an icon to the trailing of your input.
   */
  trailingAdornment?: React.ReactNode;
  /** The `placeholder` property of the Select. */
  placeholder?: string;
  /** The `placeholder` property of the search field. */
  searchPlaceholder?: string;
  /** The empty statement text when search results are empty. */
  searchEmptyStatementText?: string;
  /**
   * If `true`, the component is shown.
   * You can only use it when the `native` prop is `false` (default).
   */
  open?: boolean;
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple?: boolean;
  /**
   * If `true`, the menu will be searchable.
   * @default false
   */
  searchable?: boolean;
  /**
   * If `true`, the Select will be focused.
   * @default false
   */
  focused?: boolean;
  /**
   * If `true`, the Select will be focused on mount.
   * @default false
   */
  autoFocus?: boolean;
  /**
   * If `true`, the menu will block the page's scrolling.
   * @default false
   */
  preventPageScrolling?: boolean;
  /**
   * If `true`, the Select will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the Select will be rounded.
   * @default false
   */
  rounded?: boolean;
  /**
   * If `true`, the Select will be required.
   * @default false
   */
  required?: boolean;
  /**
   * If `true`, the Select will indicate invalid input.
   * @default false
   */
  hasError?: boolean;
  /**
   * If `true`, the Select will fill the entire width of the parent.
   * @default false
   */
  fluid?: boolean;
  /**
   * The size of the Select.
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * The variant to use.
   * @default "outlined"
   */
  variant?: "filled" | "outlined";
  /**
   * The properties applied to the `input` element.
   */
  inputProps?: InputProps;
  /**
   * The Callback fires when the menu has opened.
   */
  onOpen?: () => void;
  /**
   * The Callback fires when the menu has closed.
   */
  onClose?: () => void;
  /**
   * The Callback fires when the state has changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string[] | string} value The current value of the Select.

   */
  onChange?: (
    /* eslint-disable no-unused-vars */
    event: React.SyntheticEvent,
    value: string[] | string
    /* eslint-enable no-unused-vars */
  ) => void;
  /**
   * The Callback fires when the Select has received focus.
   *
   * @param {React.FocusEvent<HTMLSelectElement>} event The event source of the callback.
   */
  // eslint-disable-next-line no-unused-vars
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  /**
   * The Callback fires when the Select has lost focus.
   *
   * @param {React.FocusEvent<HTMLSelectElement>} event The event source of the callback.
   */
  // eslint-disable-next-line no-unused-vars
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
};

export type SelectProps<P = {}> = MergeElementProps<
  "div" | "select",
  BaseProps<P>
>;

declare const Select: (props: SelectProps) => JSX.Element;

export default Select;
