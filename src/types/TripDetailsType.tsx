export interface Place {
	id: string
	name: string
	tag: string
	// top_for: string
	image: string
	country: string
	description: string
	popularMonths: string[]
	avgBudget: string
	topInterests: string
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
