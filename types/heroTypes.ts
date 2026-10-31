export type heroContentType = {
  title: string;
  heading: string;
  subtitle: string;
};

export type heroVisuelImageName =
  'chairCard.webp' | 'glassesCard.webp' | 'coffeCard.webp' | 'kettleCard.webp';

export type heroVisuelType = Array<{
  image: heroVisuelImageName;
  isBehind: boolean;
}>;
