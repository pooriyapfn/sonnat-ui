import * as React from "react";

type BaseProps<P = {}> = P & {
  /**
   * Append to the classNames applied to the component so you can override or
   * extend the styles.
   */
  className?: string;
  /** The name of the TextField. */
  name?: string;
  /**
   * The text of the label in legend style.
   */
  legendLabel?: string;
  /** The `placeholder` property of the TextField. */
  placeholder?: string;
  /**
   * The value of the TextField. The DOM API casts this to a string.
   */
  value?: string;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: string;
  /** The helper text content. */
  helperText?: string;
  /** The helper icon. */
  helperIcon?: React.ReactNode;
  /**
   * Leading adornment for this component.
   *
   * This can be used to add a prefix, a suffix or an action to the leading of your input.
   */
  leadingAdornment: React.ReactNode;
  /**
   * Leading adornment for this component.
   *
   * This can be used to add a prefix, a suffix or an action to the trailing of your input.
   */
  trailingAdornment: React.ReactNode;
  /**
   * If `true`, the TextField will be rounded.
   * @default false
   */
  rounded?: boolean;
  /**
   * If `true`, the TextField will be readOnly.
   * @default false
   */
  readOnly?: boolean;
  /**
   * If `true`, the TextField will be focused.
   * @default false
   */
  focused?: boolean;
  /**
   * If `true`, the TextField will be focused on mount.
   * @default false
   */
  autoFocus?: boolean;
  /**
   * If `true`, the TextField will fill the entire width of the parent.
   * @default false
   */
  fluid?: boolean;
  /**
   * If `true`, the TextField will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the TextField will be required.
   * @default false
   */
  required?: boolean;
  /**
   * If `true`, the TextField will indicate invalid input.
   * @default false
   */
  hasError?: boolean;
  /**
   * The size of the TextField.
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * The variant of the TextField.
   * @default "outlined"
   */
  variant?: "filled" | "outlined";
  /**
   * The type of the input.
   * @default "text"
   */
  type?: "text" | "email" | "password";
  /** The properties applied to the `input` element. */
  inputProps?: {
    ref: React.Ref<HTMLInputElement>;
  } & React.HTMLAttributes<HTMLInputElement>;
  /**
   * The Callback fires when the state has changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * @param {string} value The current value of the TextField.
   *
   * You can also pull out the current value by accessing `event.target.value` (string).
   */
  onChange?: (
    /* eslint-disable no-unused-vars */
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
    /* eslint-enable no-unused-vars */
  ) => void;
  /**
   * The Callback fires when the TextField has received focus.
   *
   * @param {React.FocusEvent<HTMLInputElement>} event The event source of the callback.
   */
  // eslint-disable-next-line no-unused-vars
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * The Callback fires when the TextField has lost focus.
   *
   * @param {React.FocusEvent<HTMLInputElement>} event The event source of the callback.
   */
  // eslint-disable-next-line no-unused-vars
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};
export type TextFieldProps<P = {}> = BaseProps<P> &
  Omit<React.ComponentPropsWithRef<"div">, keyof BaseProps<P>>;

export interface TextFieldFC<P = {}> {
  // eslint-disable-next-line no-unused-vars
  (props: TextFieldProps<P>): JSX.Element;
}

declare const TextField: TextFieldFC<{}>;

export default TextField;
