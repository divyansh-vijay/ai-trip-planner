import { useState } from "react"
import {
	X,
	Plane,
	Hotel,
	MapPin,
	Calendar,
	DollarSign,
	Star,
	ChevronDown,
	ChevronUp,
} from "lucide-react"

/* ----------------------------
   TYPES
----------------------------- */
export interface Flight {
	option: string
	price: number
	score: number
}

export interface Hotel {
	name: string
	price: number
	rating: number
	score: number
}

export interface Activity {
	name: string
	price: number
	type: string
	score: number
}

export interface ItineraryData {
	agents: {
		research: {
			flights: Flight[]
			hotels: Hotel[]
			activities: Activity[]
		}
		optimizer: {
			flight: Flight
			hotel: Hotel
			activities: Activity[]
			estimated_total: number
		}
	}
	itinerary: string
}

export interface ItineraryResultProps {
	destination: string
	backgroundImage: string
	data: ItineraryData
	onClose: () => void
}

/* ----------------------------
   PARSER FOR API RESPONSE
----------------------------- */
export function parseItineraryResponse(response: any): ItineraryData {
	return {
		agents: {
			research: {
				flights: response.agents.research.flights,
				hotels: response.agents.research.hotels,
				activities: response.agents.research.activities,
			},
			optimizer: {
				flight: response.agents.optimizer.flight,
				hotel: response.agents.optimizer.hotel,
				activities: response.agents.optimizer.activities,
				estimated_total: response.agents.optimizer.estimated_total,
			},
		},
		itinerary: response.itinerary,
	}
}

/* ----------------------------
   FALLBACK SAMPLE DATA
----------------------------- */
const sampleData: ItineraryData = {
	agents: {
		research: {
			flights: [
				{ option: "IndiGo JAI-101", price: 2451, score: 1.089 },
				{ option: "Vistara JAI-202", price: 2851, score: 1.099 },
				{ option: "SpiceJet JAI-303", price: 3351, score: 1.088 },
			],
			hotels: [
				{
					name: "Jaipur Grand",
					price: 1075,
					rating: 4.3,
					score: 1.123,
				},
				{
					name: "Jaipur Residency",
					price: 717,
					rating: 4.0,
					score: 1.099,
				},
				{
					name: "Comfort Jaipur",
					price: 537,
					rating: 3.8,
					score: 1.074,
				},
			],
			activities: [
				{
					name: "Main Sightseeing in Jaipur",
					price: 300,
					type: "history",
					score: 1.095,
				},
				{
					name: "Local Food Walk in Jaipur",
					price: 700,
					type: "food",
					score: 1.095,
				},
				{
					name: "Cultural Show at Jaipur",
					price: 500,
					type: "culture",
					score: 1.1,
				},
			],
		},
		optimizer: {
			flight: { option: "Vistara JAI-202", price: 2851, score: 1.099 },
			hotel: {
				name: "Jaipur Grand",
				price: 1075,
				rating: 4.3,
				score: 1.123,
			},
			activities: [
				{
					name: "Cultural Show at Jaipur",
					price: 500,
					type: "culture",
					score: 1.1,
				},
				{
					name: "Main Sightseeing in Jaipur",
					price: 300,
					type: "history",
					score: 1.095,
				},
				{
					name: "Local Food Walk in Jaipur",
					price: 700,
					type: "food",
					score: 1.095,
				},
			],
			estimated_total: 17302,
		},
	},
	itinerary: `### Sample Itinerary`,
}

