<p align="center">
  <a href="https://hackcanada.org" target="_blank">
    <img src="https://www.hackcanada.org/favicon.svg" alt="Daedalus Logo" width="120">
  </a>
</p>

<h1 align="center">Daedalus: Your Hackathon Command Center</h1>

<p align="center">
  The ultimate dashboard for orchestrating your Hackathons Canada event. Inspired by the mythical craftsman, Daedalus empowers you to navigate every facet of your hackathon journey, from application to awards.
</p>

<p align="center">
  <a href="https://github.com/Hackathons-Canada/Daedalus/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Hackathons-Canada/Daedalus?style=for-the-badge" alt="License">
  </a>
  <!-- TODO: Add other badges like build status, deployment, etc. -->
</p>

## ✨ Features

Daedalus is packed with features to streamline hackathon management for both organizers and hackers:

- **👨‍💻 Hacker Applications:** A fully-featured application system with custom forms, resume uploads, and detailed submission tracking.
- **📊 Organizer Dashboard:** A central hub for organizers to view analytics, manage applications, and oversee event logistics.
- **🗓️ Dynamic Schedule:** Create and manage a real-time event schedule to keep participants informed.
- **🎟️ RSVP & Check-in:** Effortlessly manage event RSVPs and streamline on-site check-in with a built-in QR code scanner.
- **👤 User Profiles:** Personalized profiles for hackers and organizers.
- **🤫 Auth Ready:** Secure authentication powered by NextAuth.js.
- ...and much more!

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation
- **Deployment:** [Vercel](https://vercel.com/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## 🚀 Getting Started

Follow these instructions to get a local copy of Daedalus up and running.

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (`npm install -g pnpm`)
- A PostgreSQL database. You can set one up locally or use a free provider like [Neon](https://neon.tech/).

### Installation & Setup

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/Hackathons-Canada/Daedalus.git
    cd Daedalus
    ```

2.  **Install Dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set Up Environment Variables:**
    Create a `.env` file in the root of the project. I recommend creating a `.env.example` file in the repository to document the required variables. Here are the variables you'll need:

    ```env
    # Auth.js
    AUTH_SECRET="YOUR_AUTH_SECRET" # openssl rand -base64 32
    AUTH_URL="http://localhost:3000/api/auth"

    # Database (PostgreSQL)
    DATABASE_URL="YOUR_DATABASE_URL"

    # Google OAuth
    GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
    GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

    # AWS for SES (Email) and S3 (Resume Uploads)
    AWS_REGION="YOUR_AWS_REGION"
    AWS_ACCESS_KEY_ID="YOUR_AWS_ACCESS_KEY_ID"
    AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET_ACCESS_KEY"
    AWS_S3_BUCKET_NAME="YOUR_S3_BUCKET_NAME"
    NEXT_PUBLIC_AWS_S3_BUCKET_NAME="YOUR_S3_BUCKET_NAME" # Yes, this is duplicated for public access
    AWS_SES_REGION="YOUR_AWS_SES_REGION"
    AWS_SES_ACCESS_KEY_ID="YOUR_AWS_SES_ACCESS_KEY_ID"
    AWS_SES_SECRET_ACCESS_KEY="YOUR_AWS_SES_SECRET_ACCESS_KEY"
    AWS_SES_VERIFIED_EMAIL="YOUR_VERIFIED_SES_EMAIL"
    AWS_SES_NO_REPLY_EMAIL="no-reply@your-domain.com"

    # Application URL
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```

4.  **Run Database Migrations:**
    Push the database schema to your PostgreSQL instance:

    ```bash
    pnpm db:push
    ```

5.  **Launch the Development Server:**
    ```bash
    pnpm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🤝 Contributing

Contributions are welcome! If you have a feature request, bug report, or want to contribute to the code, please feel free to open an issue or submit a pull request.

I recommend creating a `CONTRIBUTING.md` file to outline the process for contributors.

## 📄 License

This project is licensed under the [GPLv3 License](LICENSE).

## ❤️ Created By Hack Canada

Let's build unforgettable hackathon experiences together! 🚀
