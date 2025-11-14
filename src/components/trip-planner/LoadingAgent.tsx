import { useState, useEffect, useMemo } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import {
	Plane,
	Building2,
	TrendingUp,
	FileText,
	CheckCircle2,
} from "lucide-react"
import { ItineraryResult } from "./resultPage"
// import { Destination } from ""

const mockResultData = {
	agents: {
		optimizer: {
			flight: { option: "Air France - Economy", price: 45000, score: 92 },
			hotel: { name: "Le Meurice", price: 12000, rating: 4.8, score: 88 },
			activities: [
				{
					name: "Louvre Museum Tour",
					price: 3000,
					type: "Art",
					score: 85,
				},
				{
					name: "Eiffel Tower Dinner",
					price: 5000,
					type: "Romance",
					score: 90,
				},
				{
					name: "Seine River Cruise",
					price: 2500,
					type: "Relax",
					score: 80,
				},
			],
			estimated_total: 97500,
		},
	},
	itinerary: `### Day 1: Arrival & City Walk
- **Morning**: Arrive in Paris, check into hotel
- **Afternoon**: Walk around Champs-Élysées
- **Evening**: Seine River Cruise

### Day 2: Art & Culture
- **Morning**: Visit Louvre Museum
- **Afternoon**: Explore Montmartre
- **Evening**: Eiffel Tower Dinner
`,
}

interface Destination {
	name: string
	nickname: string
	description: string
	best_time: string
	avg_budget: string
	top_for: string
	country: string
	colors: string[]
	image: string
}

interface TripData {
	destination: Destination | null
	budget: string
	description: string
	startDate: string
	endDate: string
	travelers: number
	interests: string[]
}

const getAgentMessages = (destinationName: string) => [
	{
		id: "1",
		agent: "Researching",
		message: `Finding best flights to ${destinationName}...`,
		icon: Plane,
		duration: 2000,
	},
	{
		id: "2",
		agent: "Comparing",
		message: "Checking accommodations and pricing...",
		icon: Building2,
		duration: 2000,
	},
	{
		id: "3",
		agent: "Optimizing",
		message: "Planning routes and timing...",
		icon: TrendingUp,
		duration: 2000,
	},
	{
		id: "4",
		agent: "Finalizing",
		message: "Creating your personalized itinerary...",
		icon: FileText,
		duration: 2000,
	},
]

