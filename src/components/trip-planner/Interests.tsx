import { useState } from "react"
import { ArrowLeft, Compass, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const availableInterests = [
	{ id: "beaches", label: "Beaches", icon: "🏖️" },
	{ id: "mountains", label: "Mountains", icon: "⛰️" },
	{ id: "culture", label: "Culture", icon: "🎭" },
	{ id: "food", label: "Food", icon: "🍜" },
	{ id: "adventure", label: "Adventure", icon: "🧗" },
	{ id: "nightlife", label: "Nightlife", icon: "🎉" },
	{ id: "shopping", label: "Shopping", icon: "🛍️" },
	{ id: "history", label: "History", icon: "🏛️" },
	{ id: "nature", label: "Nature", icon: "🌿" },
	{ id: "wildlife", label: "Wildlife", icon: "🦁" },
	{ id: "photography", label: "Photography", icon: "📸" },
	{ id: "relaxation", label: "Relaxation", icon: "🧘" },
	{ id: "spirituality", label: "Spirituality", icon: "🕉️" },
	{ id: "sports", label: "Sports", icon: "⚽" },
	{ id: "museums", label: "Museums", icon: "🖼️" },
	{ id: "festivals", label: "Festivals", icon: "🎊" },
	{ id: "architecture", label: "Architecture", icon: "🏰" },
	{ id: "diving", label: "Diving", icon: "🤿" },
]

interface InterestsProps {
	onSubmit: (interests: string[]) => void
	onBack: () => void
}

const Interests = ({ onSubmit, onBack }: InterestsProps) => {
	const [selectedInterests, setSelectedInterests] = useState<string[]>([])
	// const [searchQuery, setSearchQuery] = useState("")
	const [customInterest, setCustomInterest] = useState("")

	const filteredInterests = availableInterests
	// const filteredInterests = availableInterests.filter((interest) =>
	//     interest.label.toLowerCase().includes(searchQuery.toLowerCase())
	// )

	const toggleInterest = (id: string) => {
		setSelectedInterests((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
		)
	}

	const handleAddCustomInterest = () => {
		const trimmedInterest = customInterest.trim()
		if (
			trimmedInterest &&
			!selectedInterests.find(
				(i) => i.toLowerCase() === trimmedInterest.toLowerCase()
			)
		) {
			setSelectedInterests((prev) => [...prev, trimmedInterest])
		}
		setCustomInterest("")
	}

	const handleCustomInputKeydown = (
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === "Enter") {
			e.preventDefault()
			handleAddCustomInterest()
		}
	}

	const handleSubmit = () => {
		if (selectedInterests.length > 0) {
			onSubmit(selectedInterests)
		}
	}

	return (
		// Main container: flex row, full screen height
		<div className="flex h-screen w-full">
			{/* --- LEFT COLUMN --- */}
			<div className="w-full md:w-1/3 h-screen flex flex-col p-8 lg:p-12 bg-gradient-to-br from-background via-sky-light/5 to-background border-r border-border gap-[20px]">
				{/* Header */}
				<div className="space-y-4">
					<Button variant="ghost" size="icon" onClick={onBack}>
						<ArrowLeft className="h-5 w-5" />
					</Button>
					<div className="flex items-center gap-3 pt-4">
						<Compass className="h-10 w-10 text-primary" />
					</div>
					<h1 className="text-4xl lg:text-5xl font-bold text-foreground">
						What are you interested in?
					</h1>
					<p className="text-lg lg:text-xl text-muted-foreground">
						Your selected interests will appear below.
					</p>
				</div>

				{/* Selected Interests (Scrollable) */}
				<div className="flex-1 space-y-4 overflow-y-auto py-8 my-8 border-t border-b border-border">
					{selectedInterests.length > 0 ? (
						<div className="flex flex-wrap justify-start gap-2 p-3">
							{selectedInterests.map((id) => {
								const interest = availableInterests.find(
									(i) => i.id === id
								)
								const label = interest ? interest.label : id
								const icon = interest ? interest.icon : "✨"

								return (
									<Badge
										key={id}
										variant="secondary"
										className="text-base px-3 py-1.5 flex items-center gap-2 bg-green-600 rounded-[20px] text-white">
										<span>
											{icon} {label}
										</span>
										<button
											onClick={() => toggleInterest(id)}
											className="rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors"
											aria-label={`Remove ${label}`}>
											<X className="h-3.5 w-3.5" />
										</button>
									</Badge>
								)
							})}
						</div>
					) : (
						<div className="flex items-center justify-center h-full">
							<p className="text-muted-foreground text-center">
								Select interests from the right to get started.
							</p>
						</div>
					)}
				</div>

				{/* Submit Button */}
				<div className="pt-6">
					<Button
						onClick={handleSubmit}
						disabled={selectedInterests.length === 0}
						size="lg"
						className="h-14 text-[20px] font-bold text-white bg-amber-600 w-full rounded-[10px] cursor-pointer hover:scale-[105%] transition-all duration-200">
						Find My Trip ({selectedInterests.length})
					</Button>
				</div>
			</div>

			{/* --- RIGHT COLUMN --- */}
			<div className="w-full md:w-2/3 h-screen flex flex-col p-8 lg:p-12 bg-card">
				{/* Search
                <div className="relative w-full max-w-xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search interests..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-12"
                    />
                </div> */}

				{/* Interest Grid (Scrollable) */}
				<div className="flex-1 overflow-y-auto my-8 py-4 pr-2">
					{" "}
					{/* pr-2 for scrollbar spacing */}
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
						{filteredInterests.map((interest, index) => (
							<button
								key={interest.id}
								onClick={() => toggleInterest(interest.id)}
								className={`
                                    relative p-6 rounded-xl border-2 transition-all duration-300
                                    hover:scale-105 hover:shadow-lg cursor-pointer
                                    ${
										selectedInterests.includes(interest.id)
											? "border-primary bg-primary/10 shadow-md"
											: "border-border bg-background hover:border-primary/50"
									}
                                `}
								style={{ animationDelay: `${index * 30}ms` }}>
								<div className="space-y-2 text-center">
									<div className="text-4xl">
										{interest.icon}
									</div>
									<div className="text-sm font-medium text-foreground">
										{interest.label}
									</div>
								</div>
							</button>
						))}
					</div>
				</div>

				{/* Manual Input */}
				<div className="flex w-full max-w-xl mx-auto gap-2 pt-6 border-t border-border">
					<Input
						placeholder="Or add your own (e.g., 'Hiking')"
						value={customInterest}
						onChange={(e) => setCustomInterest(e.target.value)}
						onKeyDown={handleCustomInputKeydown}
						className="h-12"
					/>
					<Button
						onClick={handleAddCustomInterest}
						className="h-12 px-6">
						Add
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Interests
