// File-based JSON data store. Lives outside the build directory so admin edits
// survive deploys.
//
// Resolution order for each collection:
//   1. ${DATA_DIR}/<name>.json — writeable persistent file (admin edits land here)
//   2. <bundled seed>          — read-only fallback shipped with the build
//
// All writes go to (1). Reads merge (1) over (2) by id/slug so deletes also work.

import { promises as fs } from 'fs';
import * as path from 'path';

// Bundled fallback seeds (always available, even on fresh install).
import seedPortfolio from '../data/seeds/portfolio.json';
import seedServices from '../data/seeds/services.json';
import seedBlogRaw from '../data/seeds/blog.json';
import seedTestimonials from '../data/seeds/testimonials.json';
import seedTeam from '../data/seeds/team.json';
import seedFaq from '../data/seeds/faq.json';
import seedSettings from '../data/seeds/settings.json';

const seedBlogPosts = (seedBlogRaw as any).posts || [];

export type Collection =
    | 'portfolio'
    | 'services'
    | 'blog'
    | 'testimonials'
    | 'team'
    | 'faq';

const SEEDS: Record<Collection, any[]> = {
    portfolio: seedPortfolio as any[],
    services: seedServices as any[],
    blog: seedBlogPosts as any[],
    testimonials: seedTestimonials as any[],
    team: seedTeam as any[],
    faq: seedFaq as any[],
};

function dataDir(): string {
    return process.env.DATA_DIR || '/home/u492425110/domains/barmagly.tech/public_html/data';
}

async function ensureDir() {
    try {
        await fs.mkdir(dataDir(), { recursive: true });
    } catch {
        /* ignore — first write will surface a real error */
    }
}

async function readFile<T>(name: string): Promise<T | null> {
    try {
        const raw = await fs.readFile(path.join(dataDir(), `${name}.json`), 'utf-8');
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

async function writeFile(name: string, data: unknown) {
    await ensureDir();
    const tmp = path.join(dataDir(), `${name}.json.tmp`);
    const final = path.join(dataDir(), `${name}.json`);
    await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf-8');
    await fs.rename(tmp, final);
}

function rid(): string {
    // 24-char hex, MongoDB ObjectId-ish so existing UI code doesn't choke.
    return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

/**
 * Returns the live array for a collection: persistent file overrides seed
 * (matched by id, then slug). Items present in seed but tombstoned by a
 * persistent-file "{ _deleted: id }" entry are filtered out.
 */
export async function readAll<T extends { id?: string; slug?: string }>(
    name: Collection
): Promise<T[]> {
    const persisted = (await readFile<any[]>(name)) || [];
    const seed = SEEDS[name] as T[];

    // Build dedupe map: persistent wins over seed.
    const byKey = new Map<string, T>();
    const keyOf = (x: any) => x.id || x.slug || JSON.stringify(x);

    seed.forEach((s) => byKey.set(keyOf(s), s));

    const tombstones = new Set<string>();
    persisted.forEach((p: any) => {
        if (p && p._deleted) {
            tombstones.add(p._deleted);
            return;
        }
        byKey.set(keyOf(p), p);
    });

    return Array.from(byKey.values()).filter((x: any) => !tombstones.has(keyOf(x)));
}

export async function findOne<T extends { id?: string; slug?: string }>(
    name: Collection,
    pred: (item: T) => boolean
): Promise<T | null> {
    const all = await readAll<T>(name);
    return all.find(pred) || null;
}

export async function createOne<T extends Record<string, any>>(
    name: Collection,
    payload: T
): Promise<T & { id: string; createdAt: string; updatedAt: string }> {
    const persisted = (await readFile<any[]>(name)) || [];
    const now = new Date().toISOString();
    const created = {
        ...payload,
        id: payload.id || rid(),
        createdAt: now,
        updatedAt: now,
    };
    persisted.push(created);
    await writeFile(name, persisted);
    return created as any;
}

export async function updateOne(
    name: Collection,
    id: string,
    patch: Record<string, any>
): Promise<any | null> {
    const persisted = (await readFile<any[]>(name)) || [];
    const idx = persisted.findIndex((x: any) => x.id === id);
    const now = new Date().toISOString();

    if (idx >= 0) {
        persisted[idx] = { ...persisted[idx], ...patch, id, updatedAt: now };
        await writeFile(name, persisted);
        return persisted[idx];
    }

    // Item lives only in the seed — promote a copy into the persistent file with the patch applied.
    const seed = SEEDS[name].find((x: any) => x.id === id);
    if (!seed) return null;

    const promoted = { ...seed, ...patch, id, updatedAt: now };
    persisted.push(promoted);
    await writeFile(name, persisted);
    return promoted;
}

export async function deleteOne(name: Collection, id: string): Promise<boolean> {
    const persisted = (await readFile<any[]>(name)) || [];
    let changed = false;

    const filtered = persisted.filter((x: any) => {
        if (x.id === id) {
            changed = true;
            return false;
        }
        return true;
    });

    // If item only lives in seed, add tombstone so reads exclude it.
    const inSeed = SEEDS[name].some((x: any) => x.id === id);
    if (inSeed) {
        filtered.push({ _deleted: id });
        changed = true;
    }

    if (!changed) return false;
    await writeFile(name, filtered);
    return true;
}

export function getSettings(): Record<string, string> {
    return seedSettings as Record<string, string>;
}

export async function getStats() {
    const [portfolio, services, blog, testimonials, team, faq] = await Promise.all([
        readAll('portfolio'),
        readAll('services'),
        readAll('blog'),
        readAll('testimonials'),
        readAll('team'),
        readAll('faq'),
    ]);
    return {
        portfolio: portfolio.length,
        services: services.length,
        blog: blog.length,
        testimonials: testimonials.length,
        team: team.length,
        faq: faq.length,
        leads: 0, // Leads aren't persisted yet — emailed only.
    };
}
