import type { SiteConfig } from '@/lib/sites/config';

export interface ValidationResult {
  site: string;
  valid: boolean;
  errors: string[];
}

const REQUIRED_COUNTS = {
  chips: 20,
  namesStrip: 10,
  categories: 5,
  howWeChoose: 4,
  placesTabs: 3,
  itemsPerPlacesTab: 20,
  tourSlugsPerCategory: 3,
};

export function validateSiteConfig(config: SiteConfig): ValidationResult {
  const errors: string[] = [];

  // Check chips
  if (!config.chips || config.chips.length !== REQUIRED_COUNTS.chips) {
    errors.push(`chips ${config.chips?.length ?? 0}/${REQUIRED_COUNTS.chips}`);
  }

  // Check namesStrip
  if (!config.namesStrip || config.namesStrip.length !== REQUIRED_COUNTS.namesStrip) {
    errors.push(`namesStrip ${config.namesStrip?.length ?? 0}/${REQUIRED_COUNTS.namesStrip}`);
  }

  // Check categories
  if (!config.categories || config.categories.length !== REQUIRED_COUNTS.categories) {
    errors.push(`categories ${config.categories?.length ?? 0}/${REQUIRED_COUNTS.categories}`);
  } else {
    // Check each category has required fields and tour slugs
    config.categories.forEach((cat, idx) => {
      if (!cat.name) errors.push(`categories[${idx}]: missing name`);
      if (!cat.slug) errors.push(`categories[${idx}]: missing slug`);
      if (!cat.description) errors.push(`categories[${idx}]: missing description`);
      if (!cat.imageUrl) errors.push(`categories[${idx}]: missing imageUrl`);
      if (!cat.tourSlugs || cat.tourSlugs.length < REQUIRED_COUNTS.tourSlugsPerCategory) {
        errors.push(`categories[${idx}] "${cat.name}": tourSlugs ${cat.tourSlugs?.length ?? 0}/${REQUIRED_COUNTS.tourSlugsPerCategory}`);
      }
    });
  }

  // Check howWeChoose
  if (!config.howWeChoose || config.howWeChoose.length !== REQUIRED_COUNTS.howWeChoose) {
    errors.push(`howWeChoose ${config.howWeChoose?.length ?? 0}/${REQUIRED_COUNTS.howWeChoose}`);
  } else {
    config.howWeChoose.forEach((item, idx) => {
      if (!item.title) errors.push(`howWeChoose[${idx}]: missing title`);
      if (!item.description) errors.push(`howWeChoose[${idx}]: missing description`);
    });
  }

  // Check placesTabs
  if (!config.placesTabs || config.placesTabs.length !== REQUIRED_COUNTS.placesTabs) {
    errors.push(`placesTabs ${config.placesTabs?.length ?? 0}/${REQUIRED_COUNTS.placesTabs}`);
  } else {
    config.placesTabs.forEach((tab, idx) => {
      if (!tab.name) errors.push(`placesTabs[${idx}]: missing name`);
      if (!tab.href) errors.push(`placesTabs[${idx}]: missing href`);
    });
  }

  return {
    site: config.slug,
    valid: errors.length === 0,
    errors,
  };
}

export function validateAllConfigs(configs: Record<string, SiteConfig>): ValidationResult[] {
  return Object.values(configs).map(validateSiteConfig);
}
