# Intelligent Feedback Platform

A serverless feedback analysis platform that collects user feedback, enriches it with AI-powered sentiment analysis, and provides a real-time analytics dashboard with automated alerts for negative feedback.
The system uses an event-driven architecture built entirely on managed cloud services.

![alt](https://private-user-images.githubusercontent.com/141355805/562828011-cf719df3-00ba-4969-86b1-09c2a6436baf.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzMzOTg5OTEsIm5iZiI6MTc3MzM5ODY5MSwicGF0aCI6Ii8xNDEzNTU4MDUvNTYyODI4MDExLWNmNzE5ZGYzLTAwYmEtNDk2OS04NmIxLTA5YzJhNjQzNmJhZi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMzEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDMxM1QxMDQ0NTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zM2Y2YTQ5ZDViMmJlNDM0NzVmMGI3MGE0ZDM4ZmVmMDFiNTY5NjdkOWYwNDU4ZmM3MmYxYjRkZTc4YTFjMzk5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.DeSXVg3RYnWW2YVQjXZY9CcFhYhQNu40CPN5q_RRcK4)

## Features

* Collect feedback through a web interface

* Automatically analyze sentiment using AI

* Real-time admin dashboard with charts and analytics

* Automatic alerts for negative feedback

* Fully serverless and event-driven architecture

* Multi-account AI microservice integration

## Architechture Overview

![alt](https://private-user-images.githubusercontent.com/141355805/562788885-32d317ca-f5f6-40f2-bbcb-733764705d92.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzMzODEyODMsIm5iZiI6MTc3MzM4MDk4MywicGF0aCI6Ii8xNDEzNTU4MDUvNTYyNzg4ODg1LTMyZDMxN2NhLWY1ZjYtNDBmMi1iYmNiLTczMzc2NDcwNWQ5Mi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMzEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDMxM1QwNTQ5NDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04NjE1ZmM1NTI5Y2ViMjJlMWE4Nzc0NmQzODgzZWY2M2VlMjkyZDY5N2UxN2VhNTUwNmZkOTg5NDUzNmMyZDRmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.GTervwiLkYTS5RCfQM8Va9t0qY6svmC-VbT-tRuOoFE)

## Services Used

* AWS Lambda

* Amazon API Gateway

* Amazon DynamoDB

* DynamoDB Streams

* Amazon SNS

* Amazon Comprehend

* Amazon S3 (static frontend hosting)

## How It Works
#### 1. Feedback Submission

Users submit feedback through the frontend form. The data is sent to an API endpoint managed by API Gateway.

#### 2. Data Storage

A Lambda function validates the request and stores the feedback in DynamoDB.

#### 3. Stream Trigger

DynamoDB Streams detects the new record and triggers a processing Lambda.

#### 4. Sentiment Analysis

The enrichment Lambda sends the feedback text to a sentiment analysis microservice powered by Amazon Comprehend.

#### 5. Data Enrichment

The sentiment result is written back to the original DynamoDB record.

#### 6. Alert System

If the sentiment is negative and the rating is low, an SNS alert is triggered and an email notification is sent.

#### 7. Dashboard

The admin dashboard fetches data from secured API endpoints and visualizes analytics using charts.

## Frontend
![alt](https://private-user-images.githubusercontent.com/141355805/562826012-d08ce840-c3de-4793-8c8e-339566e63efb.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzMzODU0MzksIm5iZiI6MTc3MzM4NTEzOSwicGF0aCI6Ii8xNDEzNTU4MDUvNTYyODI2MDEyLWQwOGNlODQwLWMzZGUtNDc5My04YzhlLTMzOTU2NmU2M2VmYi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMzEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDMxM1QwNjU4NTlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iOWRkNDcwYmE2NGU4NmIxNWFmODg2OTIyYTVmNzY2ODczMjMzOWFjYzBiYzg4OWIzYzZhYzY5ZDRlZDc0YjU2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.wLMKH0nIa-aSaCTEvrAgI2xdbwDxlP6Ddpytvit9osE)

### The admin dashboard is built with:

* React

* TailwindCSS

* Chart visualizations

### It displays:

* Total feedback count

* Sentiment distribution

* Category analytics

* Feedback table

### Authentication is handled through Amazon Cognito.


## Backend

The backend uses serverless functions.

### Lambda Functions

Ingest Lambda
Handles feedback submissions and writes them to DynamoDB.

Enrichment Lambda
Triggered by DynamoDB Streams. Performs sentiment analysis and publishes alerts.

Sentiment Microservice
Hosted in a separate AWS account to run Amazon Comprehend.

## Deployment
### Frontend

The frontend can be deployed using static hosting:

* Amazon S3

* CloudFront (optional)

Build command:

```sh
 npm run build
```

### Backend

Deploy Lambda functions and configure API Gateway routes.

Required API endpoints:
```sh
POST /feedback
GET  /admin/feedback
GET  /admin/stats
```

### Environment Configuration

Example configuration values:
```sh
API_URL=https://your-api.execute-api.ap-south-1.amazonaws.com
COGNITO_DOMAIN=https://your-domain.auth.ap-south-1.amazoncognito.com
CLIENT_ID=your-client-id
REDIRECT_URI=http://localhost:5173/dashboard
```

### Example Feedback Record
```json
{
 "feedback_id": "abc123",
 "name": "John",
 "rating": 1,
 "category": "Support",
 "message": "The service is terrible",
 "sentiment": "NEGATIVE",
 "created_at": "2026-03-11T15:00:00Z"
}
```

### Example Alert Email

Subject
```sh
Negative Customer Feedback Alert
```
Body
```sh
Name: John
Rating: 1
Category: Support
Message: The service is terrible
```