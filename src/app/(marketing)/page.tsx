import ThemeToggler from "@/components/theme/toggler";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <div className="w-full flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">{siteConfig.name}</h1>
        <ThemeToggler />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4">
        <div className="max-w-3xl text-center space-y-4">
          <h2 className="text-4xl sm:text-6xl font-bold">
            {siteConfig.title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <div className="flex gap-4">
          <Button size="lg" variant="outline" asChild>
            <Link href="/blogs">Blogs</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={siteConfig.socials.github}>GitHub</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={siteConfig.socials.x}>Twitter</Link>
          </Button>
        </div>
      </div>

      <footer className="py-8 text-center text-muted-foreground">
        <p>Created by <a href={siteConfig.creator.url} target="_blank" className="underline hover:no-underline">{siteConfig.creator.name}</a></p>
      </footer>
    </main>
  )
}
