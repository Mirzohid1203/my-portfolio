
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

const COLLECTION = 'messages';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        await addDoc(collection(db, COLLECTION), {
            name,
            email,
            message,
            date: new Date().toISOString()
        });

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Firebase Contact POST Error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const q = query(collection(db, COLLECTION), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return NextResponse.json(messages);
    } catch (error) {
        console.error('Firebase Contact GET Error:', error);
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await deleteDoc(doc(db, COLLECTION, id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Firebase Contact DELETE Error:', error);
        return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }
}
