import React from "react";
import PropTypes from "prop-types";
import createClass from "classnames";
import Icon from "../Icon";
import makeStyles from "../styles/makeStyles";
import { adjustColor, changeColor } from "../styles/colorUtils";

const componentName = "ActionChip";
const allowedVariants = ["filled", "outlined"];
const allowedSizes = ["medium", "small"];
const allowedColors = ["default", "primary", "secondary"];

const camelCase = s => s.replace(/-./g, x => x.toUpperCase()[1]);

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      direction,
      darkMode,
      mixins: { useFontIconSize, useDisableUserSelect },
      typography: { pxToRem, useText, fontFamily }
    } = theme;

    const filledPrimaryMainBg = !darkMode
      ? colors.primary.origin
      : colors.primary.light;
    const filledSecondaryMainBg = !darkMode
      ? colors.secondary.origin
      : colors.secondary.light;

    const filledPrimary = {
      background: {
        main: filledPrimaryMainBg,
        hover: adjustColor(filledPrimaryMainBg, {
          saturation: -8,
          lightness: +8
        }),
        active: adjustColor(filledPrimaryMainBg, {
          saturation: +8,
          lightness: -4
        })
      },
      text: colors.getContrastColorOf(filledPrimaryMainBg)
    };

    const filledSecondary = {
      background: {
        main: filledSecondaryMainBg,
        hover: adjustColor(filledSecondaryMainBg, {
          saturation: -8,
          lightness: +8
        }),
        active: adjustColor(filledSecondaryMainBg, {
          saturation: +8,
          lightness: -4
        })
      },
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
        overflow: "hidden",
        position: "relative",
        zIndex: "1",
        flexShrink: "0",
        cursor: "pointer",
        transition:
          "color 360ms ease, background-color 360ms ease, border 360ms ease"
      },
      icon: {
        ...useFontIconSize(16),
        flexShrink: "0",
        transition: "color 360ms ease"
      },
      small: {
        height: pxToRem(28),
        fontSize: pxToRem(12),
        "& $icon": {
          ...(direction === "rtl"
            ? { marginRight: pxToRem(-6), marginLeft: pxToRem(4) }
            : { marginLeft: pxToRem(-6), marginRight: pxToRem(4) })
        }
      },
      medium: {
        height: pxToRem(32),
        fontSize: pxToRem(14),
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
        "&:hover": {
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: colors.transparent
          }
        }
      },
      filled: {
        "&$disabled": {
          backgroundColor: !darkMode
            ? colors.pallete.grey[100]
            : colors.pallete.grey[900],
          color: !darkMode
            ? colors.createBlackColor({ alpha: 0.32 })
            : colors.createWhiteColor({ alpha: 0.12 }),
          "& $icon": {
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
        "& $icon": { color: colors.text.secondary },
        "&:hover, &:focus": {
          backgroundColor: !darkMode
            ? colors.createBlackColor({ alpha: 0.12 })
            : colors.createWhiteColor({ alpha: 0.12 })
        },
        "&:active": {
          backgroundColor: !darkMode
            ? colors.createBlackColor({ alpha: 0.24 })
            : colors.createWhiteColor({ alpha: 0.24 })
        },
        "&:hover": {
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: colors.transparent
          }
        }
      },
      filledPrimary: {
        backgroundColor: filledPrimary.background.main,
        color: filledPrimary.text,
        "& $icon": { color: filledPrimary.text },
        "&:hover, &:focus": {
          backgroundColor: filledPrimary.background.hover
        },
        "&:active": {
          backgroundColor: filledPrimary.background.active
        },
        "&:hover": {
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: colors.transparent
          }
        }
      },
      filledSecondary: {
        backgroundColor: filledSecondary.background.main,
        color: filledSecondary.text,
        "& $icon": { color: filledSecondary.text },
        "&:hover, &:focus": {
          backgroundColor: filledSecondary.background.hover
        },
        "&:active": {
          backgroundColor: filledSecondary.background.active
        },
        "&:hover": {
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: colors.transparent
          }
        }
      },
      outlinedDefault: {
        backgroundColor: colors.transparent,
        border: `${pxToRem(1)} solid ${colors.divider}`,
        color: colors.text.secondary,
        "& $icon": { color: colors.text.secondary },
        "&:hover, &:focus": {
          backgroundColor: !darkMode
            ? colors.createBlackColor({ alpha: 0.04 })
            : colors.createWhiteColor({ alpha: 0.04 })
        },
        "&:active": {
          backgroundColor: !darkMode
            ? colors.createBlackColor({ alpha: 0.12 })
            : colors.createWhiteColor({ alpha: 0.12 })
        },
        "&$disabled": {
          borderColor: colors.divider,
          color: colors.text.disabled,
          "& $icon": { color: colors.text.disabled }
        },
        "&:hover": {
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: colors.transparent
          }
        }
      },
      outlinedPrimary: {
        backgroundColor: !darkMode
          ? colors.createPrimaryColor({ alpha: 0.04 })
          : changeColor(colors.primary.light, { alpha: 0.04 }),
        border: `${pxToRem(1)} solid ${
          !darkMode ? colors.primary.origin : colors.primary.light
        }`,
        color: !darkMode ? colors.primary.origin : colors.primary.light,
        "& $icon": {
          color: !darkMode ? colors.primary.origin : colors.primary.light
        },
        "&:hover, &:focus": {
          backgroundColor: !darkMode
            ? colors.createPrimaryColor({ alpha: 0.12 })
            : changeColor(colors.primary.light, { alpha: 0.12 })
        },
        "&:active": {
          backgroundColor: !darkMode
            ? colors.createPrimaryColor({ alpha: 0.24 })
            : changeColor(colors.primary.light, { alpha: 0.24 })
        },
        "&$disabled": {
          color: !darkMode
            ? colors.createPrimaryColor({ alpha: 0.32 })
            : changeColor(colors.primary.light, { alpha: 0.32 }),
          "& $icon": {
            color: !darkMode
              ? colors.createPrimaryColor({ alpha: 0.32 })
              : changeColor(colors.primary.light, { alpha: 0.32 })
          },
          borderColor: !darkMode
            ? colors.createPrimaryColor({ alpha: 0.12 })
            : changeColor(colors.primary.light, { alpha: 0.12 })
        },
        "&:hover": {
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: colors.transparent
          }
        }
      },
      outlinedSecondary: {
        backgroundColor: colors.createSecondaryColor({ alpha: 0.04 }),
        border: `${pxToRem(1)} solid ${
          !darkMode ? colors.secondary.origin : colors.secondary.light
        }`,
        color: !darkMode ? colors.secondary.origin : colors.secondary.light,
        "& $icon": {
          color: !darkMode ? colors.secondary.origin : colors.secondary.light
        },
        "&:hover, &:focus": {
          backgroundColor: !darkMode
            ? colors.createSecondaryColor({ alpha: 0.12 })
            : changeColor(colors.secondary.light, { alpha: 0.12 })
        },
        "&:active": {
          backgroundColor: !darkMode
            ? colors.createSecondaryColor({ alpha: 0.24 })
            : changeColor(colors.secondary.light, { alpha: 0.24 })
        },
        "&$disabled": {
          color: !darkMode
            ? colors.createSecondaryColor({ alpha: 0.32 })
            : changeColor(colors.secondary.light, { alpha: 0.32 }),
          "& $icon": {
            color: !darkMode
              ? colors.createSecondaryColor({ alpha: 0.32 })
              : changeColor(colors.secondary.light, { alpha: 0.32 })
          },
          borderColor: !darkMode
            ? colors.createSecondaryColor({ alpha: 0.12 })
            : changeColor(colors.secondary.light, { alpha: 0.12 })
        },
        "&:hover": {
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: colors.transparent
          }
        }
      }
    };
  },
  { name: `Sonnat${componentName}` }
);

