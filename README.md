Detailed Step Breakdown
Phase 1 Steps
Step 1: Project Setup & Database

Initialize Next.js project with TypeScript
Configure Vercel Postgres
Create database tables
Set up environment variables

Step 2: Basic Map Component

Install Leaflet dependencies
Create responsive map container
Center on Los Angeles coordinates
Add OpenStreetMap tile layer

Step 3: Database Models & API Routes

Create provider/clinic API endpoints
Implement CRUD operations
Add basic error handling
Test with Postman/similar

Step 4: Provider/Clinic Pin Rendering

Fetch data from API
Render pins with custom icons
Add click handlers for selection
Implement pin clustering for performance

Step 5: Distance Calculation Engine

Implement Haversine formula
Create distance line drawing system
Add radius circle functionality
Optimize calculations for real-time updates

Step 6: Basic Toggle Controls

Create control panel UI
Implement layer visibility toggles
Add distance line toggle
Connect to map state management

Phase 2 Steps
Step 7: Filter Sliders Implementation

Create slider components
Implement "closest N" algorithms
Connect filters to map updates
Add real-time filtering

Step 8: CSV Upload System

Create file upload component
Implement CSV parsing with validation
Add geocoding with rate limiting
Batch database insertions

Step 9: Admin Interface

Create admin dashboard
Add manual entry forms
Implement delete functionality
Add bulk operations

Step 10: Polish & Error Handling

Add loading states
Implement comprehensive error handling
Add mobile responsiveness
Performance optimizations


LLM Implementation Prompts
Prompt 1: Project Foundation
Create a Next.js 14 TypeScript project for a provider-clinic mapping application. Include:

1. Initialize project with: `npx create-next-app@latest provider-clinic-map --typescript --tailwind --eslint --app`

2. Install required dependencies:
   - leaflet @types/leaflet
   - react-leaflet  
   - @vercel/postgres
   - papaparse @types/papaparse

3. Create `/lib/db.ts` with Vercel Postgres connection:
   - Export db connection using @vercel/postgres
   - Add connection error handling

4. Create database schema in `/lib/schema.sql`:
   - providers table (id, name, address, latitude, longitude, created_at)
   - clinics table (same structure)
   - Use DECIMAL(10,8) for latitude, DECIMAL(11,8) for longitude

5. Set up environment variables in `.env.local`:
   - POSTGRES_URL placeholder
   - POSTGRES_URL_NON_POOLING placeholder

6. Create basic file structure:
   - `/app/page.tsx` (main map page)
   - `/app/admin/page.tsx` (admin interface)
   - `/components/` directory
   - `/types/` directory with Provider and Clinic interfaces

Requirements:
- TypeScript strict mode
- Tailwind CSS configuration
- ESLint configuration
- Clean project structure
Prompt 2: Map Component Foundation
Building on the previous Next.js project, create the core mapping functionality:

1. Create `/components/Map.tsx`:
   - React-Leaflet MapContainer centered on Los Angeles (34.0522, -118.2437)
   - OpenStreetMap tile layer
   - Responsive container (100% viewport height minus header)
   - TypeScript interfaces for map props

2. Create `/components/MapWrapper.tsx`:
   - Client-side wrapper for Map component (use 'use client')
   - Handle dynamic import to avoid SSR issues with Leaflet
   - Loading state while map initializes

3. Update `/app/page.tsx`:
   - Import and render MapWrapper
   - Add basic page layout with header
   - Include Leaflet CSS imports

4. Create `/types/index.ts`:
   - Provider interface (id, name, address, latitude, longitude, created_at)
   - Clinic interface (same structure)
   - MapState interface for managing selected items

5. Add CSS in `/app/globals.css`:
   - Leaflet CSS imports
   - Custom map container styles
   - Responsive breakpoints

Requirements:
- Map renders correctly in browser
- No console errors
- Mobile responsive
- TypeScript types for all components
Prompt 3: Database & API Layer
Extend the project with database operations and API routes:

1. Create `/lib/database.ts`:
   - Functions: getAllProviders(), getAllClinics(), addProvider(), addClinic()
   - Use prepared statements for security
   - Include error handling and logging
   - Return typed results using Provider/Clinic interfaces

