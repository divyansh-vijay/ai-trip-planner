import { useState } from "react"
import { Search, ArrowLeft, Compass } from "lucide-react"
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
	const [searchQuery, setSearchQuery] = useState("")

	const filteredInterests = availableInterests.filter((interest) =>
		interest.label.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const toggleInterest = (id: string) => {
		setSelectedInterests((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
		)
	}

	const handleSubmit = () => {
		if (selectedInterests.length > 0) {
			onSubmit(selectedInterests)
		}
	}

	return (
		<div className="h-full w-full flex overflow-auto flex-col items-center justify-center p-12 bg-gradient-to-br from-background via-sky-light/5 to-background">
			<div className="w-full max-w-4xl space-y-10">
				{/* Header */}
				<div className="text-center space-y-4 animate-fade-in">
					<Button
						variant="ghost"
						size="icon"
						onClick={onBack}
						className="mb-4">
						<ArrowLeft className="h-5 w-5" />
					</Button>

					<div className="flex items-center justify-center gap-3 mb-4">
						<Compass className="h-10 w-10 text-primary" />
					</div>

					<h1 className="text-5xl font-bold text-foreground">
						What are you interested in?
					</h1>
					<p className="text-xl text-muted-foreground">
						Select activities and experiences you'd like to explore
					</p>
				</div>

				{/* Search */}
				<div className="relative max-w-md mx-auto animate-scale-in">
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
					<Input
						placeholder="Search interests..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-12 h-12"
					/>
				</div>

				{/* Selected Count */}
				{selectedInterests.length > 0 && (
					<div className="text-center animate-fade-in">
						<Badge
							variant="secondary"
							className="text-base px-4 py-2">
							{selectedInterests.length} selected
						</Badge>
					</div>
				)}

				{/* Interest Grid */}
				<div className="grid grid-cols-4 gap-4 animate-fade-in">
					{filteredInterests.map((interest, index) => (
						<button
							key={interest.id}
							onClick={() => toggleInterest(interest.id)}
							className={`
                relative p-6 rounded-xl border-2 transition-all duration-300
                hover:scale-105 hover:shadow-lg
                ${
					selectedInterests.includes(interest.id)
						? "border-primary bg-primary/10 shadow-md"
						: "border-border bg-card hover:border-primary/50"
				}
              `}
							style={{ animationDelay: `${index * 30}ms` }}>
							<div className="space-y-2 text-center">
								<div className="text-4xl">{interest.icon}</div>
								<div className="text-sm font-medium text-foreground">
									{interest.label}
								</div>
							</div>
						</button>
					))}
				</div>

				{/* Submit Button */}
				<div className="flex justify-center pt-6 animate-fade-in">
					<Button
						onClick={handleSubmit}
						disabled={selectedInterests.length === 0}
						size="lg"
						className="w-full max-w-md h-14 text-lg">
						Find My Trip
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Interests
