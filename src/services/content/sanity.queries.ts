export const siteContentQuery = `{
  "hero": *[_id == "hero"][0]{
    title,
    subtitle,
    highlights,
    "primaryCta": {
      "label": primaryCta.label,
      "href": primaryCta.href
    },
    "secondaryCta": {
      "label": secondaryCta.label,
      "href": secondaryCta.href
    },
    "image": {
      "src": image.image.asset->url,
      "alt": image.alt
    }
  },
  "advantages": *[_id == "advantages"][0]{
    title,
    description,
    "items": items[]{
      icon,
      title,
      text
    }
  },
  "tariffs": *[_id == "tariffs"][0]{
    title,
    subtitle,
    "rows": rows[]{
      category,
      price,
      conditions,
      details
    },
    note,
    ctaLabel,
    ctaHref
  },
  "conditions": *[_id == "conditions"][0]{
    title,
    description,
    items,
    ctaLabel,
    ctaHref,
    "image": {
      "src": image.image.asset->url,
      "alt": image.alt
    }
  },
  "about": *[_id == "about"][0]{
    title,
    description,
    "images": images[]{
      "src": image.asset->url,
      alt
    },
    "facts": facts[]{
      icon,
      title,
      text
    }
  },
  "geography": *[_id == "geography"][0]{
    title,
    description,
    mapCaption,
    "locations": locations[]{
      address,
      city,
      kind,
      label,
      note,
      x,
      y
    }
  },
  "contacts": *[_id == "contacts"][0]{
    title,
    description,
    email,
    phone,
    region,
    formNote,
    submitLabel
  }
}`;
