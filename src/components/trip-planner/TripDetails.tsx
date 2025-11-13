import { useState } from "react"
import type { BookingState } from "@/types/TripDetailsType"
import { Calendar, Users, IndianRupee } from "lucide-react"
import { Input } from "../ui/input"

interface BookingPanelProps {
	accentColor: string
	onSubmit: () => void
	textColor: string
}

export const BookingPanel = ({
	accentColor,
	onSubmit,
	textColor,
}: BookingPanelProps) => {
	const [booking, setBooking] = useState<BookingState>({
		dates: { start: null, end: null },
		budget: "2000",
		travelers: 2,
		interests: [],
	})

	return (
		<div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
			<h2 className="text-2xl font-bold text-gray-900 mb-6">
				Plan Your Trip
			</h2>

			<div className="space-y-6">
				<div>
					<label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
						<Calendar className="w-4 h-4" />
						Travel Dates
					</label>
					<div className="grid grid-cols-2 gap-3">
						<input
							type="date"
							className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
							style={
								{
									"--tw-ring-color": accentColor,
								} as React.CSSProperties
							}
							onChange={(e) =>
								setBooking((prev) => ({
									...prev,
									dates: {
										...prev.dates,
										start: new Date(e.target.value),
									},
								}))
							}
							aria-label="Start date"
						/>
						<input
							type="date"
							className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
							style={
								{
									"--tw-ring-color": accentColor,
								} as React.CSSProperties
							}
							onChange={(e) =>
								setBooking((prev) => ({
									...prev,
									dates: {
										...prev.dates,
										end: new Date(e.target.value),
									},
								}))
							}
							aria-label="End date"
						/>
					</div>
				</div>

				<div>
					<label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
						<IndianRupee className="w-4 h-4" />
						Budget Range
					</label>
					<div className="space-y-2">
						<Input
							type="range"
							min={1000}
							max={100000}
							value={booking.budget}
							step={1}
							onChange={(e) =>
								setBooking((prev) => ({
									...prev,
									budget: e.target.value,
								}))
							}
							aria-label="Budget range"
						/>
						<div className="flex justify-end items-center">
							<IndianRupee className="w-4 h-4" />
							<Input
								min={1000}
								max={100000}
								type="number"
								className="text-xl w-[120px] outline-hidden border-0 "
								value={booking.budget}
								onChange={(e) => {
									setBooking((prev) => ({
										...prev,
										budget: e.target.value,
									}))
								}}></Input>
						</div>
					</div>
				</div>

				<div>
					<label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
						<Users className="w-4 h-4" />
						Number of Travelers
					</label>
					<div className="flex items-center gap-4">
						<button
							className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center font-medium text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							onClick={() =>
								setBooking((prev) => ({
									...prev,
									travelers: Math.max(1, prev.travelers - 1),
								}))
							}
							disabled={booking.travelers <= 1}
							aria-label="Decrease travelers">
							−
						</button>
						<span className="text-lg font-semibold text-gray-900 min-w-12 text-center">
							{booking.travelers}
						</span>
						<button
							className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center font-medium text-gray-700 transition-colors"
							onClick={() =>
								setBooking((prev) => ({
									...prev,
									travelers: prev.travelers + 1,
								}))
							}
							aria-label="Increase travelers">
							+
						</button>
					</div>
				</div>

				{/* <div>
					<label className="text-sm font-medium text-gray-700 mb-3 block">
						Interests & Activities
					</label>
					<div className="flex flex-wrap gap-2">
						{INTERESTS.map((interest) => {
							const isSelected =
								booking.interests.includes(interest)
							return (
								<button
									key={interest}
									className="px-3 py-1.5 text-xs font-medium rounded-full border-2 transition-all"
									style={
										isSelected
											? {
													borderColor: accentColor,
													backgroundColor:
														accentColor,
													color: textColor,
											  }
											: {
													borderColor: "#E5E7EB",
													backgroundColor: "white",
													color: "#374151",
											  }
									}
									onClick={() => toggleInterest(interest)}
									aria-pressed={isSelected}>
									{interest}
								</button>
							)
						})}
					</div>
				</div> */}

				<button
					className="w-full py-4 rounded-xl font-semibold text-base transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
					style={{ backgroundColor: accentColor, color: textColor }}
					onClick={onSubmit}
					aria-label="Get AI recommendations">
					Get AI Recommendations
				</button>
			</div>
		</div>
	)
}
