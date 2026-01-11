import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, MapPin, ArrowUp, Loader, Flag } from 'lucide-react';
import * as d3 from 'd3';

// Comprehensive list of countries with ISO 3166-1 numeric codes and centroids
const countriesData = [
  { name: 'Afghanistan', id: 4, lat: 33.9391, lng: 67.7100 },
  { name: 'Albania', id: 8, lat: 41.1533, lng: 20.1683 },
  { name: 'Algeria', id: 12, lat: 28.0339, lng: 1.6596 },
  { name: 'Andorra', id: 20, lat: 42.5063, lng: 1.5218 },
  { name: 'Angola', id: 24, lat: -11.2027, lng: 17.8739 },
  { name: 'Antigua and Barbuda', id: 28, lat: 17.0608, lng: -61.7964 },
  { name: 'Argentina', id: 32, lat: -38.4161, lng: -63.6167 },
  { name: 'Armenia', id: 51, lat: 40.0691, lng: 45.0382 },
  { name: 'Australia', id: 36, lat: -25.2744, lng: 133.7751 },
  { name: 'Austria', id: 40, lat: 47.5162, lng: 14.5501 },
  { name: 'Azerbaijan', id: 31, lat: 40.1431, lng: 47.5769 },
  { name: 'Bahamas', id: 44, lat: 25.0343, lng: -77.3963 },
  { name: 'Bahrain', id: 48, lat: 26.0667, lng: 50.5577 },
  { name: 'Bangladesh', id: 50, lat: 23.6850, lng: 90.3563 },
  { name: 'Barbados', id: 52, lat: 13.1939, lng: -59.5432 },
  { name: 'Belarus', id: 112, lat: 53.7098, lng: 27.9534 },
  { name: 'Belgium', id: 56, lat: 50.5039, lng: 4.4699 },
  { name: 'Belize', id: 84, lat: 17.1899, lng: -88.4976 },
  { name: 'Benin', id: 204, lat: 9.3077, lng: 2.3158 },
  { name: 'Bhutan', id: 64, lat: 27.5142, lng: 90.4336 },
  { name: 'Bolivia', id: 68, lat: -16.2902, lng: -63.5887 },
  { name: 'Bosnia and Herzegovina', id: 70, lat: 43.9159, lng: 17.6791 },
  { name: 'Botswana', id: 72, lat: -22.3285, lng: 24.6849 },
  { name: 'Brazil', id: 76, lat: -14.2350, lng: -51.9253 },
  { name: 'Brunei', id: 96, lat: 4.5353, lng: 114.7277 },
  { name: 'Bulgaria', id: 100, lat: 42.7339, lng: 25.4858 },
  { name: 'Burkina Faso', id: 854, lat: 12.2383, lng: -1.5616 },
  { name: 'Burundi', id: 108, lat: -3.3731, lng: 29.9189 },
  { name: 'Cabo Verde', id: 132, lat: 16.0021, lng: -24.0132 },
  { name: 'Cambodia', id: 116, lat: 12.5657, lng: 104.9910 },
  { name: 'Cameroon', id: 120, lat: 7.3697, lng: 12.3547 },
  { name: 'Canada', id: 124, lat: 56.1304, lng: -106.3468 },
  { name: 'Central African Republic', id: 140, lat: 6.6111, lng: 20.9394 },
  { name: 'Chad', id: 148, lat: 15.4542, lng: 18.7322 },
  { name: 'Chile', id: 152, lat: -35.6751, lng: -71.5430 },
  { name: 'China', id: 156, lat: 35.8617, lng: 104.1954 },
  { name: 'Colombia', id: 170, lat: 4.5709, lng: -74.2973 },
  { name: 'Comoros', id: 174, lat: -11.8750, lng: 43.8722 },
  { name: 'Congo (Democratic Republic)', id: 180, lat: -4.0383, lng: 21.7587 },
  { name: 'Congo (Republic)', id: 178, lat: -0.2280, lng: 15.8277 },
  { name: 'Costa Rica', id: 188, lat: 9.7489, lng: -83.7534 },
  { name: 'Croatia', id: 191, lat: 45.1000, lng: 15.2000 },
  { name: 'Cuba', id: 192, lat: 21.5218, lng: -77.7812 },
  { name: 'Cyprus', id: 196, lat: 35.1264, lng: 33.4299 },
  { name: 'Czech Republic', id: 203, lat: 49.8175, lng: 15.4730 },
  { name: 'Denmark', id: 208, lat: 56.2639, lng: 9.5018 },
  { name: 'Djibouti', id: 262, lat: 11.8251, lng: 42.5903 },
  { name: 'Dominica', id: 212, lat: 15.4150, lng: -61.3710 },
  { name: 'Dominican Republic', id: 214, lat: 18.7357, lng: -70.1627 },
  { name: 'East Timor', id: 626, lat: -8.8742, lng: 125.7275 },
  { name: 'Ecuador', id: 218, lat: -1.8312, lng: -78.1834 },
  { name: 'Egypt', id: 818, lat: 26.8206, lng: 30.8025 },
  { name: 'El Salvador', id: 222, lat: 13.7942, lng: -88.8965 },
  { name: 'Equatorial Guinea', id: 226, lat: 1.6508, lng: 10.2679 },
  { name: 'Eritrea', id: 232, lat: 15.1794, lng: 39.7823 },
  { name: 'Estonia', id: 233, lat: 58.5953, lng: 25.0136 },
  { name: 'Eswatini', id: 748, lat: -26.5225, lng: 31.4659 },
  { name: 'Ethiopia', id: 231, lat: 9.1450, lng: 40.4897 },
  { name: 'Fiji', id: 242, lat: -17.7134, lng: 178.0650 },
  { name: 'Finland', id: 246, lat: 61.9241, lng: 25.7482 },
  { name: 'France', id: 250, lat: 46.2276, lng: 2.2137 },
  { name: 'Gabon', id: 266, lat: -0.8037, lng: 11.6094 },
  { name: 'Gambia', id: 270, lat: 13.4432, lng: -15.3101 },
  { name: 'Georgia', id: 268, lat: 42.3154, lng: 43.3569 },
  { name: 'Germany', id: 276, lat: 51.1657, lng: 10.4515 },
  { name: 'Ghana', id: 288, lat: 7.9465, lng: -1.0232 },
  { name: 'Greece', id: 300, lat: 39.0742, lng: 21.8243 },
  { name: 'Grenada', id: 308, lat: 12.1165, lng: -61.6790 },
  { name: 'Guatemala', id: 320, lat: 15.7835, lng: -90.2308 },
  { name: 'Guinea', id: 324, lat: 9.9456, lng: -9.6966 },
  { name: 'Guinea-Bissau', id: 624, lat: 11.8037, lng: -15.1804 },
  { name: 'Guyana', id: 328, lat: 4.8604, lng: -58.9302 },
  { name: 'Haiti', id: 332, lat: 18.9712, lng: -72.2852 },
  { name: 'Honduras', id: 340, lat: 15.2000, lng: -86.2419 },
  { name: 'Hungary', id: 348, lat: 47.1625, lng: 19.5033 },
  { name: 'Iceland', id: 352, lat: 64.9631, lng: -19.0208 },
  { name: 'India', id: 356, lat: 20.5937, lng: 78.9629 },
  { name: 'Indonesia', id: 360, lat: -0.7893, lng: 113.9213 },
  { name: 'Iran', id: 364, lat: 32.4279, lng: 53.6880 },
  { name: 'Iraq', id: 368, lat: 33.2232, lng: 43.6793 },
  { name: 'Ireland', id: 372, lat: 53.4129, lng: -8.2439 },
  { name: 'Israel', id: 376, lat: 31.0461, lng: 34.8516 },
  { name: 'Italy', id: 380, lat: 41.8719, lng: 12.5674 },
  { name: 'Ivory Coast', id: 384, lat: 7.5400, lng: -5.5471 },
  { name: 'Jamaica', id: 388, lat: 18.1096, lng: -77.2975 },
  { name: 'Japan', id: 392, lat: 36.2048, lng: 138.2529 },
  { name: 'Jordan', id: 400, lat: 30.5852, lng: 36.2384 },
  { name: 'Kazakhstan', id: 398, lat: 48.0196, lng: 66.9237 },
  { name: 'Kenya', id: 404, lat: -0.0236, lng: 37.9062 },
  { name: 'Kiribati', id: 296, lat: -3.3704, lng: -168.7340 },
  { name: 'Kuwait', id: 414, lat: 29.3117, lng: 47.4818 },
  { name: 'Kyrgyzstan', id: 417, lat: 41.2044, lng: 74.7661 },
  { name: 'Laos', id: 418, lat: 19.8563, lng: 102.4955 },
  { name: 'Latvia', id: 428, lat: 56.8796, lng: 24.6032 },
  { name: 'Lebanon', id: 422, lat: 33.8547, lng: 35.8623 },
  { name: 'Lesotho', id: 426, lat: -29.6099, lng: 28.2336 },
  { name: 'Liberia', id: 430, lat: 6.4281, lng: -9.4295 },
  { name: 'Libya', id: 434, lat: 26.3351, lng: 17.2283 },
  { name: 'Liechtenstein', id: 438, lat: 47.1660, lng: 9.5554 },
  { name: 'Lithuania', id: 440, lat: 55.1694, lng: 23.8813 },
  { name: 'Luxembourg', id: 442, lat: 49.8153, lng: 6.1296 },
  { name: 'Madagascar', id: 450, lat: -18.7669, lng: 46.8691 },
  { name: 'Malawi', id: 454, lat: -13.2543, lng: 34.3015 },
  { name: 'Malaysia', id: 458, lat: 4.2105, lng: 101.9758 },
  { name: 'Maldives', id: 462, lat: 3.2028, lng: 73.2207 },
  { name: 'Mali', id: 466, lat: 17.5707, lng: -3.9962 },
  { name: 'Malta', id: 470, lat: 35.9375, lng: 14.3754 },
  { name: 'Marshall Islands', id: 584, lat: 7.1315, lng: 171.1845 },
  { name: 'Mauritania', id: 478, lat: 21.0079, lng: -10.9408 },
  { name: 'Mauritius', id: 480, lat: -20.3484, lng: 57.5522 },
  { name: 'Mexico', id: 484, lat: 23.6345, lng: -102.5528 },
  { name: 'Micronesia', id: 583, lat: 7.4256, lng: 150.5508 },
  { name: 'Moldova', id: 498, lat: 47.4116, lng: 28.3699 },
  { name: 'Monaco', id: 492, lat: 43.7384, lng: 7.4246 },
  { name: 'Mongolia', id: 496, lat: 46.8625, lng: 103.8467 },
  { name: 'Montenegro', id: 499, lat: 42.7087, lng: 19.3744 },
  { name: 'Morocco', id: 504, lat: 31.7917, lng: -7.0926 },
  { name: 'Mozambique', id: 508, lat: -18.6657, lng: 35.5296 },
  { name: 'Myanmar', id: 104, lat: 21.9162, lng: 95.9560 },
  { name: 'Namibia', id: 516, lat: -22.9576, lng: 18.4904 },
  { name: 'Nauru', id: 520, lat: -0.5228, lng: 166.9315 },
  { name: 'Nepal', id: 524, lat: 28.3949, lng: 84.1240 },
  { name: 'Netherlands', id: 528, lat: 52.1326, lng: 5.2913 },
  { name: 'New Zealand', id: 554, lat: -40.9006, lng: 174.8860 },
  { name: 'Nicaragua', id: 558, lat: 12.8654, lng: -85.2072 },
  { name: 'Niger', id: 562, lat: 17.6078, lng: 8.0817 },
  { name: 'Nigeria', id: 566, lat: 9.0820, lng: 8.6753 },
  { name: 'North Korea', id: 408, lat: 40.3399, lng: 127.5101 },
  { name: 'North Macedonia', id: 807, lat: 41.6086, lng: 21.7453 },
  { name: 'Norway', id: 578, lat: 60.4720, lng: 8.4689 },
  { name: 'Oman', id: 512, lat: 21.5126, lng: 55.9233 },
  { name: 'Pakistan', id: 586, lat: 30.3753, lng: 69.3451 },
  { name: 'Palau', id: 585, lat: 7.5150, lng: 134.5825 },
  { name: 'Palestine', id: 275, lat: 31.9522, lng: 35.2332 },
  { name: 'Panama', id: 591, lat: 8.5380, lng: -80.7821 },
  { name: 'Papua New Guinea', id: 598, lat: -6.3150, lng: 143.9555 },
  { name: 'Paraguay', id: 600, lat: -23.4425, lng: -58.4438 },
  { name: 'Peru', id: 604, lat: -9.1900, lng: -75.0152 },
  { name: 'Philippines', id: 608, lat: 12.8797, lng: 121.7740 },
  { name: 'Poland', id: 616, lat: 51.9194, lng: 19.1451 },
  { name: 'Portugal', id: 620, lat: 39.3999, lng: -8.2245 },
  { name: 'Qatar', id: 634, lat: 25.3548, lng: 51.1839 },
  { name: 'Romania', id: 642, lat: 45.9432, lng: 24.9668 },
  { name: 'Russia', id: 643, lat: 61.5240, lng: 105.3188 },
  { name: 'Rwanda', id: 646, lat: -1.9403, lng: 29.8739 },
  { name: 'Saint Kitts and Nevis', id: 659, lat: 17.3578, lng: -62.7830 },
  { name: 'Saint Lucia', id: 662, lat: 13.9094, lng: -60.9789 },
  { name: 'Saint Vincent and the Grenadines', id: 670, lat: 12.9843, lng: -61.2872 },
  { name: 'Samoa', id: 882, lat: -13.7590, lng: -172.1046 },
  { name: 'San Marino', id: 674, lat: 43.9424, lng: 12.4578 },
  { name: 'Sao Tome and Principe', id: 678, lat: 0.1864, lng: 6.6131 },
  { name: 'Saudi Arabia', id: 682, lat: 23.8859, lng: 45.0792 },
  { name: 'Senegal', id: 686, lat: 14.4974, lng: -14.4524 },
  { name: 'Serbia', id: 688, lat: 44.0165, lng: 21.0059 },
  { name: 'Seychelles', id: 690, lat: -4.6796, lng: 55.4920 },
  { name: 'Sierra Leone', id: 694, lat: 8.4606, lng: -11.7799 },
  { name: 'Singapore', id: 702, lat: 1.3521, lng: 103.8198 },
  { name: 'Slovakia', id: 703, lat: 48.6690, lng: 19.6990 },
  { name: 'Slovenia', id: 705, lat: 46.1512, lng: 14.9955 },
  { name: 'Solomon Islands', id: 90, lat: -9.6457, lng: 160.1562 },
  { name: 'Somalia', id: 706, lat: 5.1521, lng: 46.1996 },
  { name: 'South Africa', id: 710, lat: -30.5595, lng: 22.9375 },
  { name: 'South Korea', id: 410, lat: 35.9078, lng: 127.7669 },
  { name: 'South Sudan', id: 728, lat: 6.8770, lng: 31.3070 },
  { name: 'Spain', id: 724, lat: 40.4637, lng: -3.7492 },
  { name: 'Sri Lanka', id: 144, lat: 7.8731, lng: 80.7718 },
  { name: 'Sudan', id: 729, lat: 12.8628, lng: 30.2176 },
  { name: 'Suriname', id: 740, lat: 3.9193, lng: -56.0278 },
  { name: 'Sweden', id: 752, lat: 60.1282, lng: 18.6435 },
  { name: 'Switzerland', id: 756, lat: 46.8182, lng: 8.2275 },
  { name: 'Syria', id: 760, lat: 34.8021, lng: 38.9968 },
  { name: 'Tajikistan', id: 762, lat: 38.8610, lng: 71.2761 },
  { name: 'Tanzania', id: 834, lat: -6.3690, lng: 34.8888 },
  { name: 'Thailand', id: 764, lat: 15.8700, lng: 100.9925 },
  { name: 'Togo', id: 768, lat: 8.6195, lng: 0.8248 },
  { name: 'Tonga', id: 776, lat: -21.1790, lng: -175.1982 },
  { name: 'Trinidad and Tobago', id: 780, lat: 10.6918, lng: -61.2225 },
  { name: 'Tunisia', id: 788, lat: 33.8869, lng: 9.5375 },
  { name: 'Turkey', id: 792, lat: 38.9637, lng: 35.2433 },
  { name: 'Turkmenistan', id: 795, lat: 38.9697, lng: 59.5563 },
  { name: 'Tuvalu', id: 798, lat: -7.1095, lng: 177.6493 },
  { name: 'Uganda', id: 800, lat: 1.3733, lng: 32.2903 },
  { name: 'Ukraine', id: 804, lat: 48.3794, lng: 31.1656 },
  { name: 'United Arab Emirates', id: 784, lat: 23.4241, lng: 53.8478 },
  { name: 'United Kingdom', id: 826, lat: 55.3781, lng: -3.4360 },
  { name: 'United States', id: 840, lat: 37.0902, lng: -95.7129 },
  { name: 'Uruguay', id: 858, lat: -32.5228, lng: -55.7658 },
  { name: 'Uzbekistan', id: 860, lat: 41.3775, lng: 64.5853 },
  { name: 'Vanuatu', id: 548, lat: -15.3767, lng: 166.9592 },
  { name: 'Venezuela', id: 862, lat: 6.4238, lng: -66.5897 },
  { name: 'Vietnam', id: 704, lat: 14.0583, lng: 108.2772 },
  { name: 'Yemen', id: 887, lat: 15.5527, lng: 48.5164 },
  { name: 'Zambia', id: 894, lat: -13.1339, lng: 27.8493 },
  { name: 'Zimbabwe', id: 716, lat: -19.0154, lng: 29.1549 }
];

