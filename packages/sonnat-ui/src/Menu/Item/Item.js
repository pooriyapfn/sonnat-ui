import clx from "classnames";
import PropTypes from "prop-types";
import React from "react";
import makeStyles from "../../styles/makeStyles";
import useEnhancedEffect from "../../utils/useEnhancedEffect";
import FloatedListContext from "../context";

const componentName = "MenuItem";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      darkMode,
      mixins: { useDisableUserSelect },
      typography: { pxToRem, useText }
    } = theme;

    return {
      root: {
        ...useText({
          fontSize: pxToRem(14),
          lineHeight: 1.5714285714,
          color: colors.text.secondary
        }),
        ...useDisableUserSelect(),
        width: "100%",
        flexShrink: "0",
        paddingRight: pxToRem(16),
        paddingLeft: pxToRem(16),
        display: "flex",
        alignItems: "center",
        minHeight: pxToRem(40),
        cursor: "pointer",
        overflow: "hidden",
        outline: "none",
        transition: "color 240ms ease, background-color 240ms ease",
        "&:hover": {
          backgroundColor: !darkMode
            ? colors.createBlackColor({ alpha: 0.04 })
            : colors.createWhiteColor({ alpha: 0.04 })
        },
        "&:active": {
          color: !darkMode ? colors.primary.origin : colors.primary.light,
          outline: "none"
        }
      },
      focused: {
        backgroundColor: !darkMode
          ? colors.createBlackColor({ alpha: 0.04 })
          : colors.createWhiteColor({ alpha: 0.04 })
      },
      disabled: {
        pointerEvents: "none",
        color: colors.text.disabled
      },
      hide: { display: "none" },
      dense: { fontSize: pxToRem(12), minHeight: pxToRem(32) }
    };
  },
  { name: `Sonnat${componentName}` }
);

const MenuItem = React.memo(function MenuItem(props) {
  const {
    className,
    children,
    onClick,
    onFocus,
    onBlur,
    // eslint-disable-next-line react/prop-types
    index,
    disabled = false,
    hide = false,
    ...otherProps
  } = props;

  const classes = useStyles();

  const { registerNode, dense } = React.useContext(FloatedListContext);

  const itemRef = React.useRef(null);

  const [isFocused, setFocused] = React.useState(false);

  useEnhancedEffect(() => {
    if (itemRef.current && registerNode) {
      itemRef.current.disabled = disabled;
      registerNode(index, itemRef.current);
    }
  });

  return (
    <div
      aria-disabled={disabled}
      data-index={`${index}`}
      ref={itemRef}
      role="menuitem"
      tabIndex={disabled || !isFocused ? -1 : 0}
      onClick={e => {
        if (!disabled && onClick) onClick(e);
      }}
      onFocus={e => {
        if (!disabled) {
          if (onFocus) onFocus(e);
          setFocused(true);
        }
      }}
      onBlur={e => {
        if (!disabled) {
          if (onBlur) onBlur(e);
          setFocused(false);
        }
      }}
      className={clx(classes.root, className, {
        [classes.focused]: isFocused,
        [classes.disabled]: disabled,
        [classes.hide]: hide,
        [classes.dense]: dense
      })}
      {...otherProps}
    >
      {children}
    </div>
  );
});

MenuItem.displayName = componentName;

MenuItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  hide: PropTypes.bool
};

export default MenuItem;
