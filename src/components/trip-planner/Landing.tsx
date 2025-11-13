import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin } from "lucide-react"

interface Destination {
	name: string
	nickname: string
	description: string
	best_time: string
	avg_budget: string
	top_for: string
	country: string
	image: string
}

const destinations: Destination[] = [
	{
		name: "Delhi",
		nickname: "Heart of India",
		country: "India",
		description:
			"History, street food, and iconic monuments in the nation’s capital.",
		best_time: "Oct – Mar",
		avg_budget: "₹3,000",
		top_for: "Heritage",
		image: "delhi.png",
	},
	{
		name: "Mumbai",
		nickname: "City of Dreams",
		country: "India",
		description:
			"Vibrant metropolis with beaches, Bollywood, nightlife, and iconic landmarks.",
		best_time: "Oct – Feb",
		avg_budget: "₹4,500",
		top_for: "Urban",
		image: "mumbai.png",
	},
	{
		name: "Kolkata",
		nickname: "Cultural Capital",
		country: "India",
		description:
			"A city of art, literature, colonial charm and legendary street food.",
		best_time: "Nov – Feb",
		avg_budget: "₹2,500",
		top_for: "Culture",
		image: "kolkata.png",
	},
	{
		name: "Chennai",
		nickname: "Gateway to South India",
		country: "India",
		description:
			"Coastal city famous for temples, classical music and South Indian cuisine.",
		best_time: "Nov – Feb",
		avg_budget: "₹2,800",
		top_for: "Culture",
		image: "chennai.png",
	},
	{
		name: "Bengaluru",
		nickname: "Garden City",
		country: "India",
		description:
			"Cool weather, parks, startup culture, cafes and nightlife.",
		best_time: "Sep – Feb",
		avg_budget: "₹3,200",
		top_for: "Urban",
		image: "bengaluru.png",
	},
	{
		name: "Hyderabad",
		nickname: "City of Pearls",
		country: "India",
		description:
			"A historic city famed for biryani, bazaars and grand monuments.",
		best_time: "Oct – Feb",
		avg_budget: "₹3,000",
		top_for: "Food",
		image: "hyderabad.png",
	},
	{
		name: "Pune",
		nickname: "Youth Hub",
		country: "India",
		description:
			"Lively college city with history, hill getaways and a relaxed vibe.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,800",
		top_for: "Culture",
		image: "pune.png",
	},
	{
		name: "Jaipur",
		nickname: "Pink City",
		country: "India",
		description: "Royal palaces, forts and vibrant Rajasthani culture.",
		best_time: "Nov – Feb",
		avg_budget: "₹2,800",
		top_for: "Heritage",
		image: "jaipur.png",
	},
	{
		name: "Ahmedabad",
		nickname: "Textile & Heritage Hub",
		country: "India",
		description:
			"UNESCO heritage, lively food scenes and historic architecture.",
		best_time: "Nov – Feb",
		avg_budget: "₹2,600",
		top_for: "Heritage",
		image: "ahmedabad.png",
	},
	{
		name: "Lucknow",
		nickname: "City of Nawabs",
		country: "India",
		description: "Elegant architecture, kebabs and rich Awadhi culture.",
		best_time: "Nov – Feb",
		avg_budget: "₹2,600",
		top_for: "Food",
		image: "lucknow.png",
	},
	{
		name: "Surat",
		nickname: "Diamond City",
		country: "India",
		description:
			"Fast-growing trade city known for textiles and coastal bites.",
		best_time: "Nov – Feb",
		avg_budget: "₹2,600",
		top_for: "Urban",
		image: "surat.png",
	},
	{
		name: "Kanpur",
		nickname: "Industrial Heart",
		country: "India",
		description:
			"An industrial city with historical sites and bustling markets.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,400",
		top_for: "Urban",
		image: "kanpur.png",
	},
	{
		name: "Nagpur",
		nickname: "Orange City",
		country: "India",
		description:
			"Central India's green spaces, temples and wildlife gateways.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,300",
		top_for: "Nature",
		image: "nagpur.png",
	},
	{
		name: "Indore",
		nickname: "Food Capital (MP)",
		country: "India",
		description:
			"Famous for street-food, clean streets and vibrant bazaars.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,200",
		top_for: "Food",
		image: "indore.png",
	},
	{
		name: "Bhopal",
		nickname: "City of Lakes",
		country: "India",
		description: "Calm lakes, historical palaces and green surroundings.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,400",
		top_for: "Nature",
		image: "bhopal.png",
	},
	{
		name: "Goa",
		nickname: "Beach Paradise",
		country: "India",
		description: "Golden beaches, lively nightlife and delicious seafood.",
		best_time: "Oct – Mar",
		avg_budget: "₹3,500",
		top_for: "Beaches",
		image: "goa.png",
	},
	{
		name: "Udaipur",
		nickname: "City of Lakes",
		country: "India",
		description: "Romantic palaces, calm lakes and sunset views.",
		best_time: "Oct – Mar",
		avg_budget: "₹3,000",
		top_for: "Romantic",
		image: "udaipur.png",
	},
	{
		name: "Jodhpur",
		nickname: "Blue City",
		country: "India",
		description: "Massive Mehrangarh Fort, blue houses and desert charm.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,800",
		top_for: "Heritage",
		image: "jodhpur.png",
	},
	{
		name: "Shimla",
		nickname: "Himalayan Retreat",
		country: "India",
		description: "Colonial charm, pine forests and scenic mountain walks.",
		best_time: "Mar – Jun, Sep – Nov",
		avg_budget: "₹3,000",
		top_for: "Mountains",
		image: "shimla.png",
	},
	{
		name: "Manali",
		nickname: "Adventure Base",
		country: "India",
		description:
			"Gateway for mountain treks, river sports and snow adventures.",
		best_time: "Mar – Jun, Dec – Feb",
		avg_budget: "₹3,000",
		top_for: "Adventure",
		image: "manali.png",
	},
	{
		name: "Nainital",
		nickname: "Lake Town",
		country: "India",
		description: "Scenic lake, hill views and relaxed hill-station charm.",
		best_time: "Mar – Jun, Sep – Nov",
		avg_budget: "₹2,800",
		top_for: "Nature",
		image: "nainital.png",
	},
	{
		name: "Mussoorie",
		nickname: "Queen of Hills",
		country: "India",
		description: "Rolling hills, colonial-era walks and dreamy viewpoints.",
		best_time: "Mar – Jun, Sep – Nov",
		avg_budget: "₹2,700",
		top_for: "Mountains",
		image: "mussoorie.png",
	},
	{
		name: "Rishikesh",
		nickname: "Yoga Capital",
		country: "India",
		description:
			"Spiritual banks of the Ganga, yoga retreats and white-water rafting.",
		best_time: "Sep – Nov, Feb – May",
		avg_budget: "₹2,500",
		top_for: "Spiritual",
		image: "rishikesh.png",
	},
	{
		name: "Haridwar",
		nickname: "Ganga Gateway",
		country: "India",
		description: "Ancient ghats, evening aartis and pilgrimage vibes.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,200",
		top_for: "Spiritual",
		image: "haridwar.png",
	},
	{
		name: "Darjeeling",
		nickname: "Tea Hills",
		country: "India",
		description:
			"Famous tea gardens, toy train rides and panoramic Himalayan views.",
		best_time: "Mar – May, Sep – Nov",
		avg_budget: "₹3,000",
		top_for: "Nature",
		image: "darjeeling.png",
	},
	{
		name: "Gangtok",
		nickname: "Sikkim Capital",
		country: "India",
		description:
			"Colorful mountain town with monasteries and alpine views.",
		best_time: "Mar – Jun, Sep – Nov",
		avg_budget: "₹3,200",
		top_for: "Mountains",
		image: "gangtok.png",
	},
	{
		name: "Coorg",
		nickname: "Coffee Countryside",
		country: "India",
		description: "Lush coffee estates, waterfalls and misty hills.",
		best_time: "Oct – Mar",
		avg_budget: "₹3,000",
		top_for: "Nature",
		image: "coorg.png",
	},
	{
		name: "Munnar",
		nickname: "Tea Garden Valley",
		country: "India",
		description: "Endless tea lawns, rolling hills and cool mountain air.",
		best_time: "Sep – Mar",
		avg_budget: "₹3,000",
		top_for: "Nature",
		image: "munnar.png",
	},
	{
		name: "Ooty",
		nickname: "Queen of Nilgiris",
		country: "India",
		description:
			"Botanical gardens, toy train rides and mild hill-climate.",
		best_time: "Oct – Jun",
		avg_budget: "₹2,900",
		top_for: "Nature",
		image: "ooty.png",
	},
	{
		name: "Kochi",
		nickname: "Gateway to Kerala",
		country: "India",
		description:
			"Historic port city with colonial forts, spice markets and backwaters nearby.",
		best_time: "Sep – Mar",
		avg_budget: "₹3,200",
		top_for: "Heritage",
		image: "kochi.png",
	},
	{
		name: "Varanasi",
		nickname: "Spiritual Heart",
		country: "India",
		description:
			"Ancient ghats, timeless rituals and powerful spiritual energy.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,500",
		top_for: "Spiritual",
		image: "varanasi.png",
	},
	{
		name: "Agra",
		nickname: "City of the Taj",
		country: "India",
		description: "Home of the Taj Mahal and Mughal-era masterpieces.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,700",
		top_for: "Heritage",
		image: "agra.png",
	},
	{
		name: "Amritsar",
		nickname: "Golden Sanctuary",
		country: "India",
		description:
			"Spiritual center highlighted by the shimmering Golden Temple.",
		best_time: "Nov – Feb",
		avg_budget: "₹2,500",
		top_for: "Spiritual",
		image: "amritsar.png",
	},
	{
		name: "Chandigarh",
		nickname: "Modern City",
		country: "India",
		description:
			"Well-planned city with gardens, lakes and modern architecture.",
		best_time: "Oct – Mar",
		avg_budget: "₹3,000",
		top_for: "Urban",
		image: "chandigarh.png",
	},
	{
		name: "Dehradun",
		nickname: "Hill Valley",
		country: "India",
		description:
			"Scenic valley town and gateway to nearby Himalayan escapes.",
		best_time: "Mar – Jun, Sep – Nov",
		avg_budget: "₹2,600",
		top_for: "Nature",
		image: "dehradun.png",
	},
	{
		name: "Jaisalmer",
		nickname: "Golden Fort City",
		country: "India",
		description: "Desert citadel with sand dunes, camel safaris and forts.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,800",
		top_for: "Adventure",
		image: "jaisalmer.png",
	},
	{
		name: "Kutch",
		nickname: "White Desert",
		country: "India",
		description:
			"Expansive Rann with seasonal salt marshes and tribal arts.",
		best_time: "Nov – Feb",
		avg_budget: "₹3,000",
		top_for: "Unique",
		image: "kutch.png",
	},
	{
		name: "Khajuraho",
		nickname: "Temple Sculptures",
		country: "India",
		description: "Famous for intricate UNESCO-listed temple carvings.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,600",
		top_for: "Heritage",
		image: "khajuraho.png",
	},
	{
		name: "Tirupati",
		nickname: "Pilgrim City",
		country: "India",
		description:
			"Major pilgrimage destination with the famed Tirumala temple.",
		best_time: "Sep – Feb",
		avg_budget: "₹2,300",
		top_for: "Spiritual",
		image: "tirupati.png",
	},
	{
		name: "Rameswaram",
		nickname: "Island Shrine",
		country: "India",
		description: "Sacred island town with sea temples and ocean vistas.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,400",
		top_for: "Spiritual",
		image: "rameswaram.png",
	},
	{
		name: "Kodaikanal",
		nickname: "Princess of Hill Stations",
		country: "India",
		description: "Misty hills, star-shaped lake and winding walks.",
		best_time: "Oct – Jun",
		avg_budget: "₹2,800",
		top_for: "Nature",
		image: "kodaikanal.png",
	},
	{
		name: "Lonavala",
		nickname: "Monsoon Getaway",
		country: "India",
		description: "Popular quick escape with waterfalls, trails and forts.",
		best_time: "Monsoon & Oct – Mar",
		avg_budget: "₹2,500",
		top_for: "Nature",
		image: "lonavala.png",
	},
	{
		name: "Mahabaleshwar",
		nickname: "Strawberry Hills",
		country: "India",
		description:
			"Hill station with viewpoints, strawberry farms and cool air.",
		best_time: "Oct – Jun",
		avg_budget: "₹2,700",
		top_for: "Romantic",
		image: "mahabaleshwar.png",
	},
	{
		name: "Puri",
		nickname: "Temple Coast",
		country: "India",
		description:
			"Sacred Jagannath temple, golden coast and pilgrimage culture.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,400",
		top_for: "Spiritual",
		image: "puri.png",
	},
	{
		name: "Mysuru",
		nickname: "Palace City",
		country: "India",
		description: "Grand palaces, silk bazaars and classical festivals.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,800",
		top_for: "Heritage",
		image: "mysuru.png",
	},
	{
		name: "Raipur",
		nickname: "Gateway to Chhattisgarh",
		country: "India",
		description:
			"Growing city with nearby tribal culture and nature spots.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,300",
		top_for: "Urban",
		image: "raipur.png",
	},
	{
		name: "Ranchi",
		nickname: "City of Waterfalls",
		country: "India",
		description:
			"Hilly terrain, waterfalls and tribal cultural experiences.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,300",
		top_for: "Nature",
		image: "ranchi.png",
	},
	{
		name: "Patna",
		nickname: "Ancient Patliputra",
		country: "India",
		description:
			"Historic river-city with archaeological sites and local flavors.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,200",
		top_for: "Heritage",
		image: "patna.png",
	},
	{
		name: "Guwahati",
		nickname: "Gateway to Northeast",
		country: "India",
		description: "Riverfront city with temples, markets and hill access.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,500",
		top_for: "Culture",
		image: "guwahati.png",
	},
	{
		name: "Shillong",
		nickname: "Scotland of the East",
		country: "India",
		description: "Lush hills, waterfalls and scenic viewpoints.",
		best_time: "Oct – Apr",
		avg_budget: "₹2,800",
		top_for: "Nature",
		image: "shillong.png",
	},
	{
		name: "Bhubaneswar",
		nickname: "Temple City",
		country: "India",
		description: "Ancient temples, rich Odia culture and nearby beaches.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,400",
		top_for: "Heritage",
		image: "bhubaneswar.png",
	},
	{
		name: "Madurai",
		nickname: "Temple Heritage",
		country: "India",
		description:
			"Historic Meenakshi temple and vibrant South Indian traditions.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,400",
		top_for: "Spiritual",
		image: "madurai.png",
	},
	{
		name: "Tiruchirappalli",
		nickname: "Rock Fort City",
		country: "India",
		description: "Ancient temples, rock-fort and rich Tamil heritage.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,300",
		top_for: "Heritage",
		image: "tiruchirappalli.png",
	},
	{
		name: "Hubballi",
		nickname: "Twin City Hub",
		country: "India",
		description:
			"Commercial center with nearby heritage and natural spots.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,200",
		top_for: "Urban",
		image: "hubballi.png",
	},
	{
		name: "Thane",
		nickname: "City of Lakes",
		country: "India",
		description: "Lakeside city adjacent to Mumbai with scenic pockets.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,800",
		top_for: "Nature",
		image: "thane.png",
	},
	{
		name: "Meerut",
		nickname: "Historic Plains",
		country: "India",
		description:
			"Historic Uttar Pradesh town with local markets and monuments.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,200",
		top_for: "Heritage",
		image: "meerut.png",
	},
	{
		name: "Allahabad",
		nickname: "Triveni Sangam",
		country: "India",
		description:
			"Confluence city hosting major religious gatherings and history.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,200",
		top_for: "Spiritual",
		image: "allahabad.png",
	},
	{
		name: "Nashik",
		nickname: "Wine & Pilgrimage",
		country: "India",
		description:
			"Religious sites, vineyards and pleasant hill surroundings.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,500",
		top_for: "Food",
		image: "nashik.png",
	},
	{
		name: "Aurangabad",
		nickname: "Gateway to Ajanta",
		country: "India",
		description:
			"Historic city near Ajanta & Ellora caves with rich heritage.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,600",
		top_for: "Heritage",
		image: "aurangabad.png",
	},
	{
		name: "Ajmer",
		nickname: "Sufi Sanctuary",
		country: "India",
		description:
			"Pilgrimage city known for the Ajmer Sharif dargah and nearby Pushkar.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,400",
		top_for: "Spiritual",
		image: "ajmer.png",
	},
	{
		name: "Jhansi",
		nickname: "Fortress Town",
		country: "India",
		description:
			"Historical fort city with tales of valor and nearby heritage sites.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,300",
		top_for: "Heritage",
		image: "jhansi.png",
	},
	{
		name: "Gwalior",
		nickname: "Fort City",
		country: "India",
		description: "Dramatic hill-top fort, palaces and musical heritage.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,400",
		top_for: "Heritage",
		image: "gwalior.png",
	},
	{
		name: "Srinagar",
		nickname: "Valley of Lakes",
		country: "India",
		description:
			"Iconic Dal Lake, houseboats and Mughal gardens in Kashmir.",
		best_time: "Apr – Oct",
		avg_budget: "₹3,500",
		top_for: "Nature",
		image: "srinagar.png",
	},
	{
		name: "Leh",
		nickname: "High-Altitude Marvel",
		country: "India",
		description:
			"Stark landscapes, monasteries and pristine high-altitude lakes.",
		best_time: "May – Sep",
		avg_budget: "₹3,500",
		top_for: "Adventure",
		image: "leh.png",
	},
	{
		name: "Amravati",
		nickname: "Maharashtra Town",
		country: "India",
		description:
			"Historic town in Maharashtra with temples and regional culture.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,200",
		top_for: "Culture",
		image: "amravati.png",
	},
	{
		name: "Vellore",
		nickname: "Temple & Fort Town",
		country: "India",
		description: "Historic fort city with temples and medical hubs.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,200",
		top_for: "Heritage",
		image: "vellore.png",
	},
	{
		name: "Salem",
		nickname: "Textile & Hills",
		country: "India",
		description: "Textile town near hills with temples and scenic spots.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,200",
		top_for: "Urban",
		image: "salem.png",
	},
	{
		name: "Kozhikode",
		nickname: "Calicut Coast",
		country: "India",
		description: "Coastal city with rich Malabar cuisine and beaches.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,600",
		top_for: "Food",
		image: "kozhikode.png",
	},
	{
		name: "Tirunelveli",
		nickname: "Historic South Town",
		country: "India",
		description: "Ancient temples, local culture and scenic river spots.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,200",
		top_for: "Culture",
		image: "tirunelveli.png",
	},
	{
		name: "Shirdi",
		nickname: "Pilgrim Hub",
		country: "India",
		description: "Famous pilgrimage site dedicated to Sai Baba.",
		best_time: "Oct – Feb",
		avg_budget: "₹2,200",
		top_for: "Spiritual",
		image: "shirdi.png",
	},
	{
		name: "Alwar",
		nickname: "Aravali Treasure",
		country: "India",
		description: "Historic forts, lakes and wildlife close to Delhi.",
		best_time: "Oct – Mar",
		avg_budget: "₹2,300",
		top_for: "Heritage",
		image: "alwar.png",
	},
]

