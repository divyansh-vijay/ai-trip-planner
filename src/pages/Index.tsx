import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Landing from "@/components/trip-planner/Landing"
import TripDetails from "@/components/trip-planner/TripDetails"
import Interests from "@/components/trip-planner/Interests"
import LoadingAgent from "@/components/trip-planner/LoadingAgent"

type Step = "landing" | "details" | "interests" | "loading" | "itinerary"

interface Destination {
	name: string
	country: string
	image: string
	bestTime: string
	avgBudget: string
	topFor: string[]
}

interface TripData {
	destination: Destination | null
	budget: string
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
		endDate: "",
		travelers: 2,
		interests: [],
	})

	const handleDestinationSelect = (destination: Destination) => {
		setTripData((prev) => ({ ...prev, destination }))
		setCurrentStep("details")
	}

	const handleDetailsSubmit = (
		data: Omit<TripData, "destination" | "interests">
	) => {
		setTripData((prev) => ({ ...prev, ...data }))
		setCurrentStep("interests")
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
		<div className="fixed inset-0 overflow-hidden bg-background">
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

				{currentStep === "details" && (
					<motion.div
						key="details"
						variants={pageVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.4, ease: "easeInOut" }}
						className="absolute inset-0">
						<TripDetails
							destination={tripData.destination!}
							onSubmit={handleDetailsSubmit}
							onBack={() => setCurrentStep("landing")}
						/>
					</motion.div>
				)}

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