function AgentLoading({ tripData }: { tripData: TripData }) {
	const [visibleMessages, setVisibleMessages] = useState<number>(0)
	const destination = tripData.destination
	const [progress, setProgress] = useState<number>(0)
	const [isComplete, setIsComplete] = useState(false)
	const [showResult, setShowResult] = useState(false)

	const agentMessages = useMemo(
		() => getAgentMessages(destination?.name || "your destination"),
		[destination]
	)

	console.log(destination)

	const planeControls = useAnimation()

	useEffect(() => {
		planeControls.start({
			x: ["0%", "0"],
			transition: { duration: 8, repeat: Infinity, ease: "linear" },
		})

		const messageTimer = setInterval(() => {
			setVisibleMessages((prev) => {
				if (prev >= agentMessages.length) {
					clearInterval(messageTimer)
					return prev
				}
				return prev + 1
			})
		}, 2000)

		const progressTimer = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(progressTimer)
					setIsComplete(true)
					setTimeout(() => {
						setShowResult(true)
					}, 1000)
					return 100
				}
				return prev + 1
			})
		}, 80)

		return () => {
			clearInterval(messageTimer)
			clearInterval(progressTimer)
		}
	}, [agentMessages.length, planeControls])

	const bgGradient = "linear-gradient(135deg, #F3F4F6, #F9FAFB)"

	if (showResult) {
		return (
			<motion.div
				key="result"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 1, ease: "easeOut" }}>
				<ItineraryResult
					destination={
						tripData.destination?.name || "Your Destination"
					}
					backgroundImage="https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
					accentColor="#ff4d6d"
					data={mockResultData}
					onClose={() => window.location.reload()}
				/>
			</motion.div>
		)
	}

	return (
		<div
			className="h-full w-full flex items-center justify-center relative overflow-hidden"
			style={{ background: bgGradient }}>
			<div className="absolute inset-0 opacity-3">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-white" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl bg-white" />
			</div>

			<div className="relative z-10 w-full px-6 flex items-center justify-center">
				<AnimatePresence>
					{!isComplete ? (
						<motion.div
							key="loading"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className="w-full max-w-2xl">
							<div className="text-center mb-12 flex flex-col items-center justify-center relative ">
								<motion.div
									className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6 z-10 bg-white"
									style={
										{
											// background: "rgba(59, 130, 246, 1)",
										}
									}
									animate={planeControls}>
									<Plane
										className="w-7 h-7"
										style={{
											color: "#3B82F6",
										}}
									/>
								</motion.div>

								<motion.h2
									className="text-4xl font-bold mb-2 z-10 text-white"
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6 }}>
									Planning Your Trip
								</motion.h2>

								<motion.p
									className="text-lg z-10 text-white"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.6, delay: 0.1 }}>
									to{" "}
									<span className="font-semibold">
										{destination?.name}
									</span>
								</motion.p>
								<div className="absolute w-[400px] h-[200px] rounded-lg bg-black border-4 border-white"></div>
								<img
									src={destination?.image}
									className="absolute z-0 object-cover rounded-lg shadow-lg w-[400px] h-[200px] opacity-80 border-4 blur-[0.7px] border-white "
									height={200}
									width={300}
									alt=""
								/>
							</div>

							<div className="space-y-3 mb-10">
								{agentMessages.map((agent, index) => {
									const Icon = agent.icon
									const isActive =
										visibleMessages === index + 1
									const isCompleted =
										visibleMessages > index + 1

									return (
										<motion.div
											key={agent.id}
											initial={{
												opacity: 0,
												x: -30,
												scale: 0.95,
											}}
											animate={{
												opacity:
													visibleMessages > index
														? 1
														: 0,
												x:
													visibleMessages > index
														? 0
														: -30,
												scale:
													visibleMessages > index
														? 1
														: 0.95,
											}}
											transition={{
												duration: 0.4,
												ease: "easeOut",
											}}
											className="flex items-center gap-3">
											<motion.div
												className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
												style={{
													background: "#F3F4F6",
												}}
												animate={
													isActive
														? {
																scale: [
																	1, 1.05, 1,
																],
														  }
														: {}
												}
												transition={{
													duration: 1.5,
													repeat: isActive
														? Infinity
														: 0,
												}}>
												{isCompleted ? (
													<motion.div
														initial={{
															scale: 0,
															rotate: -180,
														}}
														animate={{
															scale: 1,
															rotate: 0,
														}}
														transition={{
															type: "spring",
															stiffness: 200,
															damping: 15,
														}}>
														<CheckCircle2 className="w-5 h-5 text-green-500" />
													</motion.div>
												) : (
													<Icon
														className="w-5 h-5"
														style={{
															color: "#3B82F6",
															opacity: isActive
																? 1
																: 0.5,
														}}
													/>
												)}
											</motion.div>

											<div className="flex-1 bg-white/50 rounded-lg px-4 py-2 backdrop-blur-sm">
												<motion.div
													className="flex items-center justify-between"
													layout>
													<div className="text-left">
														<p
															className="text-sm font-medium"
															style={{
																color: "#111827",
															}}>
															{agent.agent}
														</p>
														<p
															className="text-xs"
															style={{
																color: "#6B7280",
															}}>
															{agent.message}
														</p>
													</div>
												</motion.div>
											</div>
										</motion.div>
									)
								})}
							</div>

							<motion.div className="space-y-3">
								<div className="flex items-center justify-between text-sm">
									<span
										className="font-medium"
										style={{
											color: "#6B7280",
										}}>
										Progress
									</span>
									<motion.span
										key={progress}
										initial={{ scale: 1.2 }}
										animate={{ scale: 1 }}
										className="font-semibold"
										style={{
											color: "#3B82F6",
										}}>
										{progress}%
									</motion.span>
								</div>

								<div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
									<motion.div
										className="absolute inset-y-0 left-0 rounded-full"
										style={{
											background: !destination
												? `linear-gradient(90deg, ${destination.colors[0]}, ${destination.colors[1]})`
												: "linear-gradient(90deg, #3B82F6, #1E40AF)",
										}}
										initial={{ width: 0 }}
										animate={{ width: `${progress}%` }}
										transition={{
											duration: 0.3,
											ease: "easeOut",
										}}
									/>
								</div>
							</motion.div>
						</motion.div>
					) : (
						<motion.div
							key="complete"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								type: "spring",
								stiffness: 200,
								damping: 20,
							}}
							className="text-center">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1, rotate: 360 }}
								transition={{
									type: "spring",
									stiffness: 150,
									damping: 15,
									delay: 0.3,
								}}
								className="mb-6">
								<CheckCircle2
									className="w-16 h-16 mx-auto"
									style={{
										color: "#10B981",
									}}
								/>
							</motion.div>

							<h1
								className="text-4xl font-bold mb-3"
								style={{
									color: "#111827",
								}}>
								All set!
							</h1>

							<p
								className="text-lg"
								style={{
									color: "#6B7280",
								}}>
								Your itinerary for{" "}
								<span className="font-semibold">
									{destination?.name}
								</span>{" "}
								is ready
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default AgentLoading
