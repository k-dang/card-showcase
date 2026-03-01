import Image from "next/image";
import HoloTiltCard, { type CardRarity } from "@/components/HoloTiltCard";

interface ShowcaseCard {
  id: number;
  name: string;
  imageUrl: string;
  rarity: CardRarity;
  cardClassName?: string;
  supertype?: string;
  subtypes?: string;
  foil?: string;
  mask?: string;
  masked: boolean;
  shine: boolean;
  glare: boolean;
  grain: boolean;
  glowClasses: string;
  effectLabel: string;
}

const cardData = [
  {
    id: 1,
    name: "Gardevoir VMAX",
    imageUrl: "https://images.pokemontcg.io/swsh35/17_hires.png",
    rarity: "rare holo vmax",
    foil: "017_foil_etched_sunpillar_2x.webp",
    mask: "017_foil_etched_sunpillar_2x.webp",
    masked: true,
    shine: true,
    glare: true,
    grain: false,
    glowClasses: "bg-[var(--gradient-warm)] opacity-[0.18]",
    effectLabel: "Rare Holo VMAX",
  },
  {
    id: 2,
    name: "Gardevoir Rainbow VMAX",
    imageUrl: "https://images.pokemontcg.io/swsh35/76_hires.png",
    rarity: "rare rainbow",
    foil: "076_foil_etched_swsecret_2x.webp",
    mask: "076_foil_etched_swsecret_2x.webp",
    masked: true,
    shine: true,
    glare: true,
    grain: false,
    glowClasses: "bg-[var(--gradient-cool)] opacity-[0.15]",
    effectLabel: "Rare Rainbow",
  },
  {
    id: 3,
    name: "Umbreon VMAX",
    imageUrl: "https://images.pokemontcg.io/swsh7/215_hires.png",
    rarity: "rare rainbow alt",
    cardClassName: "darkness interactive",
    subtypes: "vmax single strike",
    foil: "215_foil_etched_swsecret_2x.webp",
    mask: "215_foil_etched_swsecret_2x.webp",
    masked: true,
    shine: true,
    glare: true,
    grain: false,
    glowClasses: "bg-[var(--gradient-cool)] opacity-[0.15]",
    effectLabel: "Rare Rainbow Alt",
  },
  {
    id: 4,
    name: "Pikachu",
    imageUrl: "https://images.pokemontcg.io/swsh11tg/TG05_hires.png",
    rarity: "trainer gallery rare holo",
    foil: "tg05_foil_holo_rainbow_2x.webp",
    mask: "tg05_foil_holo_rainbow_2x.webp",
    masked: true,
    shine: true,
    glare: true,
    grain: false,
    glowClasses: "bg-[var(--gradient-warm)] opacity-[0.16]",
    effectLabel: "Trainer Gallery Rare Holo",
  },
  {
    id: 5,
    name: "Charizard VSTAR",
    imageUrl: "https://images.pokemontcg.io/swsh9/18_hires.png",
    rarity: "rare holo vstar",
    subtypes: "vstar",
    foil: "018_foil_etched_sunpillar_2x.webp",
    mask: "018_foil_etched_sunpillar_2x.webp",
    masked: true,
    shine: true,
    glare: true,
    grain: false,
    glowClasses: "bg-[var(--gradient-warm)] opacity-[0.18]",
    effectLabel: "Rare Holo VSTAR",
  },
  {
    id: 6,
    name: "Nessa",
    imageUrl: "https://images.pokemontcg.io/swsh11tg/TG27_hires.png",
    rarity: "rare ultra",
    supertype: "trainer",
    subtypes: "supporter",
    foil: "tg27_foil_etched_sunpillar_2x.webp",
    mask: "tg27_foil_etched_sunpillar_2x.webp",
    masked: true,
    shine: true,
    glare: true,
    grain: false,
    glowClasses: "bg-[var(--gradient-warm)] opacity-[0.17]",
    effectLabel: "Rare Ultra Trainer",
  },
] satisfies ReadonlyArray<ShowcaseCard>;

export default function Home() {
  return (
    <main className="min-h-svh bg-[#06060e] overflow-hidden relative">
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute rounded-full w-[600px] h-[600px] left-[8%] top-[20%] bg-(--gradient-warm) blur-[80px] opacity-[0.12] animate-aurora-drift" />
        <div className="absolute rounded-full w-[500px] h-[500px] right-[8%] top-[25%] bg-(--gradient-cool) blur-[80px] opacity-[0.1] animate-aurora-drift-reverse" />
      </div>

      <div className="relative z-1 min-h-svh flex flex-col items-center justify-center gap-10 px-8 py-16">
        <header
          className="text-center flex flex-col items-center gap-5 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="inline-block border border-[#c9a84c80] text-[#c9a84c] font-body font-normal text-[0.7rem] tracking-[0.3em] uppercase px-[1em] py-[0.35em] rounded-full">
            Collector&apos;s Showcase
          </div>
          <h1 className="flex flex-col items-center gap-[1em] m-0 font-display font-light leading-[0.9]">
            <span className="block text-[clamp(4rem,10vw,8rem)] text-[#f0ede6] italic tracking-[-0.02em]">
              Holographic
            </span>
            <span className="block text-[clamp(2rem,5vw,4rem)] text-[#c9a84c] not-italic tracking-[0.05em]">
              Trading Cards
            </span>
          </h1>
          <p className="font-body font-light text-sm text-[#6e6e85] tracking-[0.05em] leading-[1.7] text-center m-0">
            Recreation of Pokémon TCG holographic effects
          </p>
        </header>

        <div
          className="flex items-center gap-4 w-full max-w-[600px] text-[#c9a84c4d] text-xs animate-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          <span
            className="flex-1 h-px bg-linear-to-r from-transparent to-[#c9a84c4d]"
            aria-hidden="true"
          />
          ✦
          <span
            className="flex-1 h-px bg-linear-to-l from-transparent to-[#c9a84c4d]"
            aria-hidden="true"
          />
        </div>

        <section
          className="grid grid-cols-3 gap-20 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          {cardData.map((card) => (
            <div
              key={card.id}
              className="relative flex flex-col items-center gap-6"
            >
              <div
                className={`absolute w-[90%] h-[65%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px] z-0 animate-glow-pulse pointer-events-none ${card.glowClasses}`}
              />
              <div className="relative z-1">
                <HoloTiltCard
                  rarity={card.rarity}
                  className={card.cardClassName}
                  supertype={card.supertype}
                  subtypes={card.subtypes}
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
              </div>
              <div className="flex flex-col items-center gap-1 relative z-1">
                <span className="font-display font-semibold text-[1.1rem] text-[#f0ede6]">
                  {card.name}
                </span>
                <span className="font-body font-normal text-[0.65rem] uppercase tracking-[0.15em] text-[#6e6e85]">
                  {card.effectLabel}
                </span>
              </div>
            </div>
          ))}
        </section>

        <p
          className="font-body font-light text-xs text-[#c9a84c80] tracking-[0.2em] m-0 animate-fade-up"
          style={{ animationDelay: "0.7s" }}
        >
          ✦ Hover over the cards to reveal the holographic effects ✦
        </p>
      </div>
    </main>
  );
}
