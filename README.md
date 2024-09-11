# Care Sync

Care Sync is an AI-driven platform revolutionizing insurance services with personalized health plans, efficient claims processing, and transparent pricing.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Challenges Addressed](#challenges-addressed)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- 
## Project Overview

Care Sync leverages real-time data, a user-friendly chat assistant, and secure prescription storage to streamline the insurance experience. Our platform ensures users have tailored coverage and quick, accurate claim settlements.

## Features

- 🧠 **Personalized Insurance Plans** with Generative AI
- 💬 **Chat Assistant** for Plan Navigation
- ⚡ **Automated Claim Validation** and Processing
- 💰 **Transparent Pricing Models**
- 💊 **Prescription Management**
- 🏥 **Personalized Health Plans**

## Challenges Addressed

- Lack of Personalization in Insurance
- Data Silos and Fragmentation
- Complex and Opaque Pricing Models
- Delayed Claims Processing
- Rising Healthcare Costs
- User Unawareness of Plan Details

## Tech Stack

- **Front-End:** React.js
- **Back-End:** Python with Flask
- **Database:** Azure SQL Database & MySQL
- **AI/ML:** Ensemble Model, Regression Model, Voting Classifier, SHAP
- **Cloud:** Azure Cloud
- **Authentication:** Azure Active Directory
- **Storage:** Azure Blob Storage

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repo
   ```sh
   git clone https://github.com/VigneshKrish16/CareSync.git
   ```
2. Install NPM packages for the front-end
   ```sh
   cd frontend
   npm install
   ```
3. Install Python dependencies for the back-end
   ```sh
   cd backend
   pip install -r requirements.txt
   ```
4. Set up your Azure resources and update the configuration files

For more detailed instructions, please refer to our [Setup Guide](docs/SETUP.md).

## Project Structure

```
caresync/
│
├── frontend/          # React.js front-end
├── backend/           # Python Flask back-end
├── ml_models/         # AI/ML model scripts
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
