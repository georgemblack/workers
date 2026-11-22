import { LayerCard, Text } from "@cloudflare/kumo";
import type { ReactNode } from "react";

// The centered card used by the sign-in and registration pages.
export function AuthCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <LayerCard className="w-full max-w-sm">
        <LayerCard.Primary className="grid gap-5 px-5 py-4">
          <div className="grid gap-1.5">
            <Text variant="heading" size="lg" as="h1">
              {title}
            </Text>
            <Text variant="secondary">{description}</Text>
          </div>
          {children}
        </LayerCard.Primary>
      </LayerCard>
    </main>
  );
}
