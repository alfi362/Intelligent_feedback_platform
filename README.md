# AI-Driven Feedback Analysis Platform

A fully serverless, event-driven feedback collection and analysis system. Users submit feedback through a web interface; the platform automatically analyzes sentiment using AI, stores enriched results, and alerts administrators in real time when negative feedback is detected.

## Architecture

- **Amazon S3** — hosts the static frontend (React + TailwindCSS)
- **Amazon API Gateway** — REST endpoints for feedback submission and admin dashboard
- **AWS Lambda** — serverless compute for ingestion, enrichment, and alerting
- **Amazon DynamoDB + DynamoDB Streams** — feedback storage with stream-based event triggers
- **Amazon Comprehend** — NLP sentiment analysis (cross-account microservice integration)
- **Amazon SNS + SES** — automated email alerts for negative feedback
- **Amazon Cognito** — admin dashboard authentication

## How It Works

1. User submits feedback via the frontend form
2. API Gateway routes request to the **Ingest Lambda**, which stores it in DynamoDB
3. **DynamoDB Streams** detects the new record and triggers the **Enrichment Lambda**
4. Enrichment Lambda calls a **cross-account Comprehend microservice** via API Gateway and writes the sentiment result back to DynamoDB
5. If sentiment is `NEGATIVE` and rating ≤ 2, an **SNS alert triggers an SES email** to the admin
6. Admin dashboard fetches enriched data via secured API endpoints and visualizes it with charts

## Cross-Account Integration

To work within AWS free-tier constraints, Amazon Comprehend runs in a separate AWS account exposed via API Gateway. The enrichment Lambda calls this endpoint and processes the returned sentiment — demonstrating real-world cross-account service integration.

## Admin Dashboard Features

- Total feedback count
- Sentiment distribution (Positive / Neutral / Negative)
- Category-level analytics
- Full feedback table with sentiment labels
- Automatic email alerts for critical negative feedback

## Tech Stack

`AWS Lambda` `API Gateway` `DynamoDB` `DynamoDB Streams` `Amazon Comprehend` `SNS` `SES` `Cognito` `S3` `React` `TailwindCSS` `Python` `JavaScript`
