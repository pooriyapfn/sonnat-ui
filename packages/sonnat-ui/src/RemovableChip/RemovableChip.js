import clx from "classnames";
import PropTypes from "prop-types";
import React from "react";
import Close from "../internals/icons/Close";
import { changeColor } from "../styles/colorUtils";
import makeStyles from "../styles/makeStyles";
import { blue } from "../styles/pallete";
import getVar from "../utils/getVar";
import useEventCallback from "../utils/useEventCallback";
import useForkRef from "../utils/useForkRef";
import useIsFocusVisible from "../utils/useIsFocusVisible";

const componentName = "RemovableChip";
const allowedVariants = ["filled", "outlined"];
const allowedSizes = ["large", "medium", "small"];
const allowedColors = ["default", "primary", "secondary"];

const camelCase = s => s.replace(/-./g, x => x.toUpperCase()[1]);

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      darkMode,
      direction,
      mixins: { useIconWrapper, useDisableUserSelect },
      typography: { pxToRem, useText, fontFamily }
    } = theme;

    const filledPrimaryMainBg = !darkMode
      ? colors.primary.origin
      : colors.primary.light;
    const filledSecondaryMainBg = !darkMode
      ? colors.secondary.origin
      : colors.secondary.light;

    const filledPrimary = {
      background: filledPrimaryMainBg,
      text: colors.getContrastColorOf(filledPrimaryMainBg)
    };

    const filledSecondary = {
      background: filledSecondaryMainBg,
      text: colors.getContrastColorOf(filledSecondaryMainBg)
    };

    return {
      root: {
        ...useText(),
        ...useDisableUserSelect(),
        direction,
        fontFamily: fontFamily[direction],
        padding: `0 ${pxToRem(12)}`,
        outline: "none",
        display: "inline-flex",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: pxToRem(2),
        verticalAlign: "middle",
        position: "relative",
        zIndex: "1",
        flexShrink: "0",
        transition:
          "color 360ms ease, background-color 360ms ease, border 360ms ease"
      },
      icon: {
        ...useIconWrapper(16),
        flexShrink: "0",
        transition: "color 360ms ease"
      },
      removeButton: {
        padding: "0",
        margin: "0",
        outline: "none",
        cursor: "pointer",
        borderRadius: "0",
        border: "none",
        minWidth: "auto",
        height: "100%",
        backgroundColor: colors.transparent,
        zIndex: "2",
        pointerEvents: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: "0",
        ...(direction === "rtl"
          ? { marginLeft: pxToRem(-12) }
          : { marginRight: pxToRem(-12) })
      },
      removeButtonIcon: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.transparent,
        borderRadius: "50%",
        cursor: "pointer",
        width: pxToRem(16),
        height: pxToRem(16),
        minWidth: pxToRem(16),
        minHeight: pxToRem(16),
        fontSize: pxToRem(16),
        transition: "background-color 360ms ease, color 360ms ease"
      },
      small: {
        height: pxToRem(20),
        fontSize: pxToRem(10),
        padding: `0 ${pxToRem(8)}`,
        lineHeight: 1.8,
        "& $removeButton": {
          width: pxToRem(20),
          ...(direction === "rtl"
            ? { marginLeft: pxToRem(-8) }
            : { marginRight: pxToRem(-8) })
        },
        "& $icon": {
          ...useIconWrapper(14),
          ...(direction === "rtl"
            ? { marginRight: pxToRem(-2), marginLeft: pxToRem(4) }
            : { marginLeft: pxToRem(-2), marginRight: pxToRem(4) })
        }
      },
      medium: {
        height: pxToRem(28),
        fontSize: pxToRem(12),
        lineHeight: 1.6666666667,
        "& $removeButton": { width: pxToRem(28) },
        "& $icon": {
          ...(direction === "rtl"
            ? { marginRight: pxToRem(-6), marginLeft: pxToRem(4) }
            : { marginLeft: pxToRem(-6), marginRight: pxToRem(4) })
        }
      },
      large: {
        height: pxToRem(32),
        fontSize: pxToRem(14),
        lineHeight: 1.5714285714,
        "& $removeButton": { width: pxToRem(32) },
        "& $icon": {
          ...(direction === "rtl"
            ? { marginRight: pxToRem(-4), marginLeft: pxToRem(4) }
            : { marginLeft: pxToRem(-4), marginRight: pxToRem(4) })
        }
      },
      rounded: {
        borderRadius: pxToRem(16)
      },
      disabled: {
        pointerEvents: "none",
        "& $removeButton": { pointerEvents: "none" },
        "& $icon, & $removeButtonIcon": { pointerEvents: "none" },
        "&:hover": {
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: colors.transparent
          }
        }
      },
      filled: {
        "& $removeButton": {
          "&:hover > $removeButtonIcon": {
            backgroundColor: !darkMode
              ? colors.createBlackColor({ alpha: 0.12 })
              : colors.createWhiteColor({ alpha: 0.12 }),
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              backgroundColor: colors.transparent
            }
          },
          "&:active > $removeButtonIcon": {
            backgroundColor: !darkMode
              ? colors.createBlackColor({ alpha: 0.24 })
              : colors.createWhiteColor({ alpha: 0.24 })
          }
        },
        "&$disabled": {
          color: !darkMode
            ? colors.createBlackColor({ alpha: 0.32 })
            : colors.createWhiteColor({ alpha: 0.12 }),
          "& $icon, & $removeButtonIcon": {
            color: !darkMode
              ? colors.createBlackColor({ alpha: 0.32 })
              : colors.createWhiteColor({ alpha: 0.12 })
          }
        }
      },
      outlined: {
        "&$disabled": {
          backgroundColor: colors.transparent
        }
      },
      filledDefault: {
        backgroundColor: !darkMode
          ? colors.createBlackColor({ alpha: 0.04 })
          : colors.createWhiteColor({ alpha: 0.04 }),
        color: colors.text.secondary,
        "& $icon, & $removeButtonIcon": { color: colors.text.secondary },
        "&$disabled": {
          backgroundColor: !darkMode
            ? colors.pallete.grey[100]
            : colors.pallete.grey[900]
        }
      },
      filledPrimary: {
        backgroundColor: filledPrimary.background,
        color: filledPrimary.text,
        "& $icon, & $removeButtonIcon": { color: filledPrimary.text },
        "&$disabled": {
          backgroundColor: changeColor(filledPrimaryMainBg, { alpha: 0.12 })
        }
      },
      filledSecondary: {
        backgroundColor: filledSecondary.background,
        color: filledSecondary.text,
        "& $icon, & $removeButtonIcon": { color: filledSecondary.text },
        "&$disabled": {
          backgroundColor: changeColor(filledSecondaryMainBg, { alpha: 0.12 })
        }
      },
      outlinedDefault: {
        backgroundColor: !darkMode
          ? colors.createBlackColor({ alpha: 0.04 })
          : colors.createWhiteColor({ alpha: 0.04 }),
        border: `${pxToRem(1)} solid ${colors.divider}`,
        color: colors.text.secondary,
        "& $icon, & $removeButtonIcon": { color: colors.text.secondary },
        "& $removeButton": {
          "&:hover > $removeButtonIcon": {
            backgroundColor: !darkMode
              ? colors.createBlackColor({ alpha: 0.12 })
              : colors.createWhiteColor({ alpha: 0.12 }),
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              backgroundColor: colors.transparent
            }
          },
          "&:active > $removeButtonIcon": {
            backgroundColor: !darkMode
              ? colors.createBlackColor({ alpha: 0.24 })
              : colors.createWhiteColor({ alpha: 0.24 })
          }
        },
        "&$disabled, &[disabled]": {
          borderColor: colors.divider,
          color: colors.text.disabled,
          "& $icon, & $removeButtonIcon": { color: colors.text.disabled }
        }
      },
      outlinedPrimary: {
        backgroundColor: changeColor(filledPrimaryMainBg, { alpha: 0.04 }),
        border: `${pxToRem(1)} solid ${filledPrimaryMainBg}`,
        color: filledPrimaryMainBg,
        "& $icon, & $removeButtonIcon": { color: filledPrimaryMainBg },
        "& $removeButton": {
          "&:hover > $removeButtonIcon": {
            backgroundColor: changeColor(filledPrimaryMainBg, { alpha: 0.12 }),
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              backgroundColor: colors.transparent
            }
          },
          "&:active > $removeButtonIcon": {
            backgroundColor: changeColor(filledPrimaryMainBg, { alpha: 0.24 })
          }
        },
        "&$disabled": {
          color: changeColor(filledPrimaryMainBg, { alpha: 0.32 }),
          "& $icon, & $removeButtonIcon": {
            color: changeColor(filledPrimaryMainBg, { alpha: 0.32 })
          },
          borderColor: changeColor(filledPrimaryMainBg, { alpha: 0.32 })
        }
      },
      outlinedSecondary: {
        backgroundColor: changeColor(filledSecondaryMainBg, { alpha: 0.04 }),
        border: `${pxToRem(1)} solid ${filledSecondaryMainBg}`,
        color: filledSecondaryMainBg,
        "& $icon, & $removeButtonIcon": {
          color: filledSecondaryMainBg
        },
        "& $removeButton": {
          "&:hover > $removeButtonIcon": {
            backgroundColor: changeColor(filledSecondaryMainBg, {
              alpha: 0.12
            }),
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              backgroundColor: colors.transparent
            }
          },
          "&:active > $removeButtonIcon": {
            backgroundColor: changeColor(filledSecondaryMainBg, { alpha: 0.24 })
          }
        },
        "&$disabled": {
          color: changeColor(filledSecondaryMainBg, { alpha: 0.32 }),
          "& $icon, & $removeButtonIcon": {
            color: changeColor(filledSecondaryMainBg, { alpha: 0.32 })
          },
          borderColor: changeColor(filledSecondaryMainBg, { alpha: 0.12 })
        }
      },
      focusVisible: {
        outline: `2px solid ${darkMode ? blue[300] : blue[500]}`,
        outlineOffset: 1
      }
    };
  },
  { name: `Sonnat${componentName}` }
);

