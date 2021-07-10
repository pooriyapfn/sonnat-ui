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
};

export type CardBodyProps<P = {}> = MergeElementProps<"div", BaseProps<P>>;

declare const CardBody: (props: CardBodyProps) => JSX.Element;

export default CardBody;
