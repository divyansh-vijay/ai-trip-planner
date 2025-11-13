export interface Place {
	id: string
	name: string
	tag: string
	image: string
	country: string
	description: string
	popularMonths: string[]
	avgBudget: {
		low: number
		mid: number
		high: number
	}
	topInterests: string[]
}

export interface BookingState {
	dates: {
		start: Date | null
		end: Date | null
	}
	budget: string
	travelers: number
	interests: string[]
}
