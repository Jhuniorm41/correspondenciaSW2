interface Views {
    path: string;
    title: string;
    icon: string
}

export interface MenuList {
    id: number,
    collapse: boolean;
    path: string;
    title: string;
    icon: string;
    class: string;
    views: Array<Views>;
}
