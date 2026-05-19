import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from './requireAdmin';
import { readAll, createOne, updateOne, deleteOne, type Collection } from './dataStore';

export function makeCollectionHandlers(name: Collection) {
    return {
        async GET(req: NextRequest) {
            const auth = requireAdmin(req);
            if (!auth.ok) return auth.res;
            const data = await readAll<any>(name);
            return NextResponse.json(data);
        },
        async POST(req: NextRequest) {
            const auth = requireAdmin(req);
            if (!auth.ok) return auth.res;
            let body: any;
            try {
                body = await req.json();
            } catch {
                return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
            }
            const created = await createOne(name, body);
            return NextResponse.json(created, { status: 201 });
        },
    };
}

export function makeItemHandlers(name: Collection) {
    return {
        async PUT(req: NextRequest, { params }: { params: { id: string } }) {
            const auth = requireAdmin(req);
            if (!auth.ok) return auth.res;
            let body: any;
            try {
                body = await req.json();
            } catch {
                return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
            }
            const updated = await updateOne(name, params.id, body);
            if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
            return NextResponse.json(updated);
        },
        async DELETE(req: NextRequest, { params }: { params: { id: string } }) {
            const auth = requireAdmin(req);
            if (!auth.ok) return auth.res;
            const ok = await deleteOne(name, params.id);
            if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
            return NextResponse.json({ success: true });
        },
    };
}
