import { Author } from '@/app/lib/definitions';
import { notFound } from 'next/navigation';
import { API_BASE_URL } from './api';

export async function fetchAuthors() : Promise<Author[]>{

    try {
        const url = `${API_BASE_URL}/authors`
        const res = await fetch(url , {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            },
            next: { revalidate: 60}
        });
        if(res.status == 404) notFound();
        if(!res.ok) throw new Error(`Failed to fetch authors , status code: ${res.status}`);

        const data = res.json();
        return data;
    }catch(error){
        console.error(`Failed to fetch authors` , error);
        throw error;
    }
}