interface Listing {
    id: string;
    userId: string;
    title: string;          
    images: string[]; // array of image objects, which will be stored as URLs (render with Image component in React Native using source={{ uri: images[position].url }})     
    description: string;  
    price: string;    
    tags: string[];        
}

interface Clothing extends Listing {
    size: string;
    condition: string;
}

interface Item extends Listing {
    condition: string;
}

interface Housing extends Listing {
    paymentFrequency: string;
    leaseDuration: string;
}

interface Tickets extends Listing {
    eventDate: string;
    eventTime: string;
}

interface Service extends Listing {
    paymentFrequency: string;
}

export type { Listing, Clothing, Item, Housing, Tickets, Service };