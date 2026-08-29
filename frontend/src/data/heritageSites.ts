export interface HeritageSite {
  id: string;
  slug: string;
  name: string;
  location: string;
  state: string;
  country: string;
  coordinates: { lat: number; lng: number };
  historicalPeriod: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  culturalSignificance: string;
  architectureStyle: string;
  preservationStatus: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
  visitorCount: number;
  rating: number;
  featured: boolean;
  images: string[];
  timeline: TimelineEvent[];
  facts: string[];
  virtualTour: { available: boolean; scenes: number };
  model3D: { available: boolean; format: string };
  distance: number | null;
  tags: string[];
  openingHours?: string;
  entryFee?: string;
  bestTimeToVisit?: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

export const heritageSites: HeritageSite[] = [
  {
    id: '1',
    slug: 'taj-mahal',
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    state: 'Uttar Pradesh',
    country: 'India',
    coordinates: { lat: 27.1751, lng: 78.0421 },
    historicalPeriod: 'Mughal Empire (1632–1653)',
    category: 'Monument',
    shortDescription: 'A white marble mausoleum built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, considered the jewel of Mughal architecture.',
    fullDescription: `The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal, who died in Agra while giving birth to their 14th child. The tomb is the centrepiece of a 17-hectare complex, which includes a mosque and a guest house and is set in formal gardens bounded on three sides by a crenellated wall.

Construction of the mausoleum was essentially completed in 1643, but work continued on other phases of the project for another 10 years. The Taj Mahal complex is believed to have been completed in its entirety in 1653 at a cost estimated at the time to be around 32 million rupees.

The construction project employed some 20,000 artisans under the guidance of a board of architects led by the court architect to the emperor, Ustad Ahmad Lahori. The Taj Mahal was designated as a UNESCO World Heritage Site in 1983 for being "the jewel of Muslim art in India and one of the universally admired masterpieces of the world's heritage."`,
    culturalSignificance: 'UNESCO World Heritage Site (1983). Considered the jewel of Muslim art in India and one of the universally admired masterpieces of the world\'s heritage. Symbol of eternal love.',
    architectureStyle: 'Mughal Architecture — Indo-Islamic composite style with Persian, Ottoman Turkish, and Indian elements',
    preservationStatus: 'Good',
    visitorCount: 8000000,
    rating: 4.9,
    featured: true,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/1200px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg'
    ],
    timeline: [
      { year: 1631, title: 'Death of Mumtaz Mahal', description: 'Shah Jahan\'s beloved wife Mumtaz Mahal dies during childbirth. A grief-stricken emperor vows to build the world\'s most beautiful mausoleum.' },
      { year: 1632, title: 'Construction Begins', description: 'Over 20,000 workers and 1,000 elephants begin construction. Marble is transported from Makrana, Rajasthan, 200 miles away.' },
      { year: 1643, title: 'Main Structure Complete', description: 'The main mausoleum is completed after 11 years of construction. The central dome rises 73 meters above the base.' },
      { year: 1648, title: 'Gardens Completed', description: 'The formal charbagh garden with its reflecting pool is completed, perfectly framing the monument.' },
      { year: 1653, title: 'Complex Fully Completed', description: 'The entire complex including the mosque, guest house, and outer courtyard walls are finished.' },
      { year: 1858, title: 'British India Period', description: 'During British rule, parts of the complex gardens were changed. Lime juice whitening was abandoned.' },
      { year: 1983, title: 'UNESCO World Heritage', description: 'The Taj Mahal is designated as a UNESCO World Heritage Site, recognized as one of the world\'s greatest architectural achievements.' }
    ],
    facts: [
      'The four minarets are slightly tilted outward by 12 degrees to protect the main tomb from falling on it in case of an earthquake.',
      'The white marble changes color throughout the day — pink at dawn, dazzling white in daylight, golden at sunset, and silvery at night under moonlight.',
      'It took 22 years and approximately 20,000 artisans, painters, embroidery artists, and stonecutters to build.',
      'The calligraphy inscriptions on the Taj Mahal were made using jasper inlaid in white marble panels.',
      'The garden represents the Quranic paradise — four rivers of water, milk, wine, and honey divide the garden into four sections.'
    ],
    virtualTour: { available: true, scenes: 5 },
    model3D: { available: true, format: 'glb' },
    distance: null,
    tags: ['UNESCO', 'Mughal', 'Monument', 'Love Story', 'Marble', 'Agra'],
    openingHours: 'Sunrise to Sunset (Closed on Fridays)',
    entryFee: '₹250 (Indians), $15 (Foreigners)',
    bestTimeToVisit: 'October to March'
  },
  {
    id: '2',
    slug: 'red-fort',
    name: 'Red Fort',
    location: 'Old Delhi, Delhi',
    state: 'Delhi',
    country: 'India',
    coordinates: { lat: 28.6562, lng: 77.2410 },
    historicalPeriod: 'Mughal Empire (1638–1648)',
    category: 'Fort',
    shortDescription: 'A magnificent red sandstone fortress that served as the main residence of Mughal Emperors for nearly 200 years and is the site of India\'s Independence Day celebrations.',
    fullDescription: `The Red Fort is a historic fort in the city of Delhi that served as the main residence of the Mughal Emperors. Emperor Shah Jahan commissioned construction of the Red Fort on 12 May 1638, when he decided to shift his capital from Agra to Delhi. Originally known as "Qila-i-Mubarak" (the blessed fort), the Red Fort was designed to be the palace fort of Shahjahanabad — the seventh city of Delhi.

The fort complex encloses several palatial buildings along the banks of the Yamuna river, connected through canals referred to as "Nahr-i-Bihisht" (Stream of Paradise). The Fort's boundary walls extend 2.41 km with a moat 9.14 m wide surrounding the complex.

Every year on Independence Day (15 August), the Prime Minister of India hoists the national flag at its main gate — the Lahori Gate — and addresses the nation. The Red Fort was declared a UNESCO World Heritage Site in 2007.`,
    culturalSignificance: 'UNESCO World Heritage Site (2007). Seat of Mughal power for 200 years. India\'s Independence Day celebrations held here annually since 1947. Symbol of India\'s sovereignty.',
    architectureStyle: 'Mughal Architecture — blend of Persian, European, and Indian architectural styles',
    preservationStatus: 'Good',
    visitorCount: 3500000,
    rating: 4.7,
    featured: true,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Red_Fort_in_Delhi_03.jpg/1200px-Red_Fort_in_Delhi_03.jpg'
    ],
    timeline: [
      { year: 1638, title: 'Construction Begins', description: 'Emperor Shah Jahan commissions the fort as his new capital\'s palace after moving from Agra.' },
      { year: 1648, title: 'Fort Completed', description: 'Construction is completed. The fort cost 10 million rupees (equivalent to about $917 million today).' },
      { year: 1739, title: 'Nadir Shah\'s Invasion', description: 'Persian emperor Nadir Shah sacks the fort and takes the Peacock Throne and Koh-i-Noor diamond.' },
      { year: 1857, title: 'Last Mughal Emperor', description: 'Bahadur Shah Zafar II, the last Mughal emperor, is tried here after the 1857 uprising.' },
      { year: 1947, title: 'Independence Day', description: 'India\'s first Prime Minister Jawaharlal Nehru hoists the national flag on Independence Day, a tradition that continues.' },
      { year: 2007, title: 'UNESCO Heritage', description: 'Declared a UNESCO World Heritage Site.' }
    ],
    facts: [
      'The Red Fort was originally white plastered — the red sandstone facade was added by the British who whitewashed many areas.',
      'The Koh-i-Noor diamond was kept in the fort until Nadir Shah\'s invasion in 1739.',
      'The octagonal Saman Burj tower was Shah Jahan\'s favorite place to meet common people.',
      'Inside the fort is a beautiful mosque, the Moti Masjid (Pearl Mosque), built by Emperor Aurangzeb in 1659.'
    ],
    virtualTour: { available: true, scenes: 4 },
    model3D: { available: true, format: 'glb' },
    distance: null,
    tags: ['UNESCO', 'Mughal', 'Fort', 'Delhi', 'Independence Day'],
    openingHours: '9:30 AM – 4:30 PM (Closed on Mondays)',
    entryFee: '₹35 (Indians), ₹550 (Foreigners)',
    bestTimeToVisit: 'October to March'
  },
  {
    id: '3',
    slug: 'hampi',
    name: 'Hampi',
    location: 'Vijayanagara, Karnataka',
    state: 'Karnataka',
    country: 'India',
    coordinates: { lat: 15.3350, lng: 76.4600 },
    historicalPeriod: 'Vijayanagara Empire (14th–16th century)',
    category: 'Archaeological Site',
    shortDescription: 'The ruined city of the Vijayanagara Empire, featuring an extraordinary collection of temples, monuments, and royal structures spread across a boulder-strewn landscape.',
    fullDescription: `Hampi is an ancient village in the Vijayanagara district of Karnataka. It was the capital of the Vijayanagara Empire in the 14th century. It is now a UNESCO World Heritage Site listed as the "Group of Monuments at Hampi."

Hampi was among the wealthiest and largest cities in the world during its peak in the 15th and 16th centuries, with a population of half a million people. The city of Hampi was one of the last great Hindu kingdoms in India. It fell to the Deccan Sultanates in the Battle of Talikota in 1565. The alliance of Deccan Muslim Sultanates defeated the Vijayanagara Empire and the city was sacked and abandoned.

Today the ruins of Hampi cover an area of about 4,100 hectares containing over 1,600 archaeological remains. The ruins include forts, riverside features, royal and sacred complexes, temples, shrines, pillared halls, mandapas, memorial structures, water structures, and other endowments.`,
    culturalSignificance: 'UNESCO World Heritage Site (1986). Once the wealthiest city in the world, representing the height of South Indian medieval civilization and Vijayanagara architectural excellence.',
    architectureStyle: 'Vijayanagara Architecture — Dravidian style with distinctive features of intricate stone carvings and towering gopurams',
    preservationStatus: 'Fair',
    visitorCount: 400000,
    rating: 4.8,
    featured: true,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Virupaksha_Temple_Hampi_1.jpg/1200px-Virupaksha_Temple_Hampi_1.jpg'
    ],
    timeline: [
      { year: 1336, title: 'Vijayanagara Founded', description: 'Harihara I and Bukka Raya I found the Vijayanagara Empire with Hampi as its capital.' },
      { year: 1400, title: 'Golden Age Begins', description: 'Hampi becomes one of the wealthiest and most populous cities in the world with over 500,000 inhabitants.' },
      { year: 1509, title: 'Krishna Deva Raya', description: 'The greatest emperor Krishna Deva Raya ascends the throne, beginning Hampi\'s most glorious era.' },
      { year: 1565, title: 'Battle of Talikota', description: 'The Deccan Sultanates defeat the empire. Hampi is sacked, burned, and abandoned over several months.' },
      { year: 1800, title: 'Rediscovery', description: 'British surveyor Colin Mackenzie rediscovers the ruins and begins systematic documentation.' },
      { year: 1986, title: 'UNESCO Heritage', description: 'Hampi is declared a UNESCO World Heritage Site as "Group of Monuments at Hampi."' }
    ],
    facts: [
      'At its peak, Hampi was the second largest city in the world after Beijing, with a population of over 500,000.',
      'The stone chariot at the Vittala Temple is depicted on the old Indian 50-paisa coin.',
      'The musical pillars in the Vittala Temple produce different musical notes when struck.',
      'Over 1,600 monuments are spread across the 26 sq km ruins area.'
    ],
    virtualTour: { available: true, scenes: 6 },
    model3D: { available: true, format: 'glb' },
    distance: null,
    tags: ['UNESCO', 'Vijayanagara', 'Temple', 'Ruins', 'Karnataka'],
    openingHours: '24 hours (Main temples have separate hours)',
    entryFee: '₹40 (Indians), ₹600 (Foreigners)',
    bestTimeToVisit: 'November to February'
  },
  {
    id: '4',
    slug: 'mahabalipuram',
    name: 'Mahabalipuram',
    location: 'Mahabalipuram, Tamil Nadu',
    state: 'Tamil Nadu',
    country: 'India',
    coordinates: { lat: 12.6172, lng: 80.1990 },
    historicalPeriod: 'Pallava Dynasty (7th–8th century CE)',
    category: 'Temples',
    shortDescription: 'A stunning collection of Pallava rock-cut temples and sculptures on the Coromandel Coast, including the famous Shore Temple and Arjuna\'s Penance bas-relief.',
    fullDescription: `Mahabalipuram (also known as Mamallapuram) is a town in Kancheepuram district in Tamil Nadu. This coastal heritage town is famous for its Group of Monuments, a UNESCO World Heritage Site since 1984.

The coastal site contains rock relief sculptures, structural temples, and cave temples built during the Pallava dynasty's reign in the 7th and 8th centuries CE. King Narasimhavarman I (also known as Mamalla, meaning "great wrestler") is credited with most of the construction here, which explains the town's alternate name.

The site includes the massive bas-relief "Descent of the Ganges" (also called Arjuna's Penance), which is one of the largest open-air rock reliefs in the world at 27 meters wide and 9 meters tall. The Five Rathas (five monolithic rock-cut temples) and the Shore Temple, which has survived 1,300 years of sea erosion, are among India's most remarkable architectural achievements.`,
    culturalSignificance: 'UNESCO World Heritage Site (1984). Masterpiece of Pallava architecture representing the transition from rock-cut to structural temples. Significant for Hindu religious art.',
    architectureStyle: 'Pallava Architecture — early Dravidian style, transitional period from rock-cut to structural temples',
    preservationStatus: 'Good',
    visitorCount: 1200000,
    rating: 4.6,
    featured: false,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Shore_temple_wiki.jpg/1200px-Shore_temple_wiki.jpg'
    ],
    timeline: [
      { year: 600, title: 'Pallava Dynasty', description: 'The Pallava dynasty establishes its capital at Kanchipuram, beginning construction at Mahabalipuram.' },
      { year: 630, title: 'Narasimhavarman I', description: 'King Mamalla begins the major construction phase, creating the rock-cut caves and Five Rathas.' },
      { year: 700, title: 'Shore Temple', description: 'The iconic Shore Temple is constructed, one of the earliest free-standing stone temples in South India.' },
      { year: 1984, title: 'UNESCO Heritage', description: 'Mahabalipuram is declared a UNESCO World Heritage Site.' },
      { year: 2004, title: 'Tsunami Revelation', description: 'The 2004 Indian Ocean tsunami briefly uncovered ancient submerged structures, revealing an older settlement beneath the sea.' }
    ],
    facts: [
      'The Shore Temple has survived over 1,300 years of sea erosion and is one of the oldest structural stone temples in South India.',
      'Arjuna\'s Penance is the world\'s largest bas-relief — 27m x 9m — carved on two massive boulders.',
      'The 2004 tsunami briefly revealed ancient stone structures that were submerged 1,500 years ago.',
      'The Five Rathas are carved from single pieces of granite — no construction, no joinery — just pure sculpture.'
    ],
    virtualTour: { available: true, scenes: 4 },
    model3D: { available: false, format: 'none' },
    distance: null,
    tags: ['UNESCO', 'Pallava', 'Temple', 'Coastal', 'Tamil Nadu'],
    openingHours: '6:00 AM – 6:00 PM',
    entryFee: '₹40 (Indians), ₹600 (Foreigners)',
    bestTimeToVisit: 'November to February'
  },
  {
    id: '5',
    slug: 'brihadeeswarar-temple',
    name: 'Brihadeeswarar Temple',
    location: 'Thanjavur, Tamil Nadu',
    state: 'Tamil Nadu',
    country: 'India',
    coordinates: { lat: 10.7828, lng: 79.1318 },
    historicalPeriod: 'Chola Dynasty (1003–1010 CE)',
    category: 'Temple',
    shortDescription: 'The "Big Temple" of Thanjavur, built by the great Chola emperor Raja Raja I, is the finest example of Dravidian architecture with its massive 66-meter vimana that casts no shadow at noon.',
    fullDescription: `The Brihadeeswarar Temple at Thanjavur is a Hindu temple dedicated to Shiva. It is one of the largest temples in India and is an example of Dravidian architecture built during the Chola period. Built by Raja Raja Chola I and completed in 1010 AD, it was called as Dakshina Meru.

The temple stands amidst fortified walls that were probably built in the 16th century. The vimana (the tower above the inner sanctuary) is 66 metres (216 ft) tall, and is one of the tallest in the world. The Kumbam (the apex or the bulbous structure on the top) of the temple is single stone that weighs around 80 tonnes. There is a big Nandi (sacred bull) statue at the entrance of the temple, carved from a single rock, and is about 2 metres high and 6 metres long.

The temple is part of the UNESCO World Heritage Site "Great Living Chola Temples" along with the Gangaikonda Cholapuram and Airavatesvara Temple.`,
    culturalSignificance: 'UNESCO World Heritage Site (1987) as part of "Great Living Chola Temples." A UNESCO-recognized active place of worship for over 1,000 years. Masterpiece of Tamil architecture.',
    architectureStyle: 'Dravidian Architecture — Chola style at its zenith, featuring the classic vimana and gopuram design',
    preservationStatus: 'Excellent',
    visitorCount: 2000000,
    rating: 4.8,
    featured: true,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Brihadeeswara_Temple_Thanjavur.jpg/1200px-Brihadeeswara_Temple_Thanjavur.jpg'
    ],
    timeline: [
      { year: 985, title: 'Raja Raja I Ascends', description: 'Raja Raja Chola I becomes king and begins a campaign to establish Chola supremacy across South India.' },
      { year: 1003, title: 'Construction Begins', description: 'Raja Raja I commissions the great temple, mobilizing the finest artisans from across the Chola empire.' },
      { year: 1010, title: 'Temple Completed', description: 'The Brihadeeswarar Temple is completed and consecrated. Raja Raja I makes extensive gifts to the temple.' },
      { year: 1987, title: 'UNESCO Recognition', description: 'Included in UNESCO World Heritage Sites as part of "Great Living Chola Temples."' },
      { year: 2010, title: 'Millennium Celebrations', description: '1,000-year anniversary celebrations held with elaborate rituals and cultural programs.' }
    ],
    facts: [
      'The 80-tonne capstone was carried up a 6km-long inclined ramp — without modern machinery.',
      'The shadow of the main tower (vimana) does not fall on the ground at noon — an architectural marvel.',
      'The temple has been an active place of worship for over 1,000 years continuously.',
      'The Nandi statue at the entrance is carved from a single piece of rock weighing 25 tonnes.'
    ],
    virtualTour: { available: true, scenes: 4 },
    model3D: { available: true, format: 'glb' },
    distance: null,
    tags: ['UNESCO', 'Chola', 'Temple', 'Dravidian', 'Tamil Nadu', 'Living Heritage'],
    openingHours: '6:00 AM – 8:30 PM',
    entryFee: 'Free',
    bestTimeToVisit: 'November to February'
  },
  {
    id: '6',
    slug: 'konark-sun-temple',
    name: 'Konark Sun Temple',
    location: 'Konark, Odisha',
    state: 'Odisha',
    country: 'India',
    coordinates: { lat: 19.8876, lng: 86.0945 },
    historicalPeriod: 'Eastern Ganga Dynasty (13th century CE)',
    category: 'Temple',
    shortDescription: 'A 13th-century Sun temple built as a colossal chariot of the Sun God with 24 intricately carved stone wheels and seven horses, representing the journey of time.',
    fullDescription: `The Sun Temple at Konark is a 13th-century Hindu temple dedicated to the Sun God Surya. Located near the city of Puri in Odisha, it was built in 1250 CE by King Narasimhadeva I of the Eastern Ganga Dynasty. 

The temple is designed in the shape of a colossal chariot of the Sun God, with elaborately carved stone wheels, pillars, and walls. The 24 wheels of the temple chariot represent the 24 hours of the day, and the 8 spokes in each wheel indicate the 8 praharas (time divisions of 3 hours each). Seven horses pull the chariot, representing the seven days of the week.

The temple is also known as the Black Pagoda by early European sailors, who used it as a landmark for navigation. Its counterpart — the Jagannath Temple in Puri — was called the White Pagoda. The Konark Sun Temple is a UNESCO World Heritage Site and one of the most magnificent examples of Kalinga architecture.`,
    culturalSignificance: 'UNESCO World Heritage Site (1984). One of the finest examples of Kalinga architecture and an important pilgrimage site. Featured on the Indian 10-rupee note.',
    architectureStyle: 'Kalinga Architecture — Odisha style of Nagara architecture with distinctive curvilinear tower and elaborate sculptural programs',
    preservationStatus: 'Fair',
    visitorCount: 1500000,
    rating: 4.7,
    featured: false,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Konarka_Temple.jpg/1200px-Konarka_Temple.jpg'
    ],
    timeline: [
      { year: 1238, title: 'King Narasimhadeva I', description: 'The Eastern Ganga king begins a 12-year construction project to build a temple to the Sun God.' },
      { year: 1250, title: 'Temple Completed', description: 'The Konark Sun Temple is completed. It stands 57 meters tall (the main tower).' },
      { year: 1568, title: 'Muslim Invasion', description: 'Kalapahad\'s forces damage the temple. The main tower eventually collapses sometime after this.' },
      { year: 1904, title: 'ASI Conservation', description: 'The Archaeological Survey of India begins systematic conservation of the remaining structure.' },
      { year: 1984, title: 'UNESCO Heritage', description: 'Designated a UNESCO World Heritage Site.' }
    ],
    facts: [
      'The 24 wheels of the temple chariot are sundials — each spoke divides time into periods of 1.5 hours.',
      'The temple was used as a navigation landmark by European sailors who called it the "Black Pagoda."',
      'The main sanctuary tower (deul) no longer exists — only the audience hall (jagamohana) remains.',
      'It appears on the Indian 10-rupee currency note.'
    ],
    virtualTour: { available: true, scenes: 3 },
    model3D: { available: false, format: 'none' },
    distance: null,
    tags: ['UNESCO', 'Sun Temple', 'Kalinga', 'Odisha', 'Chariot'],
    openingHours: '6:00 AM – 8:00 PM',
    entryFee: '₹40 (Indians), ₹600 (Foreigners)',
    bestTimeToVisit: 'October to March'
  },
  {
    id: '7',
    slug: 'ajanta-caves',
    name: 'Ajanta Caves',
    location: 'Aurangabad, Maharashtra',
    state: 'Maharashtra',
    country: 'India',
    coordinates: { lat: 20.5519, lng: 75.7033 },
    historicalPeriod: '2nd century BCE – 5th century CE',
    category: 'Caves',
    shortDescription: 'A stunning complex of 29 Buddhist rock-cut cave monuments containing some of the finest examples of ancient Indian art, painting, and sculpture dating back 2,000 years.',
    fullDescription: `The Ajanta Caves are approximately 29 rock-cut Buddhist cave monuments in the Aurangabad district of Maharashtra, dating from the 2nd century BCE to about 480 CE. The caves include paintings and rock-cut sculptures described as among the finest surviving examples of ancient Indian art.

The paintings in the Ajanta caves are considered a masterpiece of Buddhist religious art, with influences that spread throughout Asia. They mainly depict the past lives and rebirths of the Buddha (Jataka tales), and historical accounts and events. They were painted with vegetable and mineral pigments on dry walls in the 5th century. The quality of the pigments was so good that the colors have survived for 1,500 years.

The caves were carved out of the horseshoe-shaped cliff by Buddhist monks beginning in the 2nd century BCE. The caves fell into disuse around the 7th century CE and were forgotten by the local population. In 1819, John Smith, a British cavalry officer, accidentally rediscovered them while on a tiger hunt.`,
    culturalSignificance: 'UNESCO World Heritage Site (1983). Masterpiece of Buddhist art and architecture. Major influence on Asian art from Japan to Sri Lanka.',
    architectureStyle: 'Rock-cut Architecture — Buddhist cave architecture with viharas (monasteries) and chaitya-grihas (prayer halls)',
    preservationStatus: 'Good',
    visitorCount: 500000,
    rating: 4.7,
    featured: false,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Ajanta_cave1.jpg/1200px-Ajanta_cave1.jpg'
    ],
    timeline: [
      { year: -200, title: 'First Phase Begins', description: 'Buddhist monks begin carving the first caves as monsoon retreats during the 2nd century BCE.' },
      { year: 480, title: 'Second Phase Complete', description: 'A second phase of construction adds more caves with elaborate paintings under the Vakataka dynasty.' },
      { year: 650, title: 'Caves Abandoned', description: 'The caves fall into disuse and are gradually forgotten as Buddhism declines in the region.' },
      { year: 1819, title: 'British Rediscovery', description: 'British officer John Smith rediscovers the caves while tiger hunting. The world is astonished by the preserved artworks.' },
      { year: 1983, title: 'UNESCO Heritage', description: 'Designated a UNESCO World Heritage Site.' }
    ],
    facts: [
      'The paintings used mineral and vegetable pigments — lapis lazuli blue from Afghanistan, red from cinnabar — which have lasted 1,500 years.',
      'Cave 1 and Cave 2 contain the most elaborate and well-preserved paintings, depicting Bodhisattva Padmapani and Vajrapani.',
      'The caves were carved using only iron chisels and hammers — no explosives or power tools.',
      'The complex narrates the entire life story of the Buddha through paintings and sculpture.'
    ],
    virtualTour: { available: true, scenes: 5 },
    model3D: { available: false, format: 'none' },
    distance: null,
    tags: ['UNESCO', 'Buddhist', 'Caves', 'Paintings', 'Maharashtra'],
    openingHours: '9:00 AM – 5:30 PM (Closed on Mondays)',
    entryFee: '₹40 (Indians), ₹600 (Foreigners)',
    bestTimeToVisit: 'November to March'
  },
  {
    id: '8',
    slug: 'ellora-caves',
    name: 'Ellora Caves',
    location: 'Aurangabad, Maharashtra',
    state: 'Maharashtra',
    country: 'India',
    coordinates: { lat: 20.0258, lng: 75.1794 },
    historicalPeriod: '600–1000 CE',
    category: 'Caves',
    shortDescription: 'A remarkable collection of 34 rock-cut monasteries and temples representing Buddhism, Hinduism, and Jainism — a unique testament to India\'s religious harmony and artistic genius.',
    fullDescription: `The Ellora Caves are a UNESCO World Heritage Site located 29 km from Aurangabad, in the Aurangabad district of Maharashtra. Consisting of 34 monasteries and temples, extending over more than 2 km, they were dug side by side in the wall of a high basalt cliff.

Ellora represents the epitome of Indian rock-cut architecture. The 34 caves actually are structures excavated out of the vertical face of the Charanandri hills. Buddhist, Hindu and Jain rock-cut temples and viharas and mathas were built between the 6th century and 11th century. The 12 Buddhist caves (caves 1–12), 17 Hindu caves (caves 13–29), and 5 Jain caves (caves 30–34) together display the religious harmony of the period.

The most outstanding is the colossal Kailash Temple (Cave 16), which was built by the Rashtrakuta king Krishna I in 757–783 CE. It is not a cave but a rock-cut temple carved from a single piece of basalt rock — the largest monolithic excavation in the world.`,
    culturalSignificance: 'UNESCO World Heritage Site (1983). Symbol of India\'s religious pluralism. The Kailash Temple is the world\'s largest monolithic rock excavation.',
    architectureStyle: 'Rock-cut Architecture — multiple styles: Buddhist viharas, Hindu rock-cut temples in Rashtrakuta and Yadava styles, Jain temples',
    preservationStatus: 'Good',
    visitorCount: 600000,
    rating: 4.8,
    featured: true,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Ellora_cave_16_entrance_to_Kailash_temple.jpg/1200px-Ellora_cave_16_entrance_to_Kailash_temple.jpg'
    ],
    timeline: [
      { year: 600, title: 'Construction Begins', description: 'Buddhist monks begin carving the first Ellora caves during the Kalachuri period.' },
      { year: 757, title: 'Kailash Temple', description: 'Rashtrakuta king Krishna I begins the monumental Kailash Temple — a 100-year project carved top-down from solid basalt.' },
      { year: 900, title: 'Jain Caves', description: 'The Yadava dynasty adds the Jain caves with exquisite sculptures of Tirthankaras.' },
      { year: 1983, title: 'UNESCO Heritage', description: 'Declared a UNESCO World Heritage Site.' }
    ],
    facts: [
      'The Kailash Temple (Cave 16) required removal of 200,000 tonnes of rock — carved entirely top to bottom over 100 years.',
      'Ellora is unique in the world as the only heritage site where three major religions — Buddhism, Hinduism, Jainism — are co-located.',
      'The Kailash Temple is the world\'s largest monolithic structure — bigger than the Parthenon in Greece.',
      'Ancient craftsmen had to plan the entire structure in their minds before cutting a single stone — no margin for error.'
    ],
    virtualTour: { available: true, scenes: 4 },
    model3D: { available: true, format: 'glb' },
    distance: null,
    tags: ['UNESCO', 'Caves', 'Kailash Temple', 'Multi-faith', 'Maharashtra'],
    openingHours: '9:00 AM – 5:30 PM (Closed on Tuesdays)',
    entryFee: '₹40 (Indians), ₹600 (Foreigners)',
    bestTimeToVisit: 'November to March'
  },
  {
    id: '9',
    slug: 'mysore-palace',
    name: 'Mysore Palace',
    location: 'Mysore, Karnataka',
    state: 'Karnataka',
    country: 'India',
    coordinates: { lat: 12.3052, lng: 76.6552 },
    historicalPeriod: 'Wadiyar Dynasty (1912 CE)',
    category: 'Palace',
    shortDescription: 'The opulent palace of the Wadiyar maharajas of Mysore, one of India\'s most visited monuments, known for its stunning Indo-Saracenic architecture and spectacular Dasara illuminations.',
    fullDescription: `The Mysore Palace, also known as Amba Vilas Palace, is a historical palace and the official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore. It is located in the city of Mysore in Karnataka, South India. The palace is in the Indo-Saracenic style and was built between 1897 and 1912.

The Mysore Palace is one of the most visited monuments in India. It is estimated that over 6 million visitors come to the palace every year, making it one of the most visited palaces in India. The palace complex has 12 Hindu temples dating back to the 14th-century period of Hoysala architecture.

The palace is famous for its illumination during the Dasara festival when it is lit up with approximately 97,000 light bulbs. The Dasara celebration of Mysore, headed by the Wadiyar Maharaja, is a massive event that draws thousands of visitors. The palace interior contains many interesting features: arched galleries, painted ceilings, carved wooden doors, and a beautiful Durbar Hall with cast iron columns imported from Scotland.`,
    culturalSignificance: 'One of India\'s most visited monuments with 6 million visitors/year. Seat of the Wadiyar dynasty for 600 years. Center of the Mysore cultural tradition.',
    architectureStyle: 'Indo-Saracenic Architecture — a blend of Hindu, Muslim, Rajput, and Gothic styles with three distinct domes',
    preservationStatus: 'Excellent',
    visitorCount: 6000000,
    rating: 4.8,
    featured: true,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Mysore_Palace_Morning.jpg/1200px-Mysore_Palace_Morning.jpg'
    ],
    timeline: [
      { year: 1399, title: 'Original Palace', description: 'The original palace is built of wood for the Wadiyar dynasty in Mysore.' },
      { year: 1897, title: 'Fire & Reconstruction', description: 'The wooden palace burns down during a royal wedding celebration. Maharaja Krishnaraja Wadiyar IV commissions a new palace.' },
      { year: 1912, title: 'New Palace Completed', description: 'British architect Henry Irwin completes the current palace in Indo-Saracenic style.' },
      { year: 1940, title: 'Dasara Celebrations', description: 'The grand Dasara festival with 97,000 light bulbs illumination becomes an annual tradition.' },
      { year: 1998, title: 'Government Maintenance', description: 'The palace is handed over to the Karnataka government and opened to tourists.' }
    ],
    facts: [
      'The palace is illuminated with 97,000 light bulbs every Sunday evening and during the Dasara festival.',
      'It took 15 years (1897–1912) to construct the current palace at a cost of Rs 41.5 lakh.',
      'The golden howdah (elephant throne) weighs 750 kg and is used during the Dasara procession.',
      'Mysore Dasara is one of India\'s 10 national festivals, centered around the palace.'
    ],
    virtualTour: { available: true, scenes: 5 },
    model3D: { available: true, format: 'glb' },
    distance: null,
    tags: ['Palace', 'Wadiyar', 'Dasara', 'Indo-Saracenic', 'Karnataka'],
    openingHours: '10:00 AM – 5:30 PM (Daily)',
    entryFee: '₹100 (Indians), ₹200 (Foreigners)',
    bestTimeToVisit: 'October (Dasara festival) or November to March'
  },
  {
    id: '10',
    slug: 'sanchi-stupa',
    name: 'Sanchi Stupa',
    location: 'Sanchi, Madhya Pradesh',
    state: 'Madhya Pradesh',
    country: 'India',
    coordinates: { lat: 23.4787, lng: 77.7400 },
    historicalPeriod: '3rd century BCE – 12th century CE',
    category: 'Buddhist',
    shortDescription: 'India\'s oldest stone structure and the best preserved ancient Buddhist sanctuary, commissioned by Emperor Ashoka in the 3rd century BCE.',
    fullDescription: `The Sanchi Stupa is a Buddhist complex famous for its Great Stupa, one of the oldest stone structures in India. It was commissioned by the Mauryan emperor Ashoka the Great in the 3rd century BCE. Sanchi is the site of several Buddhist monuments, built between the 3rd century BCE and the 12th century CE.

The Great Stupa (Stupa No. 1) contains the relics of the Buddha. It was originally commissioned by Ashoka and is considered one of the oldest stone structures in India. It was built over a period of time, with later expansions from the Sunga Empire and Satavahana dynasty.

Sanchi has been a thriving Buddhist center since the 3rd century BCE, but was largely forgotten after Buddhism declined in the Indian subcontinent. It was rediscovered in 1818 by British officer General H.H. Taylor and has been continuously excavated and studied since.

The four torans (gateways) of the Great Stupa are considered the finest examples of Buddhist art in India, with intricate carvings depicting the life of the Buddha, jataka tales, and symbols from the Mauryan period.`,
    culturalSignificance: 'UNESCO World Heritage Site (1989). India\'s oldest standing stone structure. The four gateways are among the finest surviving examples of early Buddhist sculpture.',
    architectureStyle: 'Early Buddhist Architecture — the stupa form with its distinctive anda (dome), harmika, and torana (gateways) style',
    preservationStatus: 'Good',
    visitorCount: 300000,
    rating: 4.5,
    featured: false,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Sanchi1_N-MP-220.jpg/1200px-Sanchi1_N-MP-220.jpg'
    ],
    timeline: [
      { year: -268, title: 'Ashoka Becomes Emperor', description: 'After the bloody Kalinga War, Emperor Ashoka converts to Buddhism and begins spreading its teachings across his empire.' },
      { year: -250, title: 'Great Stupa Commissioned', description: 'Emperor Ashoka commissions the Great Stupa at Sanchi to house Buddhist relics. It is a simple brick hemisphere.' },
      { year: -100, title: 'Sunga Expansion', description: 'The Sunga dynasty expands the stupa with stone casing and adds the ceremonial pathway.' },
      { year: 50, title: 'Torana Gateways', description: 'The four magnificent torana (ornamental gateways) are added by the Satavahana dynasty with exquisite carvings.' },
      { year: 1818, title: 'Rediscovery', description: 'British officer General Taylor rediscovers the abandoned site. Systematic restoration begins.' },
      { year: 1989, title: 'UNESCO Heritage', description: 'Designated a UNESCO World Heritage Site.' }
    ],
    facts: [
      'The Sanchi Stupa is India\'s oldest standing stone structure, over 2,300 years old.',
      'The four gateways were donated by ivory workers of Vidisha — their inscription is still visible.',
      'The ashes of Ashoka\'s teacher Sariputra and Maudgalyayana (two of Buddha\'s chief disciples) are enshrined here.',
      'The Ashokan pillar at Sanchi has the famous Lion Capital — the model for India\'s national emblem.'
    ],
    virtualTour: { available: false, scenes: 0 },
    model3D: { available: false, format: 'none' },
    distance: null,
    tags: ['UNESCO', 'Buddhist', 'Ashoka', 'Stupa', 'Madhya Pradesh'],
    openingHours: '8:30 AM – 5:30 PM (Daily)',
    entryFee: '₹30 (Indians), ₹500 (Foreigners)',
    bestTimeToVisit: 'November to March'
  }
];

export const categories = [
  'All', 'Monument', 'Fort', 'Archaeological Site', 'Temples', 'Temple', 
  'Caves', 'Palace', 'Buddhist', 'Museum', 'Cultural Village', 'Festival'
];

export const getSiteById = (id: string): HeritageSite | undefined => 
  heritageSites.find(s => s.id === id);

export const getSiteBySlug = (slug: string): HeritageSite | undefined => 
  heritageSites.find(s => s.slug === slug);

export const getFeaturedSites = (): HeritageSite[] => 
  heritageSites.filter(s => s.featured);

export const getSitesByCategory = (category: string): HeritageSite[] => 
  category === 'All' ? heritageSites : heritageSites.filter(s => s.category === category);
