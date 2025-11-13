import { Plane, MapPin, Compass, Palmtree, Camera, Luggage } from "lucide-react"

const icons = [
	{ Icon: Plane, position: "top-20 left-10", delay: "0s" },
	{ Icon: MapPin, position: "top-40 right-20", delay: "1s" },
	{ Icon: Compass, position: "bottom-40 left-20", delay: "2s" },
	{ Icon: Palmtree, position: "top-60 right-40", delay: "0.5s" },
	{ Icon: Camera, position: "bottom-20 right-10", delay: "1.5s" },
	{ Icon: Luggage, position: "top-32 left-1/4", delay: "2.5s" },
]

export function FloatingIcons() {
	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
			{icons.map(({ Icon, position, delay }, index) => (
				<div
					key={index}
					className={`absolute ${position} animate-float`}
					style={{ animationDelay: delay }}>
					<Icon className="w-8 h-8 text-blue-400" />
				</div>
			))}
		</div>
	)
}