/* ----------------------------
   ITINERARY RESULT COMPONENT
----------------------------- */
export const ItineraryResult = ({
	destination,
	backgroundImage,
	data = sampleData,
	onClose,
}: ItineraryResultProps) => {
	const [expandedDay, setExpandedDay] = useState<number | null>(0)
	const { flight, hotel, activities, estimated_total } = data.agents.optimizer

	/* ------------ PARSE ITINERARY INTO DAYS ------------ */
	const parseDays = () => {
		const lines = data.itinerary.split("\n")
		const days: { title: string; content: string[] }[] = []
		let currentDay: { title: string; content: string[] } | null = null

		for (const rawLine of lines) {
			// normalize line: strip bold/italic markers but keep content
			const line = rawLine.replace(/\*\*/g, "").replace(/\*/g, "").trim()

			// Match day headers like:
			// "### Day 1: Arrival...", "#### Day 2 - Something", "Day 3: ..."
			const dayMatch = line.match(
				/^(?:#{1,6}\s*)?Day\s*(\d+)\s*[:\-\—]?\s*(.*)$/i
			)
			if (dayMatch) {
				// push previous
				if (currentDay) days.push(currentDay)

				const dayNum = dayMatch[1]
				const rest = dayMatch[2] ? dayMatch[2].trim() : ""
				const title = rest ? `Day ${dayNum}: ${rest}` : `Day ${dayNum}`
				currentDay = { title, content: [] }
				continue
			}

			// If not a day header, but we have an active day, collect content lines
			if (currentDay) {
				// Skip markdown separators
				if (line.startsWith("---")) continue
				// keep original rawLine spacing for nicer display (optional)
				currentDay.content.push(rawLine)
			}
		}

		if (currentDay) days.push(currentDay)
		return days
	}

	const days = parseDays()

	return (
		<div className="fixed inset-0 z-50 overflow-hidden">
			{/* BACKGROUND */}
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{
					backgroundImage: `url(${backgroundImage})`,
					filter: "brightness(0.3)",
				}}
			/>

			<div className="relative h-full overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/50 scrollbar-track-transparent">
				<div className="min-h-full px-4 sm:px-6 py-8 sm:py-12">
					<div className="max-w-6xl mx-auto">
						{/* CLOSE BUTTON */}
						<button
							onClick={onClose}
							className="fixed top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full text-white transition-all duration-200 hover:scale-110">
							<X className="w-6 h-6" />
						</button>

						{/* HEADER */}
						<div className="text-center mb-8 sm:mb-12">
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
								Your Perfect Trip to {destination}
							</h1>
							<p className="text-lg sm:text-xl text-white/90">
								Personalized itinerary crafted just for you
							</p>
						</div>

						{/* TOTAL COST CARD */}
						<div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-2xl">
							<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
								<h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 text-white">
									<div className="p-2 bg-white/20 rounded-full">
										<DollarSign className="w-6 h-6 sm:w-7 sm:h-7" />
									</div>
									Total Budget
								</h2>
								<div className="text-4xl sm:text-5xl font-bold text-white">
									₹{estimated_total.toLocaleString()}
								</div>
							</div>
						</div>

						{/* FLIGHT / HOTEL / ACTIVITIES CARDS */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
							{/* FLIGHT */}
							<div className="bg-white/95 backdrop-blur-md rounded-xl p-5 sm:p-6 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
								<div className="flex items-start gap-3 mb-4">
									<div className="p-3 rounded-full bg-emerald-100">
										<Plane className="w-6 h-6 text-emerald-600" />
									</div>
									<div className="flex-1">
										<h3 className="font-bold text-lg text-gray-900">
											Flight
										</h3>
										<p className="text-sm text-gray-600 truncate">
											{flight.option}
										</p>
									</div>
								</div>
								<div className="text-3xl font-bold text-emerald-600">
									₹{flight.price.toLocaleString()}
								</div>
								<div className="text-xs text-gray-500 mt-1">
									per person
								</div>
							</div>

							{/* HOTEL */}
							<div className="bg-white/95 backdrop-blur-md rounded-xl p-5 sm:p-6 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
								<div className="flex items-start gap-3 mb-4">
									<div className="p-3 rounded-full bg-blue-100">
										<Hotel className="w-6 h-6 text-blue-600" />
									</div>
									<div className="flex-1">
										<h3 className="font-bold text-lg text-gray-900">
											Hotel
										</h3>
										<p className="text-sm text-gray-600 truncate">
											{hotel.name}
										</p>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<div className="text-3xl font-bold text-blue-600">
										₹{hotel.price.toLocaleString()}
									</div>
									<div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
										<Star className="w-4 h-4 fill-amber-400 text-amber-400" />
										<span className="font-semibold text-amber-600">
											{hotel.rating}
										</span>
									</div>
								</div>
								<div className="text-xs text-gray-500 mt-1">
									per night
								</div>
							</div>

							{/* ACTIVITIES */}
							<div className="bg-white/95 backdrop-blur-md rounded-xl p-5 sm:p-6 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
								<div className="flex items-start gap-3 mb-4">
									<div className="p-3 rounded-full bg-purple-100">
										<MapPin className="w-6 h-6 text-purple-600" />
									</div>
									<div className="flex-1">
										<h3 className="font-bold text-lg text-gray-900">
											Activities
										</h3>
										<p className="text-sm text-gray-600">
											{activities.length} experiences
										</p>
									</div>
								</div>
								<div className="space-y-2">
									{activities.map((activity, idx) => (
										<div
											key={idx}
											className="flex justify-between text-sm">
											<span className="text-gray-700 truncate flex-1">
												{activity.name}
											</span>
											<span className="font-semibold text-purple-600 whitespace-nowrap">
												₹{activity.price}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* DAY BY DAY ITINERARY */}
						<div className="space-y-3 sm:space-y-4 pb-8 sm:pb-12">
							<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
								<div className="p-2 bg-emerald-500 rounded-full">
									<Calendar className="w-7 h-7 sm:w-8 sm:h-8" />
								</div>
								Day-by-Day Itinerary
							</h2>

							{days.map((day, index) => (
								<div
									key={index}
									className="bg-white/95 backdrop-blur-md rounded-xl overflow-hidden shadow-xl">
									<button
										onClick={() =>
											setExpandedDay(
												expandedDay === index
													? null
													: index
											)
										}
										className="w-full p-5 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
										<div className="flex items-center gap-3 sm:gap-4">
											<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
												{index + 1}
											</div>
											<h3 className="text-lg sm:text-xl font-semibold text-gray-900">
												{day.title}
											</h3>
										</div>

										{expandedDay === index ? (
											<ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
										) : (
											<ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
										)}
									</button>

									{expandedDay === index && (
										<div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-3 border-t border-gray-200">
											{day.content.map(
												(line, lineIdx) => {
													const trimmedLine =
														line.trim()

													// Section heading (**Morning**, **Afternoon** etc.)
													if (
														trimmedLine.startsWith(
															"**"
														) &&
														trimmedLine.endsWith(
															"**"
														) &&
														!trimmedLine.includes(
															":"
														)
													) {
														const text =
															trimmedLine.replace(
																/\*\*/g,
																""
															)
														return (
															<div
																key={lineIdx}
																className="mt-5 mb-3">
																<h4 className="font-bold text-lg text-emerald-600 flex items-center gap-2">
																	<div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
																	{text}
																</h4>
															</div>
														)
													}

													// Bold name + details
													if (
														trimmedLine.startsWith(
															"- **"
														)
													) {
														const match =
															trimmedLine.match(
																/- \*\*([^*]+)\*\*:?\s*(.*)/
															)
														if (match) {
															const [
																,
																boldText,
																restText,
															] = match
															return (
																<div
																	key={
																		lineIdx
																	}
																	className="flex gap-3 ml-4 sm:ml-6 my-2">
																	<div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
																	<p className="text-sm text-gray-800">
																		<strong className="text-gray-900">
																			{
																				boldText
																			}
																			:
																		</strong>
																		{restText &&
																			` ${restText}`}
																	</p>
																</div>
															)
														}
													}

													// Simple bullet
													if (
														trimmedLine.startsWith(
															"- "
														)
													) {
														return (
															<div
																key={lineIdx}
																className="flex gap-3 ml-4 sm:ml-6">
																<div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2" />
																<p className="text-sm text-gray-600">
																	{trimmedLine.replace(
																		/^- /,
																		""
																	)}
																</p>
															</div>
														)
													}

													// Normal paragraph text
													if (
														trimmedLine &&
														!trimmedLine.startsWith(
															"---"
														)
													) {
														return (
															<div
																key={lineIdx}
																className="ml-4 sm:ml-6">
																<p className="text-sm text-gray-600">
																	{
																		trimmedLine
																	}
																</p>
															</div>
														)
													}

													return null
												}
											)}
										</div>
									)}
								</div>
							))}
						</div>

						{/* ACTION BUTTONS */}
						<div className="flex flex-col sm:flex-row justify-center gap-4 pb-12 px-4">
							<button className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl">
								Book This Trip
							</button>
							<button
								onClick={onClose}
								className="px-8 py-4 text-lg font-semibold rounded-full bg-white/95 text-gray-900 border-2 border-white shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl">
								Modify Preferences
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
