import type { Metadata } from "next";
import { events } from "@/data/events";
import KartuEvent from "@/components/KartuEvent";

export const metadata: Metadata = {
  title: "Katalog Event",
};

export default function EventPage() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Katalog Event</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <KartuEvent key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}
