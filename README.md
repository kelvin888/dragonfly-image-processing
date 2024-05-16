# Dragonfly Image Processing

## Introduction

 Dragonfly provides clients with several image-processing APIs designed to generate predictive analytics for visual assets. The API supports the uploading of large files via AWS S3 pre-signed URLs.

## Project Overview

The goal is to stage a file in S3 using a pre-signed URL, start the image processing, and check the status of the job.

## Features

- Generate pre-signed URLs for file uploads
- Stage files in AWS S3
- Start image processing
- Check the status of processing tasks
- Handle multiple uploads and concurrency
- Error handling and user notifications

## Technologies Used

- React(NextJS)
- Axios
- React Query
- React Toastify
- TypeScript
- Tailwind

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/kelvin888/dragonfly-image-processing.git
    cd dragonfly-image-processing
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory with the following content:
    ```env
    NEXT_PUBLIC_DRAGONFLY_SERVICE_ENDPOINT=[endpoint-here]
    NEXT_PUBLIC_DRAGONFLY_API_KEY=[API key]
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

