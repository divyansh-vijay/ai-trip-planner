import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import baliImg from "@/assets/destinations/bali.jpg"
import dubaiImg from "@/assets/destinations/dubai.jpg"
import icelandImg from "@/assets/destinations/iceland.jpg"

interface Destination {
	name: string
	country: string
	image: string
	bestTime: string
	avgBudget: string
	topFor: string[]
}

const destinations: Destination[] = [
	{
		name: "Paris",
		country: "France",
		image: baliImg,
		bestTime: "Apr-Oct",
		avgBudget: "₹80,000-1,50,000",
		topFor: ["Romance", "Art", "Culture"],
	},
	{
		name: "Tokyo",
		country: "Japan",
		image: baliImg,
		bestTime: "Mar-May",
		avgBudget: "₹1,20,000-2,00,000",
		topFor: ["Technology", "Food", "Culture"],
	},
	{
		name: "Bali",
		country: "Indonesia",
		image: baliImg,
		bestTime: "Apr-Oct",
		avgBudget: "₹50,000-90,000",
		topFor: ["Beaches", "Spirituality", "Nature"],
	},
	{
		name: "Santorini",
		country: "Greece",
		image: baliImg,
		bestTime: "Apr-Nov",
		avgBudget: "₹1,00,000-1,80,000",
		topFor: ["Romance", "Sunsets", "Beaches"],
	},
	{
		name: "New York",
		country: "USA",
		image: dubaiImg,
		bestTime: "Apr-Jun",
		avgBudget: "₹1,50,000-2,50,000",
		topFor: ["City Life", "Shopping", "Museums"],
	},
	{
		name: "Dubai",
		country: "UAE",
		image: dubaiImg,
		bestTime: "Nov-Mar",
		avgBudget: "₹90,000-1,60,000",
		topFor: ["Luxury", "Shopping", "Architecture"],
	},
	{
		name: "Iceland",
		country: "Iceland",
		image: icelandImg,
		bestTime: "Jun-Sep",
		avgBudget: "₹1,80,000-2,80,000",
		topFor: ["Nature", "Adventure", "Northern Lights"],
	},
	{
		name: "Maldives",
		country: "Maldives",
		image: dubaiImg,
		bestTime: "Nov-Apr",
		avgBudget: "₹1,20,000-3,00,000",
		topFor: ["Beaches", "Diving", "Luxury"],
	},
	{
		name: "Rome",
		country: "Italy",
		image: dubaiImg,
		bestTime: "Apr-Jun",
		avgBudget: "₹90,000-1,50,000",
		topFor: ["History", "Food", "Art"],
	},
]

interface LandingProps {
	onDestinationSelect: (destination: Destination) => void
}

const Landing = ({ onDestinationSelect }: LandingProps) => {
	const [searchQuery, setSearchQuery] = useState("")

	const filteredDestinations = destinations.filter(
		(dest) =>
			dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			dest.country.toLowerCase().includes(searchQuery.toLowerCase())
	)

	// Split destinations into 3 columns
	const column1 = filteredDestinations.slice(0, 3)
	const column2 = filteredDestinations.slice(3, 6)
	const column3 = filteredDestinations.slice(6, 9)

	const DestinationCard = ({ destination }: { destination: Destination }) => (
		<button
			onClick={() => onDestinationSelect(destination)}
			className="group relative overflow-hidden rounded-xl aspect-[4/3] transition-all duration-300 hover:scale-105 hover:shadow-2xl flex-shrink-0 w-full">
			<img
				src={destination.image}
				alt={`${destination.name}, ${destination.country}`}
				className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
			<div className="absolute bottom-0 left-0 right-0 p-5 text-white">
				<div className="flex items-center gap-2 mb-1">
					<MapPin className="h-4 w-4" />
					<span className="text-sm opacity-90">
						{destination.country}
					</span>
				</div>
				<h3 className="text-2xl font-bold">{destination.name}</h3>
			</div>
		</button>
	)

	return (
		<div className="h-full w-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background via-background to-sky-light/10 overflow-hidden">
			<div className="w-full max-w-6xl space-y-12 relative z-10">
				{/* Header */}
				<div className="text-center space-y-4 animate-fade-in">
					<h1 className="text-6xl font-bold tracking-tight text-foreground">
						Welcome to AI Trip Planner
					</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Tell us where you want to go, and we'll generate a
						perfect itinerary automatically
					</p>
				</div>

				{/* Search Bar */}
				<div className="relative max-w-2xl mx-auto animate-scale-in">
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
					<Input
						placeholder="Where do you want to go?"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="h-14 pl-12 pr-4 text-lg border-2 focus:border-primary shadow-lg"
					/>
				</div>

				{/* Scrolling Destinations Grid */}
				<div className="grid grid-cols-3 gap-6 h-[500px]">
					{/* Column 1 - Scroll Up */}
					<div className="relative overflow-hidden">
						<motion.div
							className="flex flex-col gap-6"
							animate={{
								y: [0, -1000],
							}}
							transition={{
								duration: 20,
								repeat: Infinity,
								ease: "linear",
							}}>
							{[...column1, ...column1].map(
								(destination, index) => (
									<DestinationCard
										key={`col1-${index}`}
										destination={destination}
									/>
								)
							)}
						</motion.div>
					</div>

					{/* Column 2 - Scroll Down */}
					<div className="relative overflow-hidden">
						<motion.div
							className="flex flex-col gap-6"
							animate={{
								y: [-1000, 0],
							}}
							transition={{
								duration: 20,
								repeat: Infinity,
								ease: "linear",
							}}>
							{[...column2, ...column2].map(
								(destination, index) => (
									<DestinationCard
										key={`col2-${index}`}
										destination={destination}
									/>
								)
							)}
						</motion.div>
					</div>

					{/* Column 3 - Scroll Up */}
					<div className="relative overflow-hidden">
						<motion.div
							className="flex flex-col gap-6"
							animate={{
								y: [0, -1000],
							}}
							transition={{
								duration: 20,
								repeat: Infinity,
								ease: "linear",
							}}>
							{[...column3, ...column3].map(
								(destination, index) => (
									<DestinationCard
										key={`col3-${index}`}
										destination={destination}
									/>
								)
							)}
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Landing
