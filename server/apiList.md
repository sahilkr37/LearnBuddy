# apiRouters

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- DELETE /profile/delete
- PATCH /profile/password

## connectionRequestRouter

<!-- status-ignored/interested -->

- POST /request/send/:status/:userId

<!-- status-accepted/rejected -->

- POST /request/review/:status/:requestId

## userRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed- Gets you the profiles of other users on platform

Status: ignore, interested,accepted, rejected
