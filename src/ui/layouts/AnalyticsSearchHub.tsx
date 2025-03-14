"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import * as SubframeCore from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { Tabs } from "@/ui/components/Tabs";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { ExploreCard } from "@/ui/components/ExploreCard";
import { Button } from "@/ui/components/Button";

function AnalyticsSearchHub() {
    return (
        <div className="container max-w-none flex h-full w-full flex-col items-center gap-4 bg-default-background py-12">
            <div className="flex w-full max-w-[768px] flex-col items-center gap-6">
                <div className="flex w-full max-w-[576px] flex-col items-center justify-center gap-6 px-6 py-6">
                    <div className="flex w-full flex-col items-center justify-center gap-2">
                        <SubframeCore.Icon
                            className="text-heading-1 font-heading-1 text-default-font"
                            name="FeatherBarChart2"
                        />
                        <span className="w-full text-heading-1 font-heading-1 text-default-font text-center mobile:text-heading-1 mobile:font-heading-1">
                            FRED Data Analytics
                        </span>
                        <span className="text-body font-body text-subtext-color text-center">
                            Explore and analyze Federal Reserve Economic Data with powerful
                            visualization tools
                        </span>
                    </div>
                    <TextField
                        className="h-auto w-full max-w-[320px] flex-none"
                        variant="filled"
                        label=""
                        helpText=""
                        icon="FeatherSearch"
                    >
                        <TextField.Input
                            placeholder="Search economic indicators..."
                            value=""
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { }}
                        />
                    </TextField>
                </div>
                <div className="flex w-full flex-col items-start gap-12">
                    <div className="flex w-full flex-col items-start gap-12 overflow-auto mobile:h-auto mobile:w-auto mobile:flex-none mobile:overflow-auto mobile:self-stretch">
                        <Tabs>
                            <Tabs.Item active={true}>Popular Indicators</Tabs.Item>
                            <Tabs.Item>Monetary Policy</Tabs.Item>
                            <Tabs.Item>Economic Growth</Tabs.Item>
                            <Tabs.Item>Employment</Tabs.Item>
                        </Tabs>
                    </div>
                    <div className="flex w-full flex-col items-center gap-16">
                        <div className="flex w-full flex-col items-start gap-4">
                            <div className="flex w-full flex-col items-start gap-1">
                                <span className="w-full text-heading-2 font-heading-2 text-default-font">
                                    Featured Indicators
                                </span>
                                <span className="w-full text-body font-body text-subtext-color">
                                    Key economic metrics updated in real-time
                                </span>
                            </div>
                            <div className="flex w-full flex-col items-start gap-4">
                                <div className="flex w-full items-start gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
                                    <ExploreCard
                                        count="1"
                                        title="GDP Growth Rate"
                                        desc="Quarterly percent change in real gross domestic product"
                                        metadata="Updated: Q4 2023"
                                    >
                                        <IconWithBackground
                                            size="large"
                                            icon="FeatherTrendingUp"
                                        />
                                    </ExploreCard>
                                    <ExploreCard
                                        count="2"
                                        title="Inflation Rate (CPI)"
                                        desc="Consumer Price Index for All Urban Consumers: All Items"
                                        metadata="Updated: March 2024"
                                    >
                                        <IconWithBackground
                                            variant="warning"
                                            size="large"
                                            icon="FeatherDollarSign"
                                        />
                                    </ExploreCard>
                                </div>
                                <div className="flex w-full items-start gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
                                    <ExploreCard
                                        count="3"
                                        title="Unemployment Rate"
                                        desc="Civilian Unemployment Rate, Seasonally Adjusted"
                                        metadata="Updated: March 2024"
                                    >
                                        <IconWithBackground
                                            variant="error"
                                            size="large"
                                            icon="FeatherUsers"
                                        />
                                    </ExploreCard>
                                    <ExploreCard
                                        count="4"
                                        title="Federal Funds Rate"
                                        desc="Effective Federal Funds Rate, Daily"
                                        metadata="Updated: Today"
                                    >
                                        <IconWithBackground
                                            variant="success"
                                            size="large"
                                            icon="FeatherPercent"
                                        />
                                    </ExploreCard>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-col items-start gap-4">
                            <div className="flex w-full flex-col items-start gap-1">
                                <span className="w-full text-heading-2 font-heading-2 text-default-font">
                                    Recent Updates
                                </span>
                                <span className="w-full text-body font-body text-subtext-color">
                                    Latest changes in economic indicators
                                </span>
                            </div>
                            <div className="flex w-full items-start gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
                                <ExploreCard
                                    count="5"
                                    title="Industrial Production"
                                    desc="Industrial Production: Total Index"
                                    metadata="Updated: March 15, 2024"
                                >
                                    <IconWithBackground
                                        variant="neutral"
                                        size="large"
                                        icon="FeatherFactory"
                                    />
                                </ExploreCard>
                                <ExploreCard
                                    count="6"
                                    title="Retail Sales"
                                    desc="Advance Retail Sales: Retail Trade"
                                    metadata="Updated: March 14, 2024"
                                >
                                    <IconWithBackground
                                        size="large"
                                        icon="FeatherShoppingCart"
                                    />
                                </ExploreCard>
                            </div>
                            <Button
                                className="h-10 w-full flex-none"
                                variant="neutral-secondary"
                                size="large"
                                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
                            >
                                View All Indicators
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsSearchHub;