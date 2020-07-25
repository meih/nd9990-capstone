
# Food Review App

This is a capstone project for Udacity Cloud Developer Nanodgree.

## Functionality of the application

This application will allow creating/removing/updating/fetching Food Review items.

Each user can:
* View all food review items including the ones other people have created

And once logged in, he/she can:
* Post a new food review
* Edit/Delete Food Review items that he/she has created

## API endpoints

| Functionality | Method | Endpoint |
|---|---|---|
| Get Food Reviews | GET | https://iyho77q7o7.execute-api.us-east-1.amazonaws.com/dev/review |
| Post a Food Review | POST | https://iyho77q7o7.execute-api.us-east-1.amazonaws.com/dev/review |
| Update a Food Review | PATCH | https://iyho77q7o7.execute-api.us-east-1.amazonaws.com/dev/review/{foodReviewId} |
| Delete a Food Review | DELETE | https://iyho77q7o7.execute-api.us-east-1.amazonaws.com/dev/review/{foodReviewId} |
| Generate a signed URL for image upload | POST | https://iyho77q7o7.execute-api.us-east-1.amazonaws.com/dev/review/{foodReviewId}/attachment |

## Lambda functions
* Auth: food-review-app-dev-Auth
* GetFoodReview: food-review-app-dev-GetFoodReview
* CreateFoodReview: food-review-app-dev-CreateFoodReview
* UpdateFoodReview: food-review-app-dev-UpdateFoodReview
* DeleteFoodReview: food-review-app-dev-DeleteFoodReview
* GenerateUploadUrl: food-review-app-dev-GenerateUploadUrl

## Technology stack
* Frontend: Nuxt.js with Vuetify
* Backend: AWS API Gateway & Lambda
* Datastore: AWS DynamoDB
* Object storage (for images): AWS S3
* Authentication: Auth0
* Deployment: Serverless framework
