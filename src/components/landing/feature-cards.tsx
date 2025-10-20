"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const features = [
  {
    title: "Automated Execution",
    body: "Streamline workflows with rules-based execution and monitoring across venues.",
    iconAlt: "Execution icon",
    iconSrc: "/feature-icon.jpg",
  },
  {
    title: "Risk Management",
    body: "Define custom risk policies, limits, and alerts tailored to your mandates.",
    iconAlt: "Risk icon",
    iconSrc: "/feature-icon.jpg",
  },
  {
    title: "Custom Strategies",
    body: "Design ladders, reinvestment, and portfolio strategies with transparency.",
    iconAlt: "Strategy icon",
    iconSrc: "/feature-icon.jpg",
  },
]

export function FeatureCards() {
  return (
    <section aria-label="Platform Features" className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="h-full border border-muted bg-card text-card-foreground shadow-sm transition hover:shadow-md"
          >
            <CardHeader className="flex flex-col items-center text-center space-y-3">
              <img
                src={feature.iconSrc}
                alt={feature.iconAlt}
                className="h-12 w-12 rounded-md border bg-muted object-cover"
              />
              <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-center">
              {feature.body}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
