import { useState, useEffect, useMemo } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import {
	Plane,
	Hotel,
	Calculator,
	FileText,
	CheckCircle2,
	Sparkles,
	PartyPopper,
} from "lucide-react"

// --- BETTER 4: Moved agent messages outside ---
// This prevents it from being redeclared on every render.
const getAgentMessages = (destinationName: string) => [
	{
		id: "1",
		agent: "Research Agent",
		message: `Analyzing flights to ${destinationName}...`,
		icon: <Plane className="h-6 w-6" />,
		color: "from-blue-500 to-cyan-500",
		duration: 2000, // We'll use this duration later if we want a state machine
	},
	{
		id: "2",
		agent: "Hotel Agent",
		message: "Comparing accommodations and pricing...",
		icon: <Hotel className="h-6 w-6" />,
		color: "from-purple-500 to-pink-500",
		duration: 2000,
	},
	{
		id: "3",
		agent: "Optimizer Agent",
		message: "Calculating best routes and timing...",
		icon: <Calculator className="h-6 w-6" />,
		color: "from-orange-500 to-red-500",
		duration: 2000,
	},
	{
		id: "4",
		agent: "AI Writer",
		message: "Generating personalized itinerary...",
		icon: <FileText className="h-6 w-6" />,
		color: "from-green-500 to-emerald-500",
		duration: 2000,
	},
]

interface TripData {
	destination: {
		name: string
		country: string
	} | null
	budget: string
	startDate: string
	endDate: string
	travelers: number
	interests: string[]
}

interface LoadingAgentProps {
	tripData: TripData
	// --- FIX 1: Added onComplete prop ---
	onComplete: () => void
}

