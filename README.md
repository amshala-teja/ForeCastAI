
# Solar and Wind Energy Prediction

## Overview

This project is a React-based UI for a renewable energy prediction application. It enables users to input project details, select energy generation options (solar or wind), upload CSV data for actual values, and submit data to a backend API for solar power prediction. The results are displayed as an image plot.

## Features

Google Maps Integration: Users can input latitude and longitude to set their project location.

Energy Option Selection: Users can choose between Solar and Wind energy.

Solar Data Input Fields: Includes parameters like tilt angle, system size, AC/DC ratio, azimuth angle, inverter efficiency, losses, array type, and ground coverage ratio (GCR).

CSV File Upload: Users can upload CSV files containing actual energy data.

API Integration: Submits user input data to a backend API to generate a solar power prediction.

Image Rendering: Displays the prediction plot image after a successful API response.

Loading and Error Handling: Provides appropriate UI feedback during API calls.

## Technologies Used

React.js: Frontend framework

Tailwind CSS: Styling framework

Papaparse: CSV file parsing

Axios: HTTP requests to the backend API

Google Maps API: Integration for location-based input

## Installation

### Clone the repository:

git clone https://github.com/your-repo.git
cd your-repo

### Install dependencies:

npm install

### Start the development server:

npm start

## Usage

Enter latitude and longitude for the project location.

Select "Solar" or "Wind" as needed.

If "Solar" is selected, input the relevant parameters.

Optionally, upload a CSV file for actual solar energy data.

Click "Submit" to send data to the backend API.

View the generated solar power prediction plot.

## API Endpoints

POST /solarclient/generate-prediction/: Submits project details and retrieves prediction results.

GET /solarclient/image/?image_key=: Fetches the generated solar power prediction plot.

## Author

### SaiTeja Amshala