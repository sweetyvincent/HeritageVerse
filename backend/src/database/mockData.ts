export const MOCK_SITES = [
  {
    id: '1',
    name: 'Taj Mahal',
    slug: 'taj-mahal',
    location_name: 'Agra',
    state: 'Uttar Pradesh',
    country: 'India',
    latitude: 27.1751,
    longitude: 78.0421,
    historical_period: 'Mughal Empire',
    category: 'Monument',
    short_description: 'An ivory-white marble mausoleum on the right bank of the river Yamuna in Agra.',
    full_description: 'The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor, Shah Jahan, to house the tomb of his favourite wife, Mumtaz Mahal. It also houses the tomb of Shah Jahan himself.',
    cultural_significance: 'UNESCO World Heritage Site',
    architecture_style: 'Mughal architecture',
    preservation_status: 'Good',
    visitor_count: 8000000,
    rating: 4.9,
    featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Red Fort',
    slug: 'red-fort',
    location_name: 'Delhi',
    state: 'Delhi',
    country: 'India',
    latitude: 28.6562,
    longitude: 77.2410,
    historical_period: 'Mughal Empire',
    category: 'Fort',
    short_description: 'A historic fort in the city of Delhi in India that served as the main residence of the Mughal Emperors.',
    full_description: 'The Red Fort is a historic fort in the city of Delhi in India that served as the main residence of the Mughal Emperors. Emperor Shah Jahan commissioned construction of the Red Fort on 12 May 1638, when he decided to shift his capital from Agra to Delhi.',
    cultural_significance: 'Symbol of India\'s sovereignty',
    architecture_style: 'Mughal, Indo-Islamic',
    preservation_status: 'Fair',
    visitor_count: 3000000,
    rating: 4.6,
    featured: true,
    created_at: new Date().toISOString()
  },
  // We can add the other 8 here for completeness, but keeping it brief
  {
    id: '3',
    name: 'Hampi',
    slug: 'hampi',
    location_name: 'Hampi',
    state: 'Karnataka',
    country: 'India',
    latitude: 15.3350,
    longitude: 76.4600,
    historical_period: 'Vijayanagara Empire',
    category: 'Ruins',
    short_description: 'An ancient village in the south Indian state of Karnataka, famous for its ruined temple complexes.',
    full_description: 'Hampi is an ancient village in the south Indian state of Karnataka. It\'s dotted with numerous ruined temple complexes from the Vijayanagara Empire.',
    cultural_significance: 'UNESCO World Heritage Site',
    architecture_style: 'Dravidian',
    preservation_status: 'Under Restoration',
    visitor_count: 1500000,
    rating: 4.8,
    featured: true,
    created_at: new Date().toISOString()
  }
];

export const MOCK_REVIEWS = [
  { id: '1', user_id: '1', heritage_site_id: '1', rating: 5, comment: 'Breathtaking beauty!', visit_date: '2023-01-10' }
];

export const MOCK_TIMELINES = [
  { id: '1', heritage_site_id: '1', year: '1632', event_title: 'Construction Begins', event_description: 'Shah Jahan commissions the Taj Mahal.', event_type: 'Construction' },
  { id: '2', heritage_site_id: '1', year: '1653', event_title: 'Completion', event_description: 'Main mausoleum is completed.', event_type: 'Milestone' }
];
