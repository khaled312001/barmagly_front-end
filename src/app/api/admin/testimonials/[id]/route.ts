import { makeItemHandlers } from '@/lib/adminCrud';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const { PUT, DELETE } = makeItemHandlers('testimonials');
