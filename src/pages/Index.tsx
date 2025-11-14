import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Landing from "@/components/trip-planner/Landing"
import Interests from "@/components/trip-planner/Interests"
import LoadingAgent from "@/components/trip-planner/LoadingAgent"
import { FloatingIcons } from "@/components/FloatingIcons"
import { CityView } from "@/components/CityView"

type Step = "landing" | "details" | "interests" | "loading" | "itinerary"

interface Destination {
	name: string
	country: string
	image: string
	description: string
	nickname: string
	best_time: string
	avg_budget: string
	top_for: string
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

const Index = () => {
	const [currentStep, setCurrentStep] = useState<Step>("landing")
	const [tripData, setTripData] = useState<TripData>({
		destination: null,
		budget: "",
		startDate: "",
		description: "",
		endDate: "",
		travelers: 2,
		interests: [],
	})

	const handleDestinationSelect = (destination: Destination) => {
		setTripData((prev) => ({ ...prev, destination }))
		setCurrentStep("details")
	}

	const handleInterestsSubmit = (interests: string[]) => {
		setTripData((prev) => ({ ...prev, interests }))
		setCurrentStep("loading")
	}

	const pageVariants = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 1.05 },
	}

	return (
		<div className="fixed inset-0 overflow-hidden">
			<FloatingIcons />
			<AnimatePresence mode="wait">
				{currentStep === "landing" && (
					<motion.div
						key="landing"
						variants={pageVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.4, ease: "easeInOut" }}
						className="absolute inset-0">
						<Landing
							onDestinationSelect={handleDestinationSelect}
						/>
					</motion.div>
				)}
				{currentStep === "details" && tripData.destination && (
					<motion.div
						key="details"
						variants={pageVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.4, ease: "easeInOut" }}
						className="absolute inset-0">
						<CityView
							place={{
								id: tripData.destination.name,
								name: tripData.destination.name,
								country: tripData.destination.country,
								image: tripData.destination.image,
								tag: "Featured",
								description: tripData.destination.description,
								popularMonths:
									tripData.destination.best_time.split("– "),
								avgBudget: tripData.destination.avg_budget,
								topInterests: tripData.destination.top_for,
							}}
							onBack={() => setCurrentStep("landing")}
							onSubmit={() => setCurrentStep("interests")}
						/>
					</motion.div>
				)}{" "}
				{currentStep === "interests" && (
					<motion.div
						key="interests"
						variants={pageVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.4, ease: "easeInOut" }}
						className="absolute inset-0">
						<Interests
							onSubmit={handleInterestsSubmit}
							onBack={() => setCurrentStep("details")}
						/>
					</motion.div>
				)}
				{currentStep === "loading" && (
					<motion.div
						key="loading"
						variants={pageVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.4, ease: "easeInOut" }}
						className="absolute inset-0">
						<LoadingAgent tripData={tripData} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default Index