2. Create API routes:
   - `/app/api/providers/route.ts` (GET, POST)
   - `/app/api/providers/[id]/route.ts` (DELETE)
   - `/app/api/clinics/route.ts` (GET, POST)
   - `/app/api/clinics/[id]/route.ts` (DELETE)

3. API route implementations:
   - GET: Return all records with error handling
   - POST: Validate input, insert record, return created item
   - DELETE: Remove by ID, return success/error status
   - Proper HTTP status codes (200, 201, 400, 500)

4. Create `/lib/api.ts`:
   - Client-side functions to call API routes
   - fetchProviders(), fetchClinics(), createProvider(), createClinic(), deleteProvider(), deleteClinic()
   - Use fetch with proper error handling
   - TypeScript return types

5. Add validation:
   - Input validation for name (required, max 255 chars)
   - Address validation (required)
   - Coordinate validation (optional, valid lat/lng ranges)

Requirements:
- All API routes functional via Postman/curl
- Proper error responses
- TypeScript throughout
- SQL injection protection
Prompt 4: Pin Rendering System
Add provider and clinic visualization to the map:

1. Create `/components/ProviderPin.tsx`:
   - Custom Leaflet marker for providers (blue circle icon)
   - Click handler to select/deselect provider
   - Popup showing provider name and address
   - Props: provider data, isSelected state, onClick handler

2. Create `/components/ClinicPin.tsx`:
   - Custom Leaflet marker for clinics (red square icon)
   - Similar functionality to ProviderPin
   - Different icon/color to distinguish from providers

3. Create `/lib/icons.ts`:
   - Custom Leaflet icon definitions
   - Blue circle icon for providers
   - Red square icon for clinics
   - Consistent sizing (20x20px)

4. Update `/components/Map.tsx`:
   - Add state for providers, clinics, selectedProvider, selectedClinic
   - useEffect to fetch data on mount
   - Render ProviderPin and ClinicPin components
   - Handle pin selection logic

5. Create `/hooks/useMapData.ts`:
   - Custom hook for fetching and managing map data
   - Loading states for providers and clinics
   - Error handling for failed API calls
   - Refresh functions for data updates

6. Update `/types/index.ts`:
   - Add MapState interface with selected items
   - PinProps interfaces for provider/clinic pins

Requirements:
- Pins render correctly on map
- Click interactions work
- Different visual styles for providers vs clinics
- Loading states while fetching data
- Error handling for API failures
Prompt 5: Distance Calculation Engine
Implement distance calculations and visual distance indicators:

1. Create `/lib/distance.ts`:
   - Haversine formula function: calculateDistance(lat1, lon1, lat2, lon2)
   - Return distance in miles with 2 decimal precision
   - Unit conversion helper (miles/kilometers toggle)
   - Validate coordinate inputs

2. Create `/components/DistanceLine.tsx`:
   - Leaflet Polyline component connecting two points
   - Props: startPoint, endPoint, color, weight
   - Conditional rendering based on selection state
   - Distance label at midpoint of line

3. Create `/components/RadiusCircle.tsx`:
   - Leaflet Circle component around clinic
   - Props: center, radius (in miles), color, opacity
   - Convert miles to meters for Leaflet circle
   - Toggle visibility based on control state

4. Update `/components/Map.tsx`:
   - Add distance calculation when provider and clinic selected
   - Render DistanceLine between selected items
   - Manage radius circle state for clinics
   - Display distance in UI control panel

5. Create `/lib/mapUtils.ts`:
   - Helper functions for map calculations
   - Convert miles to meters for Leaflet
   - Find closest items algorithms
   - Batch distance calculations for filtering

6. Add distance display to UI:
   - Show calculated distance when items selected
   - Format distance with units
   - Clear distance when selection changes

Requirements:
- Accurate Haversine distance calculations
- Visual distance lines render correctly
- Radius circles show properly
- Distance updates in real-time with selections
- Performance optimized for multiple calculations
Prompt 6: Control Panel & Toggles
Create the control panel with visibility toggles and basic filters:

1. Create `/components/ControlPanel.tsx`:
   - Fixed position panel (top-right of map)
   - Collapsible/expandable design
   - Sections: Visibility, Filters, Distance Tools
   - Clean, minimal UI with Tailwind CSS

