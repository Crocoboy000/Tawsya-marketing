export type ImpactHeadingContent = {
  eyebrow: string;
  title: string;
  metric: {
    value: string;
    description: string;
  };
};

export type ImpactImageContent = {
  src: string;
  alt: string;
  position: string;
};

export type ImpactGridContent = {
  ranking: {
    value: string;
    description: string;
    items: readonly {
      id: string;
      label: string;
    }[];
  };

  images: {
    kettle: ImpactImageContent;
    coffee: ImpactImageContent;
  };

  insight: {
    title: string;
    description: string;
  };

  analytics: {
    title: string;
    description: string;
    metrics: readonly {
      id: string;
      value: string;
      label: string;
    }[];
    footer: string;
  };
};

export type ImpactJourneyContent = {
  eyebrow: string;
  title: string;
  description: string;
  action: {
    label: string;
    href: string;
  };
  background: string;
};
