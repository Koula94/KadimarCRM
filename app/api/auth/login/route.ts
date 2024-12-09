import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Log the request for debugging
    console.log('Login request:', {
      email,
      passwordLength: password?.length || 0
    });

    // Call the backend login endpoint
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'http://localhost:3000'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    // Log the response status and headers for debugging
    console.log('Backend response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    let responseData;
    try {
      // Only try to parse JSON if there's content
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      }
    } catch (error) {
      console.error('Error parsing response:', error);
    }

    if (!response.ok) {
      // Handle 401 Unauthorized specifically
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      console.error('Backend login error:', {
        status: response.status,
        statusText: response.statusText,
        error: responseData
      });

      return NextResponse.json(
        { error: responseData?.error || 'Authentication failed' },
        { status: response.status }
      );
    }

    // Return the response with the token
    const res = NextResponse.json(
      { token: responseData?.token || '', message: 'Login successful' },
      {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Accept, Origin',
          'Access-Control-Allow-Credentials': 'true'
        }
      }
    );

    // Set the token as an HTTP-only cookie
    if (responseData?.token) {
      res.cookies.set('token', responseData.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });
    }

    return res;
  } catch (error) {
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Login error:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    } else {
      console.error('Unknown login error:', error);
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
