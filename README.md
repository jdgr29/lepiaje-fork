# Le Piaje

Add a description about Le Piaje which is meaningful to describe the project

## Tech Stack

To-do

## Environment Variables

`NEXT_PUBLIC_BASE_URL`
The project's current base url wether it is development or production

`DB_CONNECTION_STRING`
The mongodb connection string Example: mongodb+srv://[dbusername]:[dbpasswor]@[cluster].[appid].mongodb.net/[datanasename]?retryWrites=true&w=majority

`NEXT_PUBLIC_SENDER_EMAIL`
the email from which users will received notifications, normally the email that is provided from the domain

`NEXT_PUBLIC_WHATSAPP_NUMBER`
the whatsapp number users will be taking to chat with once clicked the whatsapp button on the page

`RESEND_API_KEY`=
The api key(free) from resend service to send emails, now at 1000 emails a month

`ADMIN_EMAIL_ONE_RECEIVER`
This email won't be used to send emails to clients, but instead, it will be used to notify the administrator of the page when a client has performed an operation such as a booking, cancellation or purchase

`ADMIN_EMAIL_TWO_RECEIVER`
This email won't be used to send emails to clients, but instead, it will be used to notify the administrator of the page when a client has performed an operation such as a booking, cancellation or purchase

`STRIPE_API_KEY`
stripe api key that will handle the payments of the app 

square brackets [] are only to make it more readable and they are not necessary when writing the actual string

`NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`
the access token provided with a mapbox free account to access map features and styles
