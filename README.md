
# Food Review App

This is a capstone project for Udacity Cloud Developer Nanodgree.

## API endpoints
* GET - https://iyho77q7o7.execute-api.us-east-1.amazonaws.com/dev/review
* POST - https://iyho77q7o7.execute-api.us-east-1.amazonaws.com/dev/review
* PATCH - https://iyho77q7o7.execute-api.us-east-1.amazonaws.com/dev/review/{foodReviewId}
* DELETE - https://iyho77q7o7.execute-api.us-east-1.amazonaws.com/dev/review/{foodReviewId}
* POST - https://iyho77q7o7.execute-api.us-east-1.amazonaws.com/dev/review/{foodReviewId}/attachment

## Lambda functions
* Auth: food-review-app-dev-Auth
* GetFoodReview: food-review-app-dev-GetFoodReview
* CreateFoodReview: food-review-app-dev-CreateFoodReview
* UpdateFoodReview: food-review-app-dev-UpdateFoodReview
* DeleteFoodReview: food-review-app-dev-DeleteFoodReview
* GenerateUploadUrl: food-review-app-dev-GenerateUploadUrl

## Technology stack
* Frontend: Nuxt.js, Vuetify
* Backend: AWS Lambda
* Datastore: AWS DynamoDB
* Deployment: Serverless framework