const ActionChip = React.memo(
  React.forwardRef(function ActionChip(props, ref) {
    const {
      className,
      label,
      leadingIcon,
      size = "medium",
      variant = "filled",
      color = "default",
      disabled = false,
      rounded = false,
      ...otherProps
    } = props;

    const localClass = useStyles();

    const hasValidVariant = allowedVariants.includes(variant);
    const hasValidColor = allowedColors.includes(color);
    const hasValidSize = allowedSizes.includes(size);

    return label ? (
      <div
        ref={ref}
        role="button"
        aria-disabled={disabled ? "true" : "false"}
        tabIndex={disabled ? -1 : 0}
        className={createClass(localClass.root, className, {
          [localClass[size]]: hasValidSize,
          [localClass[variant]]: hasValidVariant,
          [localClass[camelCase(`${variant}-${color}`)]]:
            hasValidColor && hasValidVariant,
          [localClass.rounded]: rounded,
          [localClass.disabled]: disabled
        })}
        {...otherProps}
      >
        {leadingIcon && (
          <Icon
            identifier={leadingIcon}
            className={createClass(localClass.icon)}
          />
        )}
        {label}
      </div>
    ) : null;
  })
);

ActionChip.displayName = componentName;

ActionChip.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  rounded: PropTypes.bool,
  disabled: PropTypes.bool,
  leadingIcon: PropTypes.string,
  size: PropTypes.oneOf(allowedSizes),
  color: PropTypes.oneOf(allowedColors),
  variant: PropTypes.oneOf(allowedVariants)
};

export default ActionChip;