2. Create `/components/VisibilityControls.tsx`:
   - Individual checkboxes for each provider (by name)
   - Individual checkboxes for each clinic (by name)
   - "Show All Providers" / "Hide All Providers" toggles
   - "Show All Clinics" / "Hide All Clinics" toggles
   - Distance lines toggle
   - Radius circles toggle

3. Create `/hooks/useMapControls.ts`:
   - State management for all toggle controls
   - Functions: toggleProvider, toggleClinic, toggleDistanceLines, etc.
   - Bulk toggle functions (show/hide all)
   - State persistence in localStorage

4. Update `/components/Map.tsx`:
   - Connect to useMapControls hook
   - Filter visible pins based on toggle states
   - Show/hide distance lines based on toggle
   - Show/hide radius circles based on toggle

5. Create `/components/ToggleButton.tsx`:
   - Reusable toggle component
   - Props: label, checked state, onChange handler
   - Consistent styling across all toggles
   - Accessibility attributes

6. Add keyboard shortcuts:
   - 'P' to toggle all providers
   - 'C' to toggle all clinics
   - 'D' to toggle distance lines
   - 'R' to toggle radius circles

Requirements:
- All toggles function correctly
- UI updates immediately when toggles change
- Persistent state across page refreshes
- Keyboard shortcuts work
- Mobile-responsive control panel
Prompt 7: Advanced Filter Sliders
Implement proximity-based filtering with slider controls:

1. Create `/components/FilterSliders.tsx`:
   - "Show closest [N] clinics to selected provider" slider (1-12)
   - "Show closest [N] providers to selected clinic" slider (1-12)
   - Real-time value display
   - Reset buttons for each slider

2. Create `/lib/proximityFilter.ts`:
   - findClosestClinics(provider, allClinics, count) function
   - findClosestProviders(clinic, allProviders, count) function
   - Sort by distance using calculateDistance function
   - Return array of closest items with distances

3. Create `/hooks/useProximityFilter.ts`:
   - State for slider values (closestClinicsCount, closestProvidersCount)
   - State for filtered results
   - useEffect to recalculate when selections or slider values change
   - Performance optimization with useMemo/useCallback

4. Update `/components/Map.tsx`:
   - Integrate proximity filtering with existing visibility toggles
   - Show only filtered pins when provider/clinic selected and slider active
   - Highlight filtered pins differently (brighter colors)
   - Display count of visible items

5. Create `/components/SliderControl.tsx`:
   - Reusable slider component with label and value display
   - Props: min, max, value, onChange, label, unit
   - Tailwind styling for consistent appearance
   - Touch-friendly for mobile

6. Add filter indicators:
   - Show active filter count in control panel
   - Visual indication when filters are applied
   - Clear all filters button
   - Filter status in pin popups (e.g., "3rd closest clinic")

Requirements:
- Sliders update filtering in real-time
- Performance remains smooth with 100+ pins
- Filtered pins visually distinct from unfiltered
- Filter state resets appropriately when selections change
- Mobile touch interactions work properly
Prompt 8: CSV Upload System
Build the CSV upload functionality with geocoding:

1. Create `/components/CSVUpload.tsx`:
   - File input for CSV files
   - Drag-and-drop interface
   - File validation (CSV only, max 5MB)
   - Upload progress indicator
   - Preview of parsed data before submission

2. Create `/lib/csvParser.ts`:
   - Parse CSV using papaparse
   - Validate required columns (name, address)
   - Data cleaning (trim whitespace, validate formats)
   - Error reporting for invalid rows
   - Return parsed data with validation status

3. Create `/lib/geocoding.ts`:
   - Nominatim API integration with rate limiting (1 request/second)
   - geocodeAddress(address) function returning lat/lng
   - Retry logic for failed requests
   - Queue system for batch geocoding
   - Progress callback for UI updates

4. Create `/app/api/upload-csv/route.ts`:
   - POST endpoint for CSV uploads
   - Parse uploaded file
   - Geocode addresses with rate limiting
   - Batch insert to database
   - Return detailed results (success/failure counts)

5. Create `/components/UploadProgress.tsx`:
   - Progress bar for geocoding operations
   - Status messages (parsing, geocoding, saving)
   - Success/error summary
   - Failed rows display with error reasons

6. Add to admin interface:
   - CSV upload section
   - Template download (with proper headers)
   - Upload history/logs
   - Bulk operations status

Requirements:
- Handle large CSV files (500+ rows) efficiently
- Respect Nominatim rate limits
- Graceful error handling for geocoding failures
- Clear progress feedback to users
- Ability to retry failed geocoding attempts
- Validation prevents duplicate entries
Prompt 9: Admin Interface
Create comprehensive admin dashboard for data management:

1. Create `/app/admin/page.tsx`:
   - Admin dashboard layout
   - Navigation tabs: Add Data, Manage Data, Upload CSV, Settings
   - Statistics overview (total providers, clinics, recent additions)
   - Quick action buttons

2. Create `/components/admin/AddProviderForm.tsx`:
   - Form for manual provider entry
   - Fields: name (required), address (required), coordinates (optional)
   - Real-time validation
   - Geocoding on address blur if coordinates empty
   - Success/error feedback

3. Create `/components/admin/AddClinicForm.tsx`:
   - Similar to AddProviderForm but for clinics
   - Same validation and geocoding logic
   - Consistent UI patterns

4. Create `/components/admin/DataTable.tsx`:
   - Generic table component for providers/clinics
   - Sortable columns (name, address, created date)
   - Search/filter functionality
   - Pagination (20 items per page)
   - Delete actions with confirmation

5. Create `/components/admin/BulkActions.tsx`:
   - Select all/none functionality
   - Bulk delete with confirmation
   - Export selected items to CSV
   - Bulk geocoding for items missing coordinates

6. Create `/hooks/useAdminData.ts`:
   - Data fetching and management for admin interface
   - CRUD operations with optimistic updates
   - Search and filtering logic
   - Pagination state management

7. Add admin navigation:
   - Breadcrumb navigation
   - Link back to main map view
   - Admin-only route protection (basic)

Requirements:
- All CRUD operations work correctly
- Search and filtering perform well
- Pagination handles large datasets
- Bulk operations provide clear feedback
- Forms validate properly and show helpful errors
- Responsive design for tablet/desktop use
Prompt 10: Polish & Production Ready
Final polish, error handling, and production optimizations:

1. Add comprehensive error boundaries:
   - `/components/ErrorBoundary.tsx` for React errors
   - API error handling with user-friendly messages
   - Graceful degradation when services unavailable
   - Error logging for debugging

2. Create loading states:
   - `/components/LoadingSpinner.tsx` component
   - Skeleton loading for data tables
   - Map loading states
   - Button loading states during operations

3. Add responsive design improvements:
   - Mobile-first approach for all components
   - Touch-friendly controls on mobile
   - Responsive control panel (bottom sheet on mobile)
   - Optimized map interactions for touch

4. Performance optimizations:
   - Implement pin clustering for large datasets
   - Debounce search inputs
   - Lazy loading for admin data tables
   - Memoization for expensive calculations
   - Bundle size optimization

5. Add accessibility features:
   - ARIA labels for all interactive elements
   - Keyboard navigation for map controls
   - Focus management in modals
   - Screen reader announcements for dynamic updates

6. Create `/lib/constants.ts`:
   - Configuration constants
   - Default map settings
   - API rate limits
   - UI breakpoints

7. Add environment validation:
   - Startup checks for required environment variables
   - Graceful fallbacks for missing configs
   - Development vs production behavior

8. Final testing checklist:
   - All API endpoints work correctly
   - Map interactions function properly
   - CSV upload handles edge cases
   - Admin interface CRUD operations
   - Mobile responsiveness
   - Error handling scenarios

Requirements:
- Production-ready error handling
- Smooth performance with 1000+ data points
- Fully responsive across all device sizes
- Accessible to users with disabilities
- Comprehensive loading states
- No console errors or warnings

Critical Integration Notes:
Each prompt builds on previous work. Test thoroughly after each step. The final application should have:

Zero orphaned code
Complete feature integration
Production-ready performance
Comprehensive error handling

Deployment: Use Vercel for both hosting and database. Ensure environment variables are properly configured in production.