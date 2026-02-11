
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (email === 'mmahmutaliyev@gmail.com' && password === 'mirzohid') {
            // In a real app, send a secure token.
            // For this, we'll just acknowledge the login for client-side state.
            return NextResponse.json({ success: true, token: 'simple-admin-token' });
        }

        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