const RemovableChip = React.memo(
  React.forwardRef(function RemovableChip(props, ref) {
    const {
      className,
      label,
      leadingIcon,
      onRemove,
      rounded = false,
      disabled = false,
      variant: variantProp = "filled",
      color: colorProp = "default",
      size: sizeProp = "medium",
      ...otherProps
    } = props;

    const classes = useStyles();

    const size = getVar(sizeProp, "medium", !allowedSizes.includes(sizeProp));

    const color = getVar(
      colorProp,
      "default",
      !allowedColors.includes(colorProp)
    );

    const variant = getVar(
      variantProp,
      "filled",
      !allowedVariants.includes(variantProp)
    );

    const removeHandler = e => {
      if (!disabled && onRemove) onRemove(e);
    };

    const {
      isFocusVisibleRef,
      onBlur: handleBlurVisible,
      onFocus: handleFocusVisible,
      ref: focusVisibleRef
    } = useIsFocusVisible();

    const removeRef = React.useRef(null);

    const handleRemoveRef = useForkRef(focusVisibleRef, removeRef);

    const [focusVisible, setFocusVisible] = React.useState(false);

    if (disabled && focusVisible) {
      setFocusVisible(false);
    }

    React.useEffect(() => {
      isFocusVisibleRef.current = focusVisible;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focusVisible]);

    const handleFocus = useEventCallback(event => {
      // Fix for https://github.com/facebook/react/issues/7769
      if (!removeRef.current) removeRef.current = event.currentTarget;

      handleFocusVisible(event);

      if (isFocusVisibleRef.current === true) setFocusVisible(true);
    });

    const handleBlur = useEventCallback(event => {
      handleBlurVisible(event);

      if (isFocusVisibleRef.current === false) setFocusVisible(false);
    });

    return label ? (
      <div
        aria-disabled={disabled ? "true" : "false"}
        ref={ref}
        className={clx(
          className,
          classes.root,
          classes[size],
          classes[variant],
          classes[camelCase(`${variant}-${color}`)],
          {
            [classes.rounded]: rounded,
            [classes.disabled]: disabled
          }
        )}
        {...otherProps}
      >
        {leadingIcon && <i className={clx(classes.icon)}>{leadingIcon}</i>}
        {label}
        <button
          aria-label={`Remove the chip with ${label} text`}
          ref={handleRemoveRef}
          className={clx(classes.removeButton, {
            [classes.focusVisible]: focusVisible
          })}
          onClick={removeHandler}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
        >
          <i className={clx(classes.removeButtonIcon)}>
            <Close />
          </i>
        </button>
      </div>
    ) : null;
  })
);

RemovableChip.displayName = componentName;

RemovableChip.propTypes = {
  label: PropTypes.string.isRequired,
  leadingIcon: PropTypes.node,
  className: PropTypes.string,
  rounded: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.oneOf(allowedColors),
  variant: PropTypes.oneOf(allowedVariants),
  size: PropTypes.oneOf(allowedSizes),
  onRemove: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func
};

export default RemovableChip;
