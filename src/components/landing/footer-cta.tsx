import { Button } from "@/components/ui/button"

export function FooterCTA() {
  return (
    <section id="contact" aria-label="Contact" className="container mx-auto px-4 py-16 md:py-24">
      <div className="rounded-2xl border bg-card p-10 md:p-16 text-center">
        <h2 className="text-balance text-3xl font-semibold md:text-4xl">
          Ready to accelerate fixed income for your platform?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Tell us about your use case and we’ll set up access within 1–2 business days.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button size="lg" asChild>
            <a href="mailto:contact@example.com">Email Us</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#updates">See updates</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
