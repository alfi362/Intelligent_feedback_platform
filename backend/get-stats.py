import json
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("FeedbackTable")

def handler(event, context):

    response = table.scan()
    items = response.get("Items", [])

    total = len(items)

    positive = len([i for i in items if i.get("sentiment") == "POSITIVE"])
    negative = len([i for i in items if i.get("sentiment") == "NEGATIVE"])

    return {
        "statusCode": 200,
        "body": json.dumps({
            "total": total,
            "positive": positive,
            "negative": negative
        })
    }