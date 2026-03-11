import json
import boto3
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)
dynamodb = boto3.client('dynamodb', region_name='ap-south-1')

def lambda_handler(event, context):
    logger.info("Stream event received: " + json.dumps(event))

    for record in event.get('Records', []):
        if record.get('eventName') == 'INSERT':
            try:
                new_item = record['dynamodb']['NewImage']
                feedback_id = new_item['feedback_id']['S']
                message = new_item.get('message', {}).get('S', '').lower()
                sentiment_label = "NEUTRAL"
                negative_words = ["bad", "worst", "terrible", "hate", "broken", "awful", "frustrated", "poor"]
                positive_words = ["good", "great", "excellent", "love", "awesome", "amazing", "best"]

                if any(word in message for word in negative_words):
                    sentiment_label = "NEGATIVE"
                elif any(word in message for word in positive_words):
                    sentiment_label = "POSITIVE"
                dynamodb.update_item(
                    TableName="FeedbackTable",
                    Key={
                        'feedback_id': {'S': feedback_id}
                    },
                    UpdateExpression="SET sentiment = :s, #status = :st",
                    ExpressionAttributeNames={
                        "#status": "status"
                    },
                    ExpressionAttributeValues={
                        ":s": {'S': sentiment_label},
                        ":st": {'S': "ANALYZED"}
                    }
                )
                logger.info(f"Success! Analyzed {feedback_id} as {sentiment_label}")

            except Exception as e:
                logger.error(f"Error processing stream record: {str(e)}")

    return {
        'statusCode': 200,
        'body': json.dumps('Stream processed successfully')
    }