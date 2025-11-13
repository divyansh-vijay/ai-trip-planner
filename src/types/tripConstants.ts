export const INTERESTS = [
	"Adventure",
	"Beach",
	"Culture",
	"Food & Wine",
	"History",
	"Nature",
	"Nightlife",
	"Photography",
	"Relaxation",
	"Shopping",
	"Sports",
	"Wildlife",
] as const

export const BUDGET_OPTIONS = [
	{ value: "budget", label: "Budget", range: "$500-1500" },
	{ value: "moderate", label: "Moderate", range: "$1500-3500" },
	{ value: "luxury", label: "Luxury", range: "$3500+" },
] as const
