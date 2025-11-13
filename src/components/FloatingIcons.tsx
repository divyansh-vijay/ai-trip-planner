import { Plane, MapPin, Compass, Palmtree, Camera, Luggage, Globe, Ship, Binoculars, Tent, Mountain, Sun } from "lucide-react"

const icons = [
	{ Icon: Plane, position: "top-20 left-10", delay: "0s" },
	{ Icon: MapPin, position: "top-40 right-20", delay: "1s" },
	{ Icon: Compass, position: "bottom-40 left-20", delay: "2s" },
	{ Icon: Palmtree, position: "top-60 right-40", delay: "0.5s" },
	{ Icon: Camera, position: "bottom-20 right-10", delay: "1.5s" },
	{ Icon: Luggage, position: "top-32 left-1/4", delay: "2.5s" },

	// New ones
	{ Icon: Globe, position: "top-10 right-1/3", delay: "0.8s" },
	{ Icon: Ship, position: "bottom-32 right-1/4", delay: "1.2s" },
	{ Icon: Binoculars, position: "top-48 left-16", delay: "2.2s" },
	{ Icon: Tent, position: "bottom-48 left-1/3", delay: "1.8s" },
	{ Icon: Mountain, position: "top-72 right-12", delay: "0.3s" },
	{ Icon: Sun, position: "bottom-10 left-1/5", delay: "2.8s" },
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
