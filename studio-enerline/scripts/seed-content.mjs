import { createReadStream } from 'node:fs';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { createClient } from '@sanity/client';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const studioDirectory = path.resolve(currentDirectory, '..');
const rootDirectory = path.resolve(studioDirectory, '..');

const DOCUMENT_IDS = {
  hero: 'hero',
  advantages: 'advantages',
  tariffs: 'tariffs',
  conditions: 'conditions',
  about: 'about',
  geography: 'geography',
  contacts: 'contacts',
};

const loadEnvironmentFile = async (filename) => {
  const filePath = path.resolve(studioDirectory, filename);

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');

    fileContents
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .forEach((line) => {
        const separatorIndex = line.indexOf('=');
        const key = line.slice(0, separatorIndex).trim();
        const rawValue = line.slice(separatorIndex + 1).trim();
        const value = rawValue.replace(/^['"]|['"]$/g, '');

        if (!process.env[key]) {
          process.env[key] = value;
        }
      });
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return;
    }

    throw error;
  }
};

const readJsonFile = async (relativePath) => {
  const absolutePath = path.resolve(rootDirectory, relativePath);
  const rawJson = await fs.readFile(absolutePath, 'utf8');

  return JSON.parse(rawJson);
};

const createKey = (prefix, index) => `${prefix}-${index + 1}`;

const getRequiredEnvironmentValue = (key) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

await loadEnvironmentFile('.env');
await loadEnvironmentFile('.env.local');

const client = createClient({
  projectId: '62aq38g6',
  dataset: 'production',
  apiVersion: '2026-04-08',
  useCdn: false,
  token: getRequiredEnvironmentValue('SANITY_AUTH_TOKEN'),
});

const assetCache = new Map();

const uploadImageAsset = async (publicAssetPath) => {
  if (assetCache.has(publicAssetPath)) {
    return assetCache.get(publicAssetPath);
  }

  const normalizedAssetPath = publicAssetPath.startsWith('/')
    ? publicAssetPath.slice(1)
    : publicAssetPath;
  const absoluteAssetPath = path.resolve(rootDirectory, 'public', normalizedAssetPath);

  const uploadedAsset = await client.assets.upload('image', createReadStream(absoluteAssetPath), {
    filename: path.basename(absoluteAssetPath),
  });

  assetCache.set(publicAssetPath, uploadedAsset);

  return uploadedAsset;
};

const createImageField = async (imageContent) => {
  const uploadedAsset = await uploadImageAsset(imageContent.src);

  return {
    _type: 'imageWithAlt',
    alt: imageContent.alt,
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: uploadedAsset._id,
      },
    },
  };
};

const createCallToActionField = (callToAction) => ({
  _type: 'callToAction',
  label: callToAction.label,
  href: callToAction.href,
});

const hero = await readJsonFile('public/content/hero.json');
const advantages = await readJsonFile('public/content/advantages.json');
const tariffs = await readJsonFile('public/content/tariffs.json');
const conditions = await readJsonFile('public/content/conditions.json');
const about = await readJsonFile('public/content/about.json');
const geography = await readJsonFile('public/content/geography.json');
const contacts = await readJsonFile('public/content/contacts.json');

const documents = [
  {
    _id: DOCUMENT_IDS.hero,
    _type: DOCUMENT_IDS.hero,
    title: hero.title,
    subtitle: hero.subtitle,
    highlights: hero.highlights,
    primaryCta: createCallToActionField(hero.primaryCta),
    secondaryCta: createCallToActionField(hero.secondaryCta),
    image: await createImageField(hero.image),
  },
  {
    _id: DOCUMENT_IDS.advantages,
    _type: DOCUMENT_IDS.advantages,
    title: advantages.title,
    description: advantages.description,
    items: advantages.items.map((item, index) => ({
      _key: createKey('advantage', index),
      _type: 'advantageItem',
      icon: item.icon,
      title: item.title,
      text: item.text,
    })),
  },
  {
    _id: DOCUMENT_IDS.tariffs,
    _type: DOCUMENT_IDS.tariffs,
    title: tariffs.title,
    subtitle: tariffs.subtitle,
    rows: tariffs.rows.map((row, index) => ({
      _key: createKey('tariff', index),
      _type: 'tariffRow',
      category: row.category,
      price: row.price,
      conditions: row.conditions,
      details: row.details,
    })),
    note: tariffs.note,
    ctaLabel: tariffs.ctaLabel,
    ctaHref: tariffs.ctaHref,
  },
  {
    _id: DOCUMENT_IDS.conditions,
    _type: DOCUMENT_IDS.conditions,
    title: conditions.title,
    description: conditions.description,
    items: conditions.items,
    ctaLabel: conditions.ctaLabel,
    ctaHref: conditions.ctaHref,
    image: await createImageField(conditions.image),
  },
  {
    _id: DOCUMENT_IDS.about,
    _type: DOCUMENT_IDS.about,
    title: about.title,
    description: about.description,
    images: await Promise.all(
      about.images.map(async (image, index) => ({
        _key: createKey('about-image', index),
        ...(await createImageField(image)),
      })),
    ),
    facts: about.facts.map((fact, index) => ({
      _key: createKey('about-fact', index),
      _type: 'aboutFact',
      icon: fact.icon,
      title: fact.title,
      text: fact.text,
    })),
  },
  {
    _id: DOCUMENT_IDS.geography,
    _type: DOCUMENT_IDS.geography,
    title: geography.title,
    description: geography.description,
    mapCaption: geography.mapCaption,
    locations: geography.locations.map((location, index) => ({
      _key: createKey('location', index),
      _type: 'geographyLocation',
      label: location.label,
      city: location.city,
      address: location.address,
      note: location.note,
      kind: location.kind,
      x: location.x,
      y: location.y,
    })),
  },
  {
    _id: DOCUMENT_IDS.contacts,
    _type: DOCUMENT_IDS.contacts,
    title: contacts.title,
    description: contacts.description,
    email: contacts.email,
    phone: contacts.phone,
    region: contacts.region,
    formNote: contacts.formNote,
    submitLabel: contacts.submitLabel,
  },
];

for (const document of documents) {
  await client.createOrReplace(document);
  process.stdout.write(`Seeded ${document._id}\n`);
}

process.stdout.write('Sanity content import complete.\n');
