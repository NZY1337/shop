# Verification
- verificationToken: 
    - when users creates the account, a verification token is sent on his mail
    - a FE link is sent on his mail with the validation token and he needs to activate the account by clicking the link

- isVerified: 
    - isVerified = true after accessing the link

- verified (type Date):
    - after the user clicks on the FE link, verified = new Date() - to track the time when the accound was first verified

# 1 - SignUp API Summary
- Endpoint: POST localhost:3005/api/auth/signUp

- Request Body:
    - email: string (required)
    - password: string (required)
    - name: string (required)

- Key Steps:
    - Validate input data.
        - Check if the user with the provided email already exists.
        - If not, create a new user with hashed password and a verification token.
        - Send a verification email with the token.
        - Store a JWT token in a cookie for session tracking.

    - Response:
        - 200 OK: "Please check your email to verify account."
        - 400 Bad Request: If user already exists.
        - Security: Passwords are hashed, and a verification token is used for account activation.

# 2 - Validate User Email API Summary
- Endpoint: POST localhost:3005/api/auth/validate

- Request Body:
    verificationToken: string (required)
    email: string (required)
    
- Key Steps:
    - Find the user by email.
    - Check if the provided verificationToken matches the stored token.
    - If valid, update the user as verified (set isVerified to true and clear the token).
    - Respond with a success message.

- Response:
    - 200 OK: "Your account is now active, you can go back to your dashboard."
    - 401 Unauthorized: If the verification token is incorrect.
    - Security: The token must match for the user to be verified.

# 3 - SignIn API Summary
- Endpoint: POST localhost:3005/api/auth/signIn

- Request Body:
    - email: string (required)
    - password: string (required)

- Key Steps:
    - Find the user by email.
    - Check if the user exists.
    - Validate the password against the stored hash.
    - Ensure the user's email is verified.
    - Generate a JWT token and store it in a cookie.
    - Respond with user details.

- Response:
    - 200 OK: User object and authentication token.
    - 404 Not Found: If the user does not exist.
    - 400 Bad Request: If the password is incorrect.
    - 401 Unauthorized: If the email is not verified.
    - Security: Password is securely compared using hashing, and email verification is required before login.

# 4 - Forgot Password API Summary
- Endpoint: POST localhost:3005/api/auth/forgot-password

- Request Body:
    - email: string (required)

- Key Steps:
    - Extract the email from the request body.
    - Use the email to find the user in the database using prismaClient.user.findFirstOrThrow(). If the user is not found, an error is thrown.
    - If the user is found:
    - Generate a secure random passwordToken using crypto.randomBytes(70).toString("hex").
    - Send a password reset email by calling sendResetPassswordEmail() with the user's name, email, and the generated passwordToken.
    - Set the token expiration time to 10 minutes (passwordTokenExpirationDate).
    - Hash the token with createHash() and store the hashed token and expiration date in the database using prismaClient.user.update().
    - Send a success response to the user.

- Response:
    - 200 OK: {"message": "Reset Password link sent!"}
    - 404 Not Found: If the user with the provided email does not exist.

- Security:
    - The password reset token is generated securely using crypto.
    - The token is hashed using createHash() before being stored in the database to ensure that only the hashed value is saved.
    - The token has an expiration time of 10 minutes to prevent long-term reuse.


# 5 - Reset Password API Summary
- Endpoint: POST localhost:3005/api/auth/reset-password

- Request Body:
    - token: string (required) - The password reset token sent to the user's email.
    - email: string (required) - The email address of the user.
    - password: string (required) - The new password that the user wishes to set.

- Key Steps:
    - Extract the token, email, and password from the request body.
    - Check if all required fields are provided; if not, throw a BadRequestException.
    - Retrieve the user from the database using prismaClient.user.findFirstOrThrow(). If the user is not found, an error is thrown.

    - If the user is found:
        - Get the current date and time.
        - Validate the provided token by comparing it with the stored hashed token using createHash().
        - Check if the passwordTokenExpirationDate is still valid (i.e., not expired).

    - If both validations pass, update the user's password, and clear the password token and its expiration date by using prismaClient.user.update().
    - Send a success response to the user indicating that the password has been reset.

- Response:
    - 200 OK: {"message": "Reset password, please log in back again"}
    - 400 Bad Request: If any required values are missing in the request body.
    - 404 Not Found: If the user with the provided email does not exist or if the token is invalid or expired.

- Security:
    - The password reset token is securely hashed using createHash() before being stored in the database to ensure that only the hashed value is saved.
    - The token expiration is checked to prevent the use of expired tokens.
    - The password is hashed with hashSync(password, 10) before storing it in the database to protect user credentials.


# Logout API Summary
- Endpoint: DELETE localhost:3005/api/auth/logout

- Request Body:
    - None (the logout action does not require any request body parameters).

- Key Steps:
    - Set a cookie named "token" with the value "logout" to signify that the user has been logged out.
    - Configure the cookie options to:
        - httpOnly: Set to true to prevent client-side scripts from accessing the cookie, enhancing security against cross-site scripting (XSS) attacks.
        - expires: Set to the current date and time, effectively making the cookie expire immediately and removing any existing session token.
        - Send a success response to the user indicating that they have been logged out.

- Response:
    - 200 OK: {"msg": "user logged out!"} - Indicates successful logout.

- Security:
    - The cookie is marked as httpOnly, which protects it from being accessed through client-side scripts.
    - By expiring the token cookie immediately, it helps ensure that any session associated with the token is effectively terminated. This action minimizes the risk of session hijacking.



### test JWT expiration ###
# from authmiddleware set tokenLifespan to 60 (seconds - 1 minute)
# const isExpiringSoon = payload.iat + tokenLifespan - currentTime < 600; // 10 minutes (600 seconds)
# change the line abouve ... < 60 (seconds)
# from generateToken(), set maxAge to 1 day


<!-- > CONVERSION OF a date without current timeZone (but we're using RO timezone);

---------------------------
----- COUNTDOWN TIMER -----
---------------------------

const dateStr = '2024-10-20T11:55:00.074Z'; // fron my db
const date = new Date(dateStr);

const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Europe/Bucharest' // Specify Romanian time zone
};

const romanianDate = date.toLocaleString('ro-RO', options); // use the countdown timer in the UX
"20.10.2024, 14:55:00"

// Set the future date and time
const futureDate = new Date('2024-10-20T15:10:00+03:00'); // +03:00 for Romania (EEST)

// Function to update the timer
function updateTimer() {
    const now = new Date(); // Get the current date and time
    const timeDifference = futureDate - now; // Calculate the difference

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Format time as D:HH:MM:SS
    const formattedTime = `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
    document.getElementById('timer').innerHTML = formattedTime;

    // If the countdown is finished, display a message
    if (timeDifference < 0) {
        clearInterval(timerInterval); // Stop the timer
        document.getElementById('timer').innerHTML = "Countdown Finished!";
    }
}

// Update the timer every second
const timerInterval = setInterval(updateTimer, 1000);
updateTimer(); // Initial call to display the timer immediately