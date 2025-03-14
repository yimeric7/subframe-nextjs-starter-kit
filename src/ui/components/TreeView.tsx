"use client";
/*
 * Documentation:
 * Tree View — https://app.subframe.com/3e89f36c040a/library?component=Tree+View_4ed46422-ecc3-41e8-8787-e55ee10cdc75
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { Accordion } from "./Accordion";

interface FolderProps extends React.ComponentProps<typeof Accordion> {
  children?: React.ReactNode;
  label?: React.ReactNode;
  icon?: SubframeCore.IconName;
  className?: string;
}

const Folder = React.forwardRef<HTMLElement, FolderProps>(function Folder(
  {
    children,
    label,
    icon = "FeatherFolder",
    className,
    ...otherProps
  }: FolderProps,
  ref
) {
  return (
    <Accordion
      className={SubframeCore.twClassNames(
        "group/c841484c cursor-pointer",
        className
      )}
      trigger={
        <div className="flex w-full items-center gap-2 rounded-md px-3 py-2 group-hover/c841484c:bg-neutral-50">
          <SubframeCore.Icon
            className="text-body font-body text-default-font"
            name={icon}
          />
          {label ? (
            <span className="line-clamp-1 grow shrink-0 basis-0 text-body font-body text-default-font">
              {label}
            </span>
          ) : null}
          <Accordion.Chevron />
        </div>
      }
      defaultOpen={true}
      ref={ref as any}
      {...otherProps}
    >
      {children ? (
        <div className="flex w-full flex-col items-start gap-1 pl-6 pt-1">
          {children}
        </div>
      ) : null}
    </Accordion>
  );
});

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  label?: React.ReactNode;
  icon?: SubframeCore.IconName;
  className?: string;
}

const Item = React.forwardRef<HTMLElement, ItemProps>(function Item(
  {
    selected = false,
    label,
    icon = "FeatherFile",
    className,
    ...otherProps
  }: ItemProps,
  ref
) {
  return (
    <div
      className={SubframeCore.twClassNames(
        "group/42786044 flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 hover:bg-neutral-50",
        { "bg-brand-100 hover:bg-brand-100": selected },
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <SubframeCore.Icon
        className={SubframeCore.twClassNames(
          "text-body font-body text-default-font",
          { "text-brand-700": selected }
        )}
        name={icon}
      />
      {label ? (
        <span
          className={SubframeCore.twClassNames(
            "line-clamp-1 grow shrink-0 basis-0 text-body font-body text-default-font",
            { "text-brand-700": selected }
          )}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
});

interface TreeViewRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const TreeViewRoot = React.forwardRef<HTMLElement, TreeViewRootProps>(
  function TreeViewRoot(
    { children, className, ...otherProps }: TreeViewRootProps,
    ref
  ) {
    return children ? (
      <div
        className={SubframeCore.twClassNames(
          "flex w-full flex-col items-start",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {children}
      </div>
    ) : null;
  }
);

export const TreeView = Object.assign(TreeViewRoot, {
  Folder,
  Item,
});
