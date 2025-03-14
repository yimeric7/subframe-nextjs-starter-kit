"use client";
/*
 * Documentation:
 * Default Page Layout — https://app.subframe.com/3e89f36c040a/library?component=Default+Page+Layout_a57b1c43-310a-493f-b807-8cc88e2452cf
 * Topbar with left nav and right buttons — https://app.subframe.com/3e89f36c040a/library?component=Topbar+with+left+nav+and+right+buttons_ccff85e5-018b-4c55-ab4d-e454acefe565
 * Button — https://app.subframe.com/3e89f36c040a/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { TopbarWithLeftNavAndRightButtons } from "../components/TopbarWithLeftNavAndRightButtons";
import { Button } from "../components/Button";

interface DefaultPageLayoutRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const DefaultPageLayoutRoot = React.forwardRef<
  HTMLElement,
  DefaultPageLayoutRootProps
>(function DefaultPageLayoutRoot(
  { children, className, ...otherProps }: DefaultPageLayoutRootProps,
  ref
) {
  return (
    <div
      className={SubframeCore.twClassNames(
        "flex h-screen w-full flex-col items-center",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <TopbarWithLeftNavAndRightButtons
        className="mobile:hidden"
        leftSlot={
          <>
            <img
              className="h-6 flex-none object-cover"
              src="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/y2rsnhq3mex4auk54aye.png"
            />
            <div className="flex items-center gap-1">
              <TopbarWithLeftNavAndRightButtons.NavItem selected={true}>
                Home
              </TopbarWithLeftNavAndRightButtons.NavItem>
              <TopbarWithLeftNavAndRightButtons.NavItem>
                About
              </TopbarWithLeftNavAndRightButtons.NavItem>
            </div>
          </>
        }
        rightSlot={
          <>
            <Button variant="neutral-secondary">Log In</Button>
            <Button>Sign Up</Button>
          </>
        }
      />
      {children ? (
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 overflow-y-auto bg-default-background">
          {children}
        </div>
      ) : null}
    </div>
  );
});

export const DefaultPageLayout = DefaultPageLayoutRoot;
