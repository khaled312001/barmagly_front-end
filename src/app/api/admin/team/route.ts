import { makeCollectionHandlers } from '@/lib/adminCrud';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const { GET, POST } = makeCollectionHandlers('team');
