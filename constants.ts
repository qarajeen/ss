
export const QUOTE_DATA = {
    photography: {
        'Event Photography': {
            'Per Hour': { min: 250, max: 500 },
            'Half Day (4 hours)': { min: 1200, max: 2000 },
            'Full Day (8 hours)': { min: 2000, max: 3500 }
        },
        'Corporate/Business Headshots': {
            'Per Person': { min: 150, max: 500 }
        },
        'Product Photography': {
            'Per Photo': { min: 100, max: 400 }
        },
        'Food Photography': {
            'Per Photo (with styling)': { min: 150, max: 400 }
        },
        'Real Estate Photography': {
            'Apartment (15-25 photos)': { min: 700, max: 1500 },
            'Villa (25+ photos)': { min: 1500, max: 3000 }
        },
        'Fashion/Lifestyle Photography': {
            'Half Day Session': { min: 1500, max: 5000 }
        },
        'Wedding Photography': {
            'Complete Package': { min: 5000, max: 25000 }
        }
    },
    videography: {
        'Event Videography': {
            'Per Hour (1 camera)': { min: 200, max: 400 },
            'Half Day (4 hours)': { min: 700, max: 1500 },
            'Full Day (8 hours)': { min: 1500, max: 3000 }
        },
        'Corporate Video': {
            'Complete Project': { min: 1500, max: 12500 }
        },
        'Promotional/Brand Video': {
            'Complete Project': { min: 5000, max: 25000 }
        },
        'Real Estate Videography': {
            'Cinematic Property Tour': { min: 500, max: 2000 }
        },
        'Wedding Videography': {
            'Complete Package': { min: 3000, max: 15000 }
        }
    },
    '360tours': {
        'Studio Apartment': {
            '360° Tour + 10-15 HD Photos': { min: 750, max: 1200 }
        },
        '1-Bedroom Apartment': {
            '360° Tour + 15-20 HD Photos': { min: 1000, max: 1500 }
        },
        '2-Bedroom Apartment': {
            '360° Tour + 20-25 HD Photos': { min: 1350, max: 2000 }
        },
        '3-Bedroom Villa': {
            '360° Tour + 25-30 HD Photos': { min: 1750, max: 2800 }
        },
        'Large Villa/Townhouse': {
            '360° Tour + 35+ HD Photos': { min: 2500, max: 5000 }
        }
    },
    timelapse: {
        'Short-Term Time-Lapse': {
            'Per Day': { min: 1200, max: 3200 }
        },
        'Construction Time-Lapse': {
            'Per Month (per camera)': { min: 3200, max: 6400 }
        },
        'Hyperlapse (Moving Time-Lapse)': {
            'Finished 15-sec Clip': { min: 1500, max: 4000 }
        },
        'Final Project Video Edit': {
            'Complete Project': { min: 2400, max: 8000 }
        }
    },
    postproduction: {
        'Photo Editing': {
            'Basic Retouching (per photo)': { min: 20, max: 50 },
            'Advanced Retouching (per photo)': { min: 50, max: 250 },
            'Photo Restoration (per photo)': { min: 100, max: 300 }
        },
        'Video Editing': {
            'Hourly Rate': { min: 150, max: 500 },
            'Per Finished Minute': { min: 500, max: 1500 },
            'Social Media Edit (15-60s)': { min: 500, max: 1500 },
            'Wedding Highlights (3-5 min)': { min: 2000, max: 5000 }
        }
    }
};

export const ADDONS_DATA = {
    photography: {
        'Second Photographer': { min: 500, max: 1500 },
        'Photo Booth Setup': { min: 1000, max: 3000 },
        'Same Day Preview': { min: 300, max: 800 },
        'Additional Hours': { min: 250, max: 500 },
        'Travel Outside Dubai': { min: 200, max: 1000 }
    },
    videography: {
        'Second Videographer': { min: 800, max: 2000 },
        'Live Streaming': { min: 1500, max: 5000 },
        'Multi-Camera Setup': { min: 1000, max: 3000 },
        'Same Day Highlights': { min: 800, max: 2000 },
        'Travel Outside Dubai': { min: 300, max: 1500 }
    },
    '360tours': {
        'Virtual Staging (per room)': { min: 300, max: 600 },
        'Floor Plan Creation': { min: 500, max: 1200 },
        'Branded Virtual Tour': { min: 800, max: 1500 },
        'Social Media Package': { min: 400, max: 800 }
    },
    timelapse: {
        'Advanced Color Grading': { min: 400, max: 1500 },
        'Motion Graphics Overlay': { min: 500, max: 2000 },
        '4K/6K Resolution Export': { min: 300, max: 800 },
        'Drone Hyperlapse': { min: 1000, max: 2500 }
    },
    postproduction: {
        'Color Grading': { min: 200, max: 800 },
        'Motion Graphics': { min: 500, max: 2000 },
        'Audio Enhancement': { min: 300, max: 1000 },
        'Subtitle Creation': { min: 200, max: 600 }
    }
};