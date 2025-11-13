// import { useState } from "react";
// import { Calendar, DollarSign, Users, ArrowLeft, MapPin, Clock, TrendingUp } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// interface Destination {
//   name: string;
//   country: string;
//   image: string;
//   bestTime: string;
//   avgBudget: string;
//   topFor: string[];
// }

// interface TripDetailsProps {
//   destination: Destination;
//   onSubmit: (data: { budget: string; startDate: string; endDate: string; travelers: number }) => void;
//   onBack: () => void;
// }

// const TripDetails = ({ destination, onSubmit, onBack }: TripDetailsProps) => {
//   const [budget, setBudget] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [travelers, setTravelers] = useState(2);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (budget && startDate && endDate) {
//       onSubmit({ budget, startDate, endDate, travelers });
//     }
//   };

//   return (
//     <div className="h-full w-full flex bg-background">
//       {/* Left Side - Destination Info */}
//       <div className="w-1/2 relative overflow-hidden">
//         <img
//           src={destination.image}
//           alt={destination.name}
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

//         <div className="relative h-full flex flex-col justify-between p-12 text-white">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={onBack}
//             className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
//           >
//             <ArrowLeft className="h-5 w-5" />
//           </Button>

//           <div className="space-y-8">
//             <div>
//               <div className="flex items-center gap-2 mb-2 text-white/80">
//                 <MapPin className="h-5 w-5" />
//                 <span className="text-lg">{destination.country}</span>
//               </div>
//               <h1 className="text-6xl font-bold mb-6">{destination.name}</h1>
//             </div>

//             <div className="grid grid-cols-1 gap-6">
//               <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
//                 <div className="flex items-center gap-3 mb-2">
//                   <Clock className="h-5 w-5" />
//                   <h3 className="text-lg font-semibold">Best Time to Visit</h3>
//                 </div>
//                 <p className="text-white/90">{destination.bestTime}</p>
//               </div>

//               <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
//                 <div className="flex items-center gap-3 mb-2">
//                   <DollarSign className="h-5 w-5" />
//                   <h3 className="text-lg font-semibold">Average Budget</h3>
//                 </div>
//                 <p className="text-white/90">{destination.avgBudget}</p>
//               </div>

//               <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
//                 <div className="flex items-center gap-3 mb-3">
//                   <TrendingUp className="h-5 w-5" />
//                   <h3 className="text-lg font-semibold">Top For</h3>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {destination.topFor.map((item) => (
//                     <span
//                       key={item}
//                       className="px-3 py-1 bg-white/20 rounded-full text-sm"
//                     >
//                       {item}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Form */}
//       <div className="w-1/2 flex items-center justify-center p-12">
//         <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8 animate-fade-in">
//           <div className="text-center mb-8">
//             <h2 className="text-4xl font-bold text-foreground mb-3">Trip Details</h2>
//             <p className="text-muted-foreground">Tell us about your travel plans</p>
//           </div>

//           <div className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="budget" className="text-base font-medium">
//                 Budget (₹)
//               </Label>
//               <div className="relative">
//                 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//                 <Input
//                   id="budget"
//                   type="number"
//                   placeholder="Enter your budget"
//                   value={budget}
//                   onChange={(e) => setBudget(e.target.value)}
//                   className="pl-10 h-12"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="startDate" className="text-base font-medium">
//                   Start Date
//                 </Label>
//                 <Input
//                   id="startDate"
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   className="h-12"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="endDate" className="text-base font-medium">
//                   End Date
//                 </Label>
//                 <Input
//                   id="endDate"
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   className="h-12"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label className="text-base font-medium">Number of Travelers</Label>
//               <div className="flex items-center gap-4">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="icon"
//                   onClick={() => setTravelers(Math.max(1, travelers - 1))}
//                   className="h-12 w-12"
//                 >
//                   -
//                 </Button>
//                 <div className="flex-1 flex items-center justify-center gap-3 h-12 border rounded-md">
//                   <Users className="h-5 w-5 text-muted-foreground" />
//                   <span className="text-xl font-semibold">{travelers}</span>
//                 </div>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="icon"
//                   onClick={() => setTravelers(travelers + 1)}
//                   className="h-12 w-12"
//                 >
//                   +
//                 </Button>
//               </div>
//             </div>
//           </div>

//           <Button
//             type="submit"
//             size="lg"
//             className="w-full h-14 text-lg"
//           >
//             Continue to Interests
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TripDetails;

import { useState } from "react"
import type { BookingState } from "@/types/TripDetailsType"
import { INTERESTS, BUDGET_OPTIONS } from "@/types/tripConstants"
import { Calendar, DollarSign, Users, Check } from "lucide-react"

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
		budget: "",
		travelers: 2,
		interests: [],
	})

	const toggleInterest = (interest: string) => {
		setBooking((prev) => ({
			...prev,
			interests: prev.interests.includes(interest)
				? prev.interests.filter((i) => i !== interest)
				: [...prev.interests, interest],
		}))
	}

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
						<DollarSign className="w-4 h-4" />
						Budget Range
					</label>
					<div className="space-y-2">
						{BUDGET_OPTIONS.map((option) => (
							<button
								key={option.value}
								className={`w-full px-4 py-3 text-left rounded-lg border-2 transition-all ${
									booking.budget === option.value
										? "border-current shadow-sm"
										: "border-gray-200 hover:border-gray-300"
								}`}
								style={
									booking.budget === option.value
										? {
												borderColor: accentColor,
												backgroundColor: `${accentColor}10`,
										  }
										: {}
								}
								onClick={() =>
									setBooking((prev) => ({
										...prev,
										budget: option.value,
									}))
								}
								aria-pressed={booking.budget === option.value}>
								<div className="flex items-center justify-between">
									<div>
										<div className="font-medium text-gray-900 text-sm">
											{option.label}
										</div>
										<div className="text-xs text-gray-500">
											{option.range}
										</div>
									</div>
									{booking.budget === option.value && (
										<Check
											className="w-5 h-5"
											style={{ color: accentColor }}
										/>
									)}
								</div>
							</button>
						))}
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
						<span className="text-lg font-semibold text-gray-900 min-w-[3rem] text-center">
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
