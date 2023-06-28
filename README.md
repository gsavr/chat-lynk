# LynkChat

LynkChat is a realtime chat application built with GraphQL Live Queries, Next.js, and NextAuth.js. It provides a seamless and interactive chatting experience while utilizing cutting-edge technologies.

![LynkChat App](https://lynk-chat.vercel.app/)
![preview](/src/images/landing.gif)
![preview](/src/images/chat.gif)

## Features

- Realtime Chat: Engage in conversations with other users in real-time, ensuring quick and dynamic communication.
- NextAuth.js Integration: Benefit from the power of NextAuth.js for secure and hassle-free authentication within LynkChat.
- Next.js Framework: Leveraging the Next.js framework, LynkChat guarantees high performance, scalability, and efficient server-side rendering.
- Apollo Client: Utilize Apollo Client for seamless integration with GraphQL, allowing for efficient data fetching and state management.
- Grafbase: Explore the Grafbase database system, enabling robust data storage and retrieval.
- Server-Sent Events: Experience smooth and reliable server-sent events, ensuring instant updates and notifications.
- GraphQL Live Queries: Leverage GraphQL Live Queries for real-time data synchronization and synchronization across multiple clients.
- Tailwind CSS: Utilize the power of Tailwind CSS for customizable and responsive user interface components, enhancing the overall design and user experience.
- Framer Motion: Enjoy fluid and engaging animations with Framer Motion, adding a touch of interactivity and delight.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/lynkchat.git
   ```

2. Navigate to the project directory:

```
cd lynkchat
```

3. Install the dependencies:

```
npm install
```

4. Configure the necessary environment variables. Refer to the '.env.example' file for reference.
5. Start the development server:

```
npm run dev
```

6. Open your preferred browser and visit http://localhost:3000 to access LynkChat.

## Contribution

Contributions to LynkChat are welcome! If you encounter any issues or have suggestions for improvements, please submit them through the GitHub repository.

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch to your forked repository.
4. Submit a pull request with a detailed description of your changes.

## Contact

If you have any questions, suggestions, or just want to say hello, feel free to reach out at [giorgiosavron@me.com](mailto:giorgiosavron@me.com). Would love to hear from you!

Thank you for using LynkChat! I hope you enjoy the chat experience.

<!--

## Local Development

1. `npm install`
2. Create a [GitHub OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) with your app details for development purposes. Make sure to set `Authorization callback URL` to `http://localhost:3000/api/auth/callback/github`
3. `cp .env.example .env` and add values for `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` from step 2.
4. [Generate a secret value](https://generate-secret.vercel.app) for `NEXTAUTH_SECRET` and add it to `.env`
5. `cp grafbase/.env.example grafbase/.env`
6. Add the same `NEXTAUTH_SECRET` to `grafbase/.env`
7. `npx grafbase dev`
8. `npm run dev`

## Deploy to Production

1. Fork and Push this repo to GitHub
2. [Create an account](https://grafbase.com) with Grafbase
3. Create new project with Grafbase and connect your forked repo
4. Add environment variable `NEXTAUTH_SECRET` during project creation
5. Create a [GitHub OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) with your app details for production purposes. Make sure to set `Authorization callback URL` to `[YOUR_DESIRED_VERCEL_DOMAIN]/api/auth/callback/github`
6. Deploy to Vercel and add `.env` values (`NEXT_PUBLIC_GRAFBASE_API_URL`\*, `NEXTAUTH_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`)

\* `NEXT_PUBLIC_GRAFBASE_URL` is your production API endpoint. You can find this from the **Connect** modal in your [project dashboard](https://grafbase.com/dashboard).
-->
