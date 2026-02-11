
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (email === 'mmahmutaliyev411@gmail.com' && password === 'mirzohid') {
            return NextResponse.json({ success: true, token: 'simple-admin-token' });
        }

        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
