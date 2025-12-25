import Image from "next/image";
import HoloTiltCard from "@/components/HoloTiltCard";

const cardData = [
  {
    id: 1,
    name: "Gardevoir (VMAX)",
    imageUrl: "https://images.pokemontcg.io/swsh35/17_hires.png",
    rarity: "rare holo vmax",
    foil: "017_foil_etched_sunpillar_2x.webp",
    mask: "017_foil_etched_sunpillar_2x.webp",
    masked: true,
    shine: true,
    glare: true,
    grain: false,
  },
  {
    id: 2,
    name: "Gardevoir Shiny (VMAX)",
    imageUrl: "https://images.pokemontcg.io/swsh35/76_hires.png",
    rarity: "rare shiny vmax",
    foil: "076_foil_etched_swsecret_2x.webp",
    mask: "076_foil_etched_swsecret_2x.webp",
    masked: true,
    shine: true,
    glare: true,
    grain: false,
  },
];

export default function Card1() {
  return (
    <div className="flex flex-row space-x-16 items-center justify-center min-h-screen">
      {cardData.map((card) => (
        <HoloTiltCard
          key={card.id}
          rarity={card.rarity}
          masked={card.masked}
          shine={card.shine}
          glare={card.glare}
          grain={card.grain}
          foil={`url('/img/foils/${card.foil}')`}
          mask={`url('/img/masks/${card.mask}')`}
        >
          <Image
            src={card.imageUrl}
            alt={card.name}
            width={300}
            height={600}
            loading="eager"
            style={{ width: "auto", height: "auto" }}
          />
        </HoloTiltCard>
      ))}
    </div>
  );
}
