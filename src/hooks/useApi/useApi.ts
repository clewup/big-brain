'use client'

import { useLockr } from '@/lib/lockr-auth/contexts/LockrContext'

enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export default function useApi() {
    const { user } = useLockr()

    async function makeRequest<T = unknown>(url: string, method: RequestMethod, body?: unknown) {
        return await fetch(url, {
            method: method,
            body: body ? JSON.stringify(body) : undefined,
            headers: user
                ? {
                      'x-user': user.email,
                  }
                : undefined,
        })
    }

    async function get<T>(url: string) {
        return makeRequest(url, RequestMethod.GET)
    }

    async function post<T>(url: string, body: unknown) {
        return makeRequest(url, RequestMethod.POST, body)
    }

    async function patch<T>(url: string, body: unknown) {
        return makeRequest(url, RequestMethod.PATCH, body)
    }

    async function put<T>(url: string, body: unknown) {
        return makeRequest(url, RequestMethod.PUT, body)
    }

    async function del<T>(url: string) {
        return makeRequest(url, RequestMethod.DELETE)
    }

    return {
        get,
        post,
        patch,
        put,
        del,
    }
}
