# ZingAnime 🎌

A comprehensive Asian media streaming platform supporting anime, Korean anime, Chinese anime, Japanese dramas, Chinese dramas, and Korean dramas.

![ZingAnime](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2d3748?style=flat-square&logo=prisma)

## 🌟 Features

- **Multi-Content Support**: Browse and stream Anime, K-Anime, C-Anime, J-Drama, C-Drama, and K-Drama
- **Advanced Search**: Filter content by genre, type, and search by title
- **User Authentication**: Secure signup/login with session management
- **Personal Watchlist**: Track your progress and manage your watchlist
- **Flexible Video Player**: Support for YouTube, Vimeo, and custom embed sources
- **Responsive Design**: Beautiful purple-themed UI that works on all devices
- **Dark Mode Support**: Automatically adapts to system preferences
- **Blog & News**: Read the latest anime news and reviews

## 🚀 Tech Stack

- **Frontend**: Next.js 16.3 with React 19
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **Database**: SQLite with Prisma ORM 5.22
- **Authentication**: NextAuth.js 4.24
- **Password Hashing**: bcryptjs

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ColinGamez/ZingAnime.git
   cd ZingAnime/zinganime
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Seed the database with sample data**
   ```bash
   node prisma/seed.js
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Demo Account

- **Email**: demo@zinganime.com
- **Password**: password123

## 📁 Project Structure

```
zinganime/
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── seed.js             # Database seed script
│   └── migrations/         # Database migrations
├── src/
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── catalog/        # Catalog page
│   │   ├── watchlist/      # Watchlist page
│   │   ├── blog/           # Blog page
│   │   ├── watch/          # Video player page
│   │   ├── login/          # Login page
│   │   ├── signup/         # Signup page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/
│   │   ├── Navigation.tsx  # Navigation component
│   │   ├── VideoPlayer.tsx # Video player component
│   │   └── SessionProvider.tsx # Auth provider
│   ├── lib/
│   │   └── prisma.ts       # Prisma client
│   └── types/
│       └── next-auth.d.ts  # TypeScript types for NextAuth
├── public/                 # Static assets
└── package.json
```

## 🗄️ Database Schema

The application uses the following main models:

- **User**: User accounts with authentication
- **Content**: Anime/drama entries with metadata
- **Genre**: Content categories
- **Episode**: Individual episodes with video sources
- **VideoSource**: Multiple streaming sources per episode
- **Watchlist**: User's personal watchlist
- **BlogPost**: Blog articles and news

## 🔐 Authentication

ZingAnime uses NextAuth.js for authentication with:
- Credentials provider (email/password)
- JWT session strategy
- Secure password hashing with bcryptjs
- Protected API routes

## 🎨 Customization

### Adding New Content Types

Edit `prisma/schema.prisma` and update the Content model type field, then update the corresponding types in the frontend.

### Changing the Theme

Modify the Tailwind CSS configuration in `src/app/globals.css` and component styles.

### Adding Video Sources

Add new video sources in the VideoSource model and update the VideoPlayer component to handle new source types.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables:
   - `DATABASE_URL` (use a production database like PostgreSQL)
   - `NEXTAUTH_SECRET` (generate a secure random string)
   - `NEXTAUTH_URL` (your Vercel domain)
4. Deploy!

### Other Platforms

Ensure you:
- Use a production database (PostgreSQL recommended)
- Set secure environment variables
- Build the project: `npm run build`
- Start the production server: `npm start`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `node prisma/seed.js` - Seed database with sample data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Database by [Prisma](https://www.prisma.io/)
- Authentication by [NextAuth.js](https://next-auth.js.org/)

## 📞 Support

For support, email colingamez@example.com or open an issue in the GitHub repository.

---

Made with ❤️ for Asian media enthusiasts