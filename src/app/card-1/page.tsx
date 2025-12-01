import HoloTiltCard from "@/components/HoloTiltCard";
import Image from "next/image";

export default function Card1() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <HoloTiltCard
        rarity="rare holo vmax"
        masked
        shine
        glare
        foil="url('/img/foils/017_foil_etched_sunpillar_2x.webp')"
        mask="url('/img/masks/017_foil_etched_sunpillar_2x.webp')"
      >
        <Image
          src="https://images.pokemontcg.io/swsh35/17_hires.png"
          alt="Card 1"
          width={300}
          height={600}
          loading="eager"
          style={{ width: "auto", height: "auto" }}
        />
      </HoloTiltCard>
    </div>
  );
}