const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

export default function App() {
  const [currentCountry, setCurrentCountry] = useState(null);
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [worldData, setWorldData] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    loadWorldData();
  }, []);

  useEffect(() => {
    if (worldData && currentCountry && svgRef.current) {
      renderCountry();
    }
  }, [currentCountry, worldData]);

  // Scroll to selected item in dropdown
  useEffect(() => {
    if (selectedIndex >= 0 && filteredCountries.length > 0) {
      const element = document.getElementById(`suggestion-${selectedIndex}`);
      if (element) {
        element.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, filteredCountries]);

  const loadWorldData = async () => {
    setLoading(true);
    try {
      // Check if TopoJSON is already loaded
      if (typeof window.topojson === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js';
        script.async = true;
        
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      
      const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json');
      const data = await response.json();
      setWorldData(data);
      // Wait a tick for state to settle before starting game
      setTimeout(() => startNewGame(), 0);
    } catch (error) {
      console.error('Error loading world data:', error);
    }
    setLoading(false);
  };

  const renderCountry = () => {
    if (!worldData || !currentCountry || !svgRef.current) return;
    if (typeof window.topojson === 'undefined') return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 500;

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const countries = window.topojson.feature(worldData, worldData.objects.countries);
    const country = countries.features.find(d => d.id == currentCountry.id);

    if (!country) {
        // Fallback or error handling if country shape is missing from map data
        svg.append('text')
           .attr('x', width / 2)
           .attr('y', height / 2)
           .attr('text-anchor', 'middle')
           .text('Map shape not available')
           .attr('fill', '#666');
        return;
    }

    // The fitSize method is the magic that centers the specific country
    const projection = d3.geoMercator().fitSize([width, height], country);
    const path = d3.geoPath().projection(projection);

    // Background
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#f1f5f9');

    // Country shape
    svg.append('path')
      .datum(country)
      .attr('d', path)
      .attr('fill', '#2563eb')
      .attr('stroke', '#1e40af')
      .attr('stroke-width', 2);
  };

  const startNewGame = () => {
    const randomCountry = countriesData[Math.floor(Math.random() * countriesData.length)];
    setCurrentCountry(randomCountry);
    setGuesses([]);
    setGameOver(false);
    setGuess('');
    setFilteredCountries([]);
    setSelectedIndex(-1);
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const getDirection = (lat1, lng1, lat2, lng2) => {
    const dLng = lng2 - lng1;
    const y = Math.sin(dLng * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180);
    const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
              Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLng * Math.PI / 180);
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = (bearing + 360) % 360;
    
    const index = Math.round(bearing / 45) % 8;
    return directions[index];
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setGuess(value);
    setSelectedIndex(-1);
    
    if (value.length > 0) {
      const filtered = countriesData
        .map(c => c.name)
        .filter(name => name.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, 8);
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };

  const handleKeyDown = (e) => {
    if (filteredCountries.length === 0) {
        if (e.key === 'Enter') {
            handleSubmit();
        }
        return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredCountries.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < filteredCountries.length) {
        selectCountry(filteredCountries[selectedIndex]);
      } else {
        handleSubmit();
      }
    } else if (e.key === 'Escape') {
      setFilteredCountries([]);
      setSelectedIndex(-1);
    }
  };

  const handleSubmit = () => {
    if (!guess.trim() || gameOver) return;

    const guessedCountry = countriesData.find(
      c => c.name.toLowerCase() === guess.trim().toLowerCase()
    );

    if (!guessedCountry) {
      // In a real app we might use a toast, here alert is a fallback
      // but ideally we just show an inline error. 
      // For this simplified version we'll just not proceed.
      return;
    }

    const isCorrect = guessedCountry.name === currentCountry.name;

    if (isCorrect) {
      setGuesses([...guesses, { country: guessedCountry.name, correct: true }]);
      setGameOver(true);
      setGamesPlayed(gamesPlayed + 1);
      setTimeout(() => startNewGame(), 2500);
    } else {
      const distance = calculateDistance(
        currentCountry.lat, currentCountry.lng,
        guessedCountry.lat, guessedCountry.lng
      );
      const direction = getDirection(
        guessedCountry.lat, guessedCountry.lng,
        currentCountry.lat, currentCountry.lng
      );

      const newGuesses = [...guesses, {
        country: guessedCountry.name,
        distance,
        direction,
        correct: false
      }];
      
      setGuesses(newGuesses);
      setGuess('');
      setFilteredCountries([]);

      if (newGuesses.length >= 5) {
        setGameOver(true);
        setGamesPlayed(gamesPlayed + 1);
        setTimeout(() => startNewGame(), 4000);
      }
    }
  };

  const handleGiveUp = () => {
    setGameOver(true);
    setGamesPlayed(gamesPlayed + 1);
    setTimeout(() => startNewGame(), 4000);
  };

  const selectCountry = (countryName) => {
    setGuess(countryName);
    setFilteredCountries([]);
    setSelectedIndex(-1);
  };

  const resetGame = () => {
    setGamesPlayed(0);
    startNewGame();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-700 text-lg">Loading world map data...</p>
        </div>
      </div>
    );
  }

  // Ensure currentCountry is set before rendering
  if (!currentCountry && !loading) {
      // If we are not loading but currentCountry is null, it means startNewGame hasn't fired yet
      // or countriesData was empty. Just trigger start.
      if (countriesData.length > 0) {
          startNewGame();
          return null; // Will re-render
      }
      return <div>Error: No country data available.</div>;
  }

  if (!currentCountry) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <MapPin className="text-indigo-600" />
              Guess the Country
            </h1>
            <button
              onClick={resetGame}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Reset Game Stats"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg">
              <Flag className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold text-indigo-900">
                Guesses: {guesses.length}/5
              </span>
            </div>
            {gamesPlayed > 0 && (
              <div className="text-sm text-gray-600">
                Games: {gamesPlayed}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-4 mb-6 border-4 border-slate-300">
            <svg ref={svgRef} className="w-full h-auto" style={{ maxHeight: '500px' }}></svg>
          </div>

          {gameOver && (
            <div className={`mb-4 p-4 rounded-lg text-center font-semibold ${
              guesses.length > 0 && guesses[guesses.length - 1]?.correct 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {guesses.length > 0 && guesses[guesses.length - 1]?.correct 
                ? `🎉 Correct! It was ${currentCountry.name}!`
                : `❌ The answer was ${currentCountry.name}`}
            </div>
          )}

          {guesses.length > 0 && (
            <div className="mb-6 space-y-2">
              <h3 className="font-semibold text-gray-700 mb-3">Your Guesses:</h3>
              {guesses.map((g, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg flex items-center justify-between ${
                    g.correct ? 'bg-green-100' : 'bg-gray-100'
                  }`}
                >
                  <span className="font-medium">{g.country}</span>
                  {!g.correct && (
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-700 font-semibold">{g.distance.toLocaleString()} km</span>
                      <div className="flex items-center gap-1 bg-indigo-100 px-2 py-1 rounded">
                        {/* Using ArrowUp instead of Navigation. 
                          ArrowUp points straight UP (0deg) by default.
                          This ensures 0deg rotation = North, 90deg = East, etc.
                        */}
                        <ArrowUp 
                          className="w-4 h-4 text-indigo-600" 
                          style={{ transform: `rotate(${directions.indexOf(g.direction) * 45}deg)` }} 
                        />
                        <span className="font-bold text-indigo-700">{g.direction}</span>
                      </div>
                    </div>
                  )}
                  {g.correct && <span className="text-green-700 font-bold text-lg">✓</span>}
                </div>
              ))}
            </div>
          )}

          {!gameOver && (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={guess}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type country name..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
                  autoComplete="off"
                />
                {filteredCountries.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border-2 border-gray-200 rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto">
                    {filteredCountries.map((country, i) => (
                      <div
                        key={i}
                        id={`suggestion-${i}`}
                        onClick={() => selectCountry(country)}
                        className={`px-4 py-2 cursor-pointer text-left ${
                          i === selectedIndex ? 'bg-indigo-100' : 'hover:bg-indigo-50'
                        }`}
                      >
                        {country}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={!guess.trim()}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-lg"
                >
                  Submit ({5 - guesses.length} left)
                </button>
                <button
                  onClick={handleGiveUp}
                  className="px-6 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors text-lg"
                >
                  Give Up
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          🗺️ Guess the countries worldwide!
        </div>

        <div className="mt-2 text-center text-xs text-gray-400 font-medium">
          © Copyright made by vedant
        </div>
      </div>
    </div>
  );
}