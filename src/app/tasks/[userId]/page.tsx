'use client'
import React from 'react';
import { useParams } from 'next/navigation';

export default function UserTasks() {
    const params = useParams();
    return (
        <div>
            <h2>hello tasks!</h2>
            <pre>{JSON.stringify(params, null, 2)}</pre>
        </div>
    );
}