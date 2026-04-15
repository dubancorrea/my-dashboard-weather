AstroDash: NYC Weather Insights
Submitted by: Duban Correa G


AstroDash is a futuristic, space-themed weather dashboard designed for New York City. By leveraging the WeatherBit API, users can explore a 16-day forecast, search for specific atmospheric conditions, and filter results by temperature ranges to uncover trends in local climate data through a glassmorphism interface.

Time spent: 6 hours spent in total

Required Features
The following required functionality is completed:

[x] API Fetching: The site has a dashboard displaying a list of data fetched using an API call with useEffect and the WeatherBit 16-day forecast endpoint.

[x] Unique Items: The dashboard displays 16 unique forecast days, rendered one per row.

[x] Row Attributes: Each row includes specific weather metrics: Date, Temperature, and Condition Description.

[x] Summary Statistics: The dashboard includes four summary statistics: Location Identity, Average Temperature, Maximum Precipitation, and a Weather Phase indicator.

[x] Search Functionality: A search bar allows the user to search for a specific weather condition (e.g., "Clouds", "Clear") in the fetched data.

[x] Dynamic Search: The search bar correctly filters items in the list when the user interacts with the search trigger.

[x] Category Filtering: A dropdown filter allows the user to restrict displayed items by temperature categories (Warm > 15°C vs. Cool ≤ 15°C).

[x] Attribute Restriction: The filter restricts items using the Temperature attribute, distinct from the condition-based search bar.

[x] Dynamic Filtering: The dashboard list and charts update as the user adjusts the filter selection.

The following stretch features are implemented:

[x] Simultaneous Filtering: Multiple filters (Search and Temperature) can be applied at the same time to narrow down specific data points.

[x] Data Visualization: Integrated Recharts (Line and Bar charts) to provide a visual representation of temperature trends and precipitation levels.

[x] Detail View: Implemented dynamic routing using react-router-dom to allow users to click into a specific day for more detailed atmospheric analysis.

Video Walkthrough
Here's a walkthrough of implemented required features:

<img src="public/walkWeatherNYC.gif" title="AstroDash Walkthrough" width="" alt="Video Walkthrough" />

GIF created with ScreenToGif

Notes
The most significant challenge in this project was managing state for simultaneous filtering. Ensuring that the search query and the temperature dropdown both updated the same filteredData state required a synchronized useEffect hook. Additionally, creating the "Astro" aesthetic involved implementing glassmorphism in CSS, which required balancing backdrop-filter for readability against a complex fixed-background space nebula. Troubleshooting API connectivity issues early on also led to more robust error handling in the data-fetching logic.

License
Copyright 2026 Duban Correa

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
.