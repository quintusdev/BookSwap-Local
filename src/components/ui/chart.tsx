// Inspired by Tremor.so
"use client"

import * as React from "react"
import {
  Label,
  PolarGrid,
  RadialBar,
  RadialBarChart as RadialBarChartPrimitive,
  type LabelProps,
} from "recharts"
import {
  Pie,
  PieChart as PieChartPrimitive,
  Sector,
  type PieProps,
  type PieSectorDataItem,
} from "recharts"
import { twMerge } from "tailwind-merge"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
  type ChartContainerProps,
} from "@/components/ui/chart-primitives"
import { cn } from "@/lib/utils"

// Chart Components
const Chart = ChartContainer

// Chart Primitives
const ChartPrimitives = {
  Tooltip: ChartTooltip,
  TooltipContent: ChartTooltipContent,
}

// Pie Chart
const PieChart = React.forwardRef<
  React.ElementRef<typeof PieChartPrimitive>,
  React.ComponentProps<typeof PieChartPrimitive>
>(({ className, ...props }, ref) => (
  <PieChartPrimitive ref={ref} className={cn("w-full", className)} {...props} />
))
PieChart.displayName = "PieChart"

const PieChartLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  LabelProps & {
    valueFormatter?: (value: number) => string
  }
>(
  (
    { className, valueFormatter = (value) => value.toString(), ...props },
    ref
  ) => (
    <Label
      ref={ref}
      {...props}
      className={cn(
        "fill-foreground text-sm font-medium",
        props.position === "center" && "text-2xl",
        className
      )}
      valueFormatter={valueFormatter}
    />
  )
)
PieChartLabel.displayName = "PieChartLabel"

const PieChartSector = React.forwardRef<
  SVGSVGElement,
  PieProps & {
    name?: string
  }
>(({ className, ...props }, ref) => (
  <Sector ref={ref} className={cn("fill-primary", className)} {...props} />
))
PieChartSector.displayName = "PieChartSector"

const ActivePieChartSector = <TData extends PieSectorDataItem>(
  props: PieProps<TData>
) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props

  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? "start" : "end"

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        className="fill-muted-foreground"
      >{`Value ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        className="fill-foreground"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}
ActivePieChartSector.displayName = "ActivePieChartSector"

const RADIAN = Math.PI / 180

// Radial Chart
const RadialBarChart = React.forwardRef<
  React.ElementRef<typeof RadialBarChartPrimitive>,
  React.ComponentProps<typeof RadialBarChartPrimitive>
>(({ className, ...props }, ref) => (
  <RadialBarChartPrimitive
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
))
RadialBarChart.displayName = "RadialBarChart"

const RadialBarChartGrid = React.forwardRef<
  React.ElementRef<typeof PolarGrid>,
  React.ComponentProps<typeof PolarGrid>
>(({ className, ...props }, ref) => (
  <PolarGrid
    ref={ref}
    className={cn("stroke-border", className)}
    {...props}
  />
))
RadialBarChartGrid.displayName = "RadialBarChartGrid"

const RadialBarChartTrack = React.forwardRef<
  React.ElementRef<typeof RadialBar>,
  React.ComponentProps<typeof RadialBar>
>(({ className, background, ...props }, ref) => (
  <RadialBar
    ref={ref}
    className={cn("fill-muted", className)}
    {...props}
    background={
      background
        ? {
            className: twMerge(
              cn("fill-muted", background.className),
              background.className
            ),
            ...background,
          }
        : undefined
    }
  />
))
RadialBarChartTrack.displayName = "RadialBarChartTrack"

export {
  // Chart Components
  Chart as Chart,
  ChartContainer,
  // Chart Primitives
  ChartPrimitives as ChartPrimitives,
  ChartTooltip as ChartTooltip,
  ChartTooltipContent as ChartTooltipContent,
  type ChartConfig,
  type ChartContainerProps,
  // Pie Chart
  PieChart as PieChart,
  PieChartLabel as PieChartLabel,
  PieChartSector as PieChartSector,
  ActivePieChartSector as ActivePieChartSector,
  // Radial Chart
  RadialBarChart as RadialBarChart,
  RadialBarChartGrid as RadialBarChartGrid,
  RadialBarChartTrack as RadialBarChartTrack,
}