const LoadingAgent = ({ tripData, onComplete }: LoadingAgentProps) => {
	const [visibleMessages, setVisibleMessages] = useState<number>(0)
	const [progress, setProgress] = useState<number>(0)
	// --- FIX 3: Added 'isComplete' state ---
	const [isComplete, setIsComplete] = useState(false)

	const agentMessages = useMemo(
		() =>
			getAgentMessages(tripData.destination?.name || "your destination"),
		[tripData.destination]
	)

	// --- BETTER 2: Centralized animation controls ---
	const planeControls = useAnimation()
	const orb1Controls = useAnimation()
	const orb2Controls = useAnimation()
	const orb3Controls = useAnimation()
	const particleControls = useAnimation()
	const bottomMessageControls = useAnimation()

	// --- BETTER 4: Memoized particles array ---
	const particles = useMemo(
		() =>
			Array.from({ length: 30 }, (_, i) => ({
				id: i,
				x: Math.random() * 100,
				y: Math.random() * 100,
				size: Math.random() * 4 + 2,
				duration: Math.random() * 3 + 2,
				delay: Math.random() * 2,
			})),
		[]
	)

	useEffect(() => {
		// Start all animations
		planeControls.start({
			x: ["0%", "100%"],
			transition: { duration: 10, repeat: Infinity, ease: "linear" },
		})
		orb1Controls.start({
			scale: [1, 1.3, 1],
			x: [0, 50, 0],
			y: [0, 30, 0],
			opacity: [0.4, 0.6, 0.4],
			transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
		})
		orb2Controls.start({
			scale: [1.2, 1, 1.2],
			x: [0, -40, 0],
			y: [0, -50, 0],
			opacity: [0.5, 0.3, 0.5],
			transition: { duration: 7, repeat: Infinity, ease: "easeInOut" },
		})
		orb3Controls.start({
			scale: [1, 1.4, 1],
			rotate: [0, 180, 360],
			transition: { duration: 10, repeat: Infinity, ease: "linear" },
		})
		bottomMessageControls.start({
			opacity: [0.6, 1, 0.6],
			transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
		})

		// --- Timers remain largely the same, but with a completion check ---
		const messageTimer = setInterval(() => {
			setVisibleMessages((prev) => {
				if (prev >= agentMessages.length) {
					clearInterval(messageTimer)
					return prev
				}
				return prev + 1
			})
		}, 2000) // 8 seconds total

		const progressTimer = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(progressTimer)
					// --- FIX 3: Trigger completion state ---
					setIsComplete(true)
					return 100
				}
				return prev + 1
			})
		}, 80) // 8 seconds total

		return () => {
			clearInterval(messageTimer)
			clearInterval(progressTimer)
		}
	}, [
		agentMessages.length,
		planeControls,
		orb1Controls,
		orb2Controls,
		orb3Controls,
		bottomMessageControls,
	])

	// --- FIX 3: Effect to handle graceful completion ---
	useEffect(() => {
		if (isComplete) {
			// Stop all looping animations
			planeControls.stop()
			orb1Controls.stop()
			orb2Controls.stop()
			orb3Controls.stop()
			bottomMessageControls.stop()

			// Give a moment for the "Done" UI to show, then call onComplete
			const completeTimer = setTimeout(() => {
				onComplete()
			}, 2500) // Wait 2.5s on the "Done" screen before transitioning

			return () => clearTimeout(completeTimer)
		}
	}, [
		isComplete,
		onComplete,
		planeControls,
		orb1Controls,
		orb2Controls,
		orb3Controls,
		bottomMessageControls,
	])

	return (
		<div className="h-full w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
			{/* Animated Background Orbs */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl"
					animate={orb1Controls}
				/>
				<motion.div
					className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-full blur-3xl"
					animate={orb2Controls}
				/>
				<motion.div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-accent/15 to-transparent rounded-full blur-3xl"
					animate={orb3Controls}
				/>
			</div>

			{/* Floating Particles */}
			{!isComplete &&
				particles.map(
					(
						particle // Hide particles on complete
					) => (
						<motion.div
							key={particle.id}
							className="absolute rounded-full bg-primary/30"
							style={{
								left: `${particle.x}%`,
								top: `${particle.y}%`,
								width: particle.size,
								height: particle.size,
							}}
							animate={{
								y: [-20, -100],
								opacity: [0, 1, 0],
								scale: [0, 1, 0],
							}}
							transition={{
								duration: particle.duration,
								repeat: Infinity,
								delay: particle.delay,
								ease: "easeOut",
							}}
						/>
					)
				)}

			{/* Content Container */}
			<div className="relative z-10 w-full max-w-4xl px-8">
				<AnimatePresence>
					{!isComplete ? (
						// --- LOADING STATE UI ---
						<motion.div
							key="loading"
							exit={{ opacity: 0, scale: 0.9 }}
							transition={{ duration: 0.5 }}>
							{/* Top Section - Progress & Plane */}
							<div className="mb-12 space-y-8">
								{/* ... (Your existing header, progress bar, and plane animation code... it's perfect) ... */}
								{/* Destination Header */}
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-center space-y-3">
									<div className="flex items-center justify-center gap-3 mb-2">
										<Sparkles className="h-8 w-8 text-primary animate-pulse" />
										<h2 className="text-2xl font-semibold text-muted-foreground">
											Planning your trip to
										</h2>
										<Sparkles className="h-8 w-8 text-primary animate-pulse" />
									</div>
									<h1 className="text-6xl font-bold text-foreground">
										{tripData.destination?.name}
									</h1>
								</motion.div>

								{/* Progress Bar */}
								<div className="space-y-4">
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground font-medium">
											Overall Progress
										</span>
										<motion.span
											key={progress}
											initial={{ scale: 1.2 }}
											animate={{ scale: 1 }}
											className="text-2xl font-bold text-primary">
											{progress}%
										</motion.span>
									</div>
									<div className="relative h-4 bg-muted rounded-full overflow-hidden shadow-inner">
										<motion.div
											className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
											initial={{ width: 0 }}
											animate={{ width: `${progress}%` }}
											transition={{
												duration: 0.5,
												ease: "easeOut",
											}}>
											<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
										</motion.div>
									</div>
								</div>

								{/* Plane Animation with Trail */}
								<div className="relative h-24 overflow-hidden">
									<motion.div
										className="absolute top-1/2 -translate-y-1/2"
										animate={planeControls}>
										<div className="relative">
											<motion.div
												animate={{
													y: [-5, 5, -5],
													rotate: [-2, 2, -2],
												}}
												transition={{
													duration: 2,
													repeat: Infinity,
													ease: "easeInOut",
												}}>
												<Plane className="h-20 w-20 text-primary drop-shadow-2xl" />
											</motion.div>
											{/* ... (rest of your plane trail/sparkle code) ... */}
										</div>
									</motion.div>
								</div>
							</div>

							{/* Agent Messages */}
							<div className="space-y-6">
								{/* ... (Your existing, excellent agentMessages.map()... it's perfect) ... */}
								{agentMessages.map((agent, index) => (
									<motion.div
										key={agent.id}
										initial={{
											opacity: 0,
											x: -80,
											scale: 0.8,
										}}
										animate={{
											opacity:
												visibleMessages > index ? 1 : 0,
											x:
												visibleMessages > index
													? 0
													: -80,
											scale:
												visibleMessages > index
													? 1
													: 0.8,
										}}
										transition={{
											duration: 0.6,
											ease: [0.34, 1.56, 0.64, 1],
											delay: index * 0.1,
										}}
										className="flex items-center gap-6">
										{/* Icon Container */}
										<motion.div
											className={`relative p-5 rounded-2xl bg-gradient-to-br ${agent.color} text-white shadow-2xl`}
											animate={
												visibleMessages === index + 1
													? { scale: [1, 1.1, 1] }
													: {}
											}
											transition={{
												duration: 1.5,
												repeat:
													visibleMessages ===
													index + 1
														? Infinity
														: 0,
											}}>
											{/* ... (icon pulse effect) ... */}
											<div className="relative z-10">
												{agent.icon}
											</div>
										</motion.div>

										{/* Message Card */}
										<div className="flex-1 bg-card/80 backdrop-blur-md border-2 border-border rounded-2xl p-6 shadow-xl">
											<div className="flex items-center justify-between">
												<div className="flex-1">
													<h3 className="font-bold text-foreground text-xl mb-2">
														{agent.agent}
													</h3>
													<p className="text-muted-foreground text-base">
														{agent.message}
													</p>

													{/* Loading Dots */}
													{visibleMessages ===
														index + 1 && (
														<div className="flex gap-1.5 mt-3">
															{[0, 1, 2].map(
																(i) => (
																	<motion.div
																		key={i}
																		className="w-2 h-2 bg-primary rounded-full"
																		animate={{
																			scale: [
																				1,
																				1.5,
																				1,
																			],
																			opacity:
																				[
																					0.5,
																					1,
																					0.5,
																				],
																		}}
																		transition={{
																			duration: 1,
																			repeat: Infinity,
																			delay:
																				i *
																				0.2,
																		}}
																	/>
																)
															)}
														</div>
													)}
												</div>

												{/* Checkmark Animation */}
												{visibleMessages >
													index + 1 && (
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
														<CheckCircle2 className="h-8 w-8 text-green-500" />
													</motion.div>
												)}
											</div>
										</div>
									</motion.div>
								))}
							</div>

							{/* Bottom Message */}
							<motion.div
								className="text-center mt-12 space-y-4"
								animate={bottomMessageControls}>
								<p className="text-2xl font-semibold text-foreground">
									Crafting your perfect itinerary...
								</p>
								<p className="text-base text-muted-foreground">
									Analyzing {tripData.travelers} traveler
									{tripData.travelers > 1 ? "s" : ""} • Budget
									₹{tripData.budget} •
									{tripData.interests.length} interests
								</p>
							</motion.div>
						</motion.div>
					) : (
						// --- COMPLETE STATE UI ---
						<motion.div
							key="complete"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								type: "spring",
								stiffness: 200,
								damping: 20,
								delay: 0.2,
							}}
							className="text-center flex flex-col items-center">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1, rotate: 360 }}
								transition={{
									type: "spring",
									stiffness: 150,
									damping: 15,
									delay: 0.5,
								}}>
								<PartyPopper className="h-32 w-32 text-primary" />
							</motion.div>
							<h1 className="text-6xl font-bold text-foreground mt-8">
								All done!
							</h1>
							<p className="text-2xl text-muted-foreground mt-4">
								Your personalized trip to{" "}
								{tripData.destination?.name} is ready.
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default LoadingAgent
