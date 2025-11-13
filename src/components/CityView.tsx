import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, MapPin, TrendingUp } from "lucide-react"
import type { Place } from "@/types/TripDetailsType"
import { BookingPanel } from "@/components/trip-planner/TripDetails"

const extractDominantColor = async (imageUrl: string): Promise<string> => {
	// Placeholder: extract dominant color from image
	void imageUrl
	return "#2563EB"
}

const getContrastColor = (color: string): string => {
	// Placeholder: calculate contrast color
	void color
	return "#FFFFFF"
}

const motionConfig = {
	transition: {
		duration: 0.4,
		ease: "easeInOut" as const,
	},
}

interface CityViewProps {
	place: Place
	onSubmit: () => void
	onBack: () => void
}

export const CityView = ({ place, onBack, onSubmit }: CityViewProps) => {
	const [accentColor, setAccentColor] = useState("#2563EB")
	const [textColor, setTextColor] = useState("#FFFFFF")

	useEffect(() => {
		const loadColor = async () => {
			try {
				const color = await extractDominantColor(place.image)
				setAccentColor(color)
				setTextColor(getContrastColor(color))
			} catch {
				setAccentColor("#2563EB")
				setTextColor("#FFFFFF")
			}
		}

		loadColor()
	}, [place.image])

	return (
		<motion.div
			className="fixed inset-0 z-50 bg-white overflow-hidden"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: motionConfig.transition.duration }}>
			<div className="h-screen flex">
				<motion.div
					className="flex-1 relative"
					initial={{ x: -100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{
						duration: motionConfig.transition.duration,
						ease: motionConfig.transition.ease,
					}}>
					<img
						src={place.image}
						alt={`${place.name}, ${place.country}`}
						className="absolute inset-0 w-full h-full object-cover"
					/>

					<div
						className="absolute inset-0"
						style={{
							background: `linear-gradient(to right, ${accentColor}00 0%, ${accentColor}40 100%)`,
						}}
					/>

					<button
						className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors group"
						onClick={onBack}
						aria-label="Back to destinations">
						<ArrowLeft className="w-5 h-5 text-gray-700 group-hover:-translate-x-1 transition-transform" />
						<span className="text-sm font-medium text-gray-700">
							Back
						</span>
					</button>

					<div className="absolute bottom-0 left-0 right-0 p-12 bg-linear-to-t from-black/80 via-black/50 to-transparent">
						<motion.div
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.2 }}>
							<div className="mb-3">
								<span
									className="inline-block px-3 py-1 text-sm font-medium rounded-full"
									style={{
										backgroundColor: accentColor,
										color: textColor,
									}}>
									{place.tag}
								</span>
							</div>

							<h1 className="text-6xl font-bold text-white mb-3">
								{place.name}
							</h1>

							<div className="flex items-center gap-2 text-white/90 mb-6">
								<MapPin className="w-5 h-5" />
								<span className="text-xl">{place.country}</span>
							</div>

							<p className="text-lg text-white/90 max-w-2xl mb-8">
								{place.description}
							</p>

							<div className="grid grid-cols-3 gap-6 max-w-2xl">
								<div className="flex items-start gap-3">
									<div
										className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
										style={{
											backgroundColor: `${accentColor}40`,
										}}>
										<TrendingUp className="w-5 h-5 text-white" />
									</div>
									<div>
										<div className="text-xs text-white/70 mb-1">
											Avg Budget
										</div>
										<div className="text-sm font-medium text-white">
											{place.avgBudget}
										</div>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<div
										className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
										style={{
											backgroundColor: `${accentColor}40`,
										}}>
										<span className="text-lg">⭐</span>
									</div>
									<div>
										<div className="text-xs text-white/70 mb-1">
											Top For
										</div>
										<div className="text-sm font-medium text-white">
											{place.topInterests}
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</motion.div>

				<motion.div
					className="w-[500px] shrink-0 bg-gray-50 overflow-y-auto flex items-center justify-center p-8"
					initial={{ x: 100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{
						duration: motionConfig.transition.duration,
						ease: motionConfig.transition.ease,
						delay: 0.1,
					}}>
					<BookingPanel
						accentColor={accentColor}
						onSubmit={onSubmit}
						textColor={textColor}
					/>
				</motion.div>
			</div>
		</motion.div>
	)
}
