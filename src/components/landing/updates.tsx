import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const posts = [
  {
    title: "Q4 Program Launch",
    body: "New capabilities for execution and settlement across markets.",
  },
  {
    title: "Security Whitepaper",
    body: "Updated controls and audits for 2025. Download the summary.",
  },
  {
    title: "Partners Expansion",
    body: "Welcoming new global venues and data providers to the network.",
  },
]

export function Updates() {
  return (
    <div id="updates" className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {posts.map((p) => (
        <Card key={p.title} className="h-full">
          <CardHeader>
            <img src="/article-cover.jpg" alt="" className="h-32 w-full rounded-md border object-cover" />
            <CardTitle className="text-lg">{p.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">{p.body}</CardContent>
        </Card>
      ))}
    </div>
  )
}