interface LandingProps {
	onDestinationSelect: (destination: Destination) => void
}

const Landing = ({ onDestinationSelect }: LandingProps) => {
	const [searchTerm, setSearchTerm] = useState("")

	const col1Ref = useRef<HTMLDivElement>(null)
	const col2Ref = useRef<HTMLDivElement>(null)
	const col3Ref = useRef<HTMLDivElement>(null)
	const col4Ref = useRef<HTMLDivElement>(null)
	const col5Ref = useRef<HTMLDivElement>(null)

	const filteredDestinations = destinations

	// const filteredDestinations = destinations.filter(
	// 	(dest) =>
	// 		dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		dest.country.toLowerCase().includes(searchTerm.toLowerCase())
	// )

	// Split destinations into 3 columns
	const column1 = filteredDestinations.slice(0, 15)
	const column2 = filteredDestinations.slice(15, 30)
	const column3 = filteredDestinations.slice(30, 45)
	const column4 = filteredDestinations.slice(45, 60)
	const column5 = filteredDestinations.slice(60, 71)

	// Find which column has the searched destination
	const getSelectedDestinationOffset = (columnData: Destination[]) => {
		if (!searchTerm) return null

		const index = columnData.findIndex(
			(dest) =>
				dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				dest.country.toLowerCase().includes(searchTerm.toLowerCase())
		)

		if (index === -1) return null
		// let cardHeight = 0
		// console.log(window.innerWidth)
		// if (window.innerWidth < 640) cardHeight = 90 // mobile
		// else if (window.innerWidth < 1100) cardHeight = 140 // tablet
		// else if (window.innerWidth < 1600) cardHeight = 190 // tablet
		// else if (window.innerWidth < 2000) cardHeight = 220 // tablet
		// else if (window.innerWidth < 2200) cardHeight = 240 // tablet
		// else cardHeight = 210 // desktop

		// return -(index * cardHeight)
		return -(index * (window.innerWidth / 8))
		// Each card is approximately 230px (aspect-[3/2] ~150px + gap 24px + padding)
		// return -(index * 210)
	}

	const DestinationCard = ({ destination }: { destination: Destination }) => (
		<button
			onClick={() => onDestinationSelect(destination)}
			className={`group relative overflow-hidden cursor-pointer rounded-xl aspect-3/2 transition-all duration-300 hover:shadow-2xl shrink-0 w-full hover:border-4 border-amber-500 ${
				searchTerm.length > 0 &&
				destination.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
					? "border-4 border-amber-500"
					: searchTerm.length > 0 && "blur-[2px]"
			} `}>
			<img
				src={destination.image}
				alt={`${destination.name}, ${destination.country}`}
				className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-120 "
			/>
			<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
			<div className="absolute bottom-0 h-full flex flex-col justify-between left-0 right-0 p-5 text-white">
				<div className="flex items-center gap-2 mb-1">
					<MapPin className="h-4 w-4" />
					<span className="text-sm opacity-90">
						{destination.country}
					</span>
				</div>
				<h3 className="text-2xl font-bold">{destination.name}</h3>
			</div>
		</button>
	)

	return (
		<div className="h-full w-full flex flex-col items-center justify-center p-8 bg-linear-to-br from-background via-background to-sky-light/10 overflow-hidden">
			<div className="animate-fade-in">
				<div className="text-center h-[20vh] flex flex-col justify-center gap-6 mb-10">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-800">
						Where do you want to travel?
					</h1>
					{/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Choose from amazing destinations and start your
						adventure
					</p> */}
					<div className="backdrop-blur-xl bg-white/40 rounded-2xl shadow-2xl max-w-3xl w-full mx-auto border border-white/50 p-2 ">
						<div className="flex items-center gap-3 px-4">
							<Search className="w-6 h-6 text-gray-500" />
							<input
								type="text"
								placeholder="Search destinations..."
								value={searchTerm}
								onChange={(e) => {
									setSearchTerm(e.target.value)
								}}
								className="flex-1 bg-transparent border-none outline-none text-lg py-4 text-gray-800 placeholder-gray-500"
								aria-label="Search destinations"
								autoComplete="off"
							/>
						</div>
					</div>
				</div>

				{/* Scrolling Destinations Grid */}
				<div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4 h-[64vh]">
					{/* Column 1 - Scroll Up */}
					<div className="relative overflow-y-scroll scrollbar-hide">
						<motion.div
							className="flex flex-col gap-6 max-h-[200vh]"
							ref={col1Ref}
							animate={{
								y: getSelectedDestinationOffset(column1) ?? [
									0, -5800,
								],
							}}
							transition={{
								duration:
									getSelectedDestinationOffset(column1) !==
									null
										? 0.6
										: 60,
								repeat:
									getSelectedDestinationOffset(column1) !==
									null
										? 0
										: Infinity,
								ease:
									getSelectedDestinationOffset(column1) !==
									null
										? "easeInOut"
										: "linear",
							}}>
							{[...column1, ...column1].map(
								(destination, index) => (
									<DestinationCard
										key={`col1-${index}`}
										destination={destination}
									/>
								)
							)}
						</motion.div>
					</div>

					{/* Column 2 - Scroll Down */}
					<div className="relative overflow-y-scroll scrollbar-hide">
						<motion.div
							ref={col2Ref}
							className="flex flex-col gap-6 max-h-[200vh]"
							animate={{
								y: getSelectedDestinationOffset(column2) ?? [
									-5900, 0,
								],
							}}
							transition={{
								duration:
									getSelectedDestinationOffset(column2) !==
									null
										? 0.6
										: 60,
								repeat:
									getSelectedDestinationOffset(column2) !==
									null
										? 0
										: Infinity,
								ease:
									getSelectedDestinationOffset(column2) !==
									null
										? "easeInOut"
										: "linear",
							}}>
							{[...column2, ...column2].map(
								(destination, index) => (
									<DestinationCard
										key={`col2-${index}`}
										destination={destination}
									/>
								)
							)}
						</motion.div>
					</div>

					{/* Column 3 - Scroll Up */}
					<div className="relative overflow-y-scroll scrollbar-hide">
						<motion.div
							ref={col3Ref}
							className="flex flex-col gap-6 max-h-[200vh]"
							animate={{
								y: getSelectedDestinationOffset(column3) ?? [
									0, -5800,
								],
							}}
							transition={{
								duration:
									getSelectedDestinationOffset(column3) !==
									null
										? 0.6
										: 60,
								repeat:
									getSelectedDestinationOffset(column3) !==
									null
										? 0
										: Infinity,
								ease:
									getSelectedDestinationOffset(column3) !==
									null
										? "easeInOut"
										: "linear",
							}}>
							{[...column3, ...column3].map(
								(destination, index) => (
									<DestinationCard
										key={`col3-${index}`}
										destination={destination}
									/>
								)
							)}
						</motion.div>
					</div>

					{/* Column 4 - Scroll Down */}
					<div className="relative overflow-y-scroll scrollbar-hide lg:block md:hidden">
						<motion.div
							ref={col4Ref}
							className="flex flex-col gap-6 max-h-[200vh]"
							animate={{
								y: getSelectedDestinationOffset(column4) ?? [
									-5900, 0,
								],
							}}
							transition={{
								duration:
									getSelectedDestinationOffset(column4) !==
									null
										? 0.6
										: 60,
								repeat:
									getSelectedDestinationOffset(column4) !==
									null
										? 0
										: Infinity,
								ease:
									getSelectedDestinationOffset(column4) !==
									null
										? "easeInOut"
										: "linear",
							}}>
							{[...column4, ...column4].map(
								(destination, index) => (
									<DestinationCard
										key={`col4-${index}`}
										destination={destination}
									/>
								)
							)}
						</motion.div>
					</div>

					{/* Column 5 - Scroll Up */}
					<div className="relative overflow-y-scroll scrollbar-hide lg:block md:hidden">
						<motion.div
							ref={col5Ref}
							className="flex flex-col gap-6 max-h-[200vh]"
							animate={{
								y: getSelectedDestinationOffset(column5) ?? [
									0, -4200,
								],
							}}
							transition={{
								duration:
									getSelectedDestinationOffset(column5) !==
									null
										? 0.6
										: 50,
								repeat:
									getSelectedDestinationOffset(column5) !==
									null
										? 0
										: Infinity,
								ease:
									getSelectedDestinationOffset(column5) !==
									null
										? "easeInOut"
										: "linear",
							}}>
							{[...column5, ...column5].map(
								(destination, index) => (
									<DestinationCard
										key={`col5-${index}`}
										destination={destination}
									/>
								)
							)}
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Landing
