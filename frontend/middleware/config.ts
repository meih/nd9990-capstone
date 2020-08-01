const foodApiId = process.env.FOOD_API_ID
export const apiEndpoint = `https://${foodApiId}.execute-api.us-east-1.amazonaws.com/dev`

// We don't need this part anymore, as we use nuxt auth module
//
// export const authConfig = {
//   // TODO: Create an Auth0 application and copy values from it into this map
//   domain: process.env.AUTH0_DOMAIN,            // Auth0 domain
//   clientId: process.env.AUTH0_CLIENT_ID,          // Auth0 client id
//   callbackUrl: process.env.AUTH0_CALLBACK_URL
// }
