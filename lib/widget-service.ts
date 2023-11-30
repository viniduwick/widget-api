import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda-nodejs";

export class WidgetService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const bucket = new s3.Bucket(this, "WidgetBucket");

    const widgetHandler = new lambda.NodejsFunction(this, "widget-handler", {
      description: "handle queries for widgets",
      entry: "src/handler/widget.ts",
      functionName: "widgetHandler",
      handler: "handler$",
      environment: {
        BUCKET: bucket.bucketName,
      },
    });

    bucket.grantReadWrite(widgetHandler);

    const api = new apigateway.RestApi(this, "widget-api", {
      restApiName: "Widget API",
      description: "This servers widgets",
    });

    const getWidgetsIntegration = new apigateway.LambdaIntegration(
      widgetHandler,
      {
        requestTemplates: {
          "application/json": '{"statusCode": "200}',
        },
      }
    );

    api.root.addMethod("GET", getWidgetsIntegration);
  }
}
