"use client";
/*
 * Documentation:
 * Topbar with left nav and right buttons — https://app.subframe.com/3e89f36c040a/library?component=Topbar+with+left+nav+and+right+buttons_ccff85e5-018b-4c55-ab4d-e454acefe565
 * Text Field — https://app.subframe.com/3e89f36c040a/library?component=Text+Field_be48ca43-f8e7-4c0e-8870-d219ea11abfe
 * Button — https://app.subframe.com/3e89f36c040a/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 */

import React from "react";
import * as SubframeCore from "@subframe/core";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  icon?: SubframeCore.IconName;
  children?: React.ReactNode;
  className?: string;
}

const NavItem = React.forwardRef<HTMLElement, NavItemProps>(function NavItem(
  {
    selected = false,
    icon = null,
    children,
    className,
    ...otherProps
  }: NavItemProps,
  ref
) {
  return (
    <div
      className={SubframeCore.twClassNames(
        "group/66b67913 flex cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <SubframeCore.Icon
        className={SubframeCore.twClassNames(
          "text-heading-3 font-heading-3 text-subtext-color group-hover/66b67913:text-default-font",
          { "text-brand-700 group-hover/66b67913:text-brand-700": selected }
        )}
        name={icon}
      />
      {children ? (
        <span
          className={SubframeCore.twClassNames(
            "text-body-bold font-body-bold text-default-font group-hover/66b67913:text-brand-700",
            {
              "text-body-bold font-body-bold text-brand-700 group-hover/66b67913:text-brand-700":
                selected,
            }
          )}
        >
          {children}
        </span>
      ) : null}
    </div>
  );
});

interface TopbarWithLeftNavAndRightButtonsRootProps
  extends React.HTMLAttributes<HTMLElement> {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
}

const TopbarWithLeftNavAndRightButtonsRoot = React.forwardRef<
  HTMLElement,
  TopbarWithLeftNavAndRightButtonsRootProps
>(function TopbarWithLeftNavAndRightButtonsRoot(
  {
    leftSlot,
    rightSlot,
    className,
    ...otherProps
  }: TopbarWithLeftNavAndRightButtonsRootProps,
  ref
) {
  return (
    <nav
      className={SubframeCore.twClassNames(
        "flex w-full items-center gap-4 border-b border-solid border-neutral-border bg-default-background px-6 py-6",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {leftSlot ? (
        <div className="flex grow shrink-0 basis-0 items-center gap-6">
          {leftSlot}
        </div>
      ) : null}
      {rightSlot ? (
        <div className="flex grow shrink-0 basis-0 items-center justify-end gap-2">
          {rightSlot}
        </div>
      ) : null}
    </nav>
  );
});

export const TopbarWithLeftNavAndRightButtons = Object.assign(
  TopbarWithLeftNavAndRightButtonsRoot,
  {
    NavItem,
  }
);
