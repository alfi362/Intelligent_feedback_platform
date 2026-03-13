import json
import boto3
import urllib.request


dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("FeedbackTable")

sns = boto3.client("sns")

SENTIMENT_API = "https://cl8wfj3438.execute-api.ap-south-1.amazonaws.com/sentiment"
SNS_TOPIC_ARN = "arn:aws:sns:ap-south-1:762397612134:negative-feedback"

def lambda_handler(event, context):

    for record in event["Records"]:

        if record["eventName"] != "INSERT":
            continue

        item = record["dynamodb"]["NewImage"]

        feedback_id = item["feedback_id"]["S"]
        message = item["message"]["S"]
        rating = int(item["rating"]["N"])
        name = item["name"]["S"]
        category = item["category"]["S"]

        # Call sentiment API
        req = urllib.request.Request(
            SENTIMENT_API,
            data=json.dumps({"text": message}).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST"
        )

        with urllib.request.urlopen(req) as res:
            result = json.loads(res.read().decode())

        sentiment = result["sentiment"]

        # Update DynamoDB
        table.update_item(
            Key={"feedback_id": feedback_id},
            UpdateExpression="SET sentiment = :s",
            ExpressionAttributeValues={
                ":s": sentiment
            }
        )

        # Send SNS alert if negative
        if sentiment == "NEGATIVE" and rating <= 2:

            sns.publish(
                TopicArn=SNS_TOPIC_ARN,
                Subject="Negative Customer Feedback Alert",
                Message=json.dumps({
                    "feedback_id": feedback_id,
                    "name": name,
                    "rating": rating,
                    "category": category,
                    "message": message
                }, indent=2)
            )

    return {"statusCode": 200}