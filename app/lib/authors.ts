import { Author } from '@/app/lib/definitions';
import { notFound } from 'next/navigation';
import { getInternalApiBaseUrl } from "@/app/lib/api";

export async function fetchAuthors() : Promise<Author[]>{

    try {
        const url = `${getInternalApiBaseUrl()}/authors`
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