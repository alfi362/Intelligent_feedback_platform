import json
import uuid
import boto3
from datetime import datetime

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("FeedbackTable")

def lambda_handler(event, context):

    body = json.loads(event["body"])

    feedback_id = str(uuid.uuid4())

    item = {
        "feedback_id": feedback_id,
        "name": body.get("name"),
        "rating": body.get("rating"),
        "category": body.get("category"),
        "message": body.get("message"),
        "sentiment": "PENDING",
        "created_at": datetime.utcnow().isoformat()
    }

    table.put_item(Item=item)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Feedback submitted"
        })
    }