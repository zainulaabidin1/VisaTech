export function Stats() {
  const stats = [
    { label: "Assets represented", value: "$3T+" },
    { label: "APIs & integrations", value: "40+" },
    { label: "Avg. latency", value: "80ms" },
    { label: "Availability", value: "99.95%" },
  ]
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-lg border bg-card p-6 text-center">
          <p className="text-2xl font-semibold">{s.value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  )
}
