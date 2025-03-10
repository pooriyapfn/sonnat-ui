import * as React from "react";
import type { MergeElementProps } from "../../typings";

type BaseProps<P = {}> = P & {
  /** The content of the component. */
  children?: React.ReactNode;
  /**
   * Append to the classNames applied to the component so you can override or
   * extend the styles.
   */
  className?: string;
  /**
   * If `true`, the description will appear as disabled.
   * @default false
   */
  disabled?: boolean;
};

export type FormControlDescriptionProps<P = {}> = MergeElementProps<
  "p",
  BaseProps<P>
>;

declare const FormControlDescription: (
  props: FormControlDescriptionProps
) => JSX.Element;

export default FormControlDescription;
