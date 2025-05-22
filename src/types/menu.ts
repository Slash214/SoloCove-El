

interface Meta {
	hidden: boolean,
	orderNo: number,
	title: string,
	icon: string,
}

export interface CustomMenu {
	meta: Meta,
	title: string,
	icon: string,
	path: string,
	children: CustomMenu[],
	component: any
}


export interface NewMenuItem {
    id: string
    title: string
    path: string
    icon?: string
    children: NewMenuItem[]
}