# Contributing to ZingAnime

Thank you for your interest in contributing to ZingAnime! This document provides guidelines and instructions for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find that the bug is already known. If not, please create a new issue with:

- A clear and descriptive title
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node.js version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- A clear description of the enhancement
- Use cases for the enhancement
- Any alternative solutions you've considered

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation if needed

4. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Ensure all CI checks pass

## 📝 Code Style

- Use TypeScript for type safety
- Follow existing naming conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

## 🧪 Testing

Before submitting a PR, please:

- Test your changes manually
- Run the development server: `npm run dev`
- Check for console errors
- Test on different screen sizes

## 📖 Documentation

If you add new features:

- Update the README.md
- Add comments to complex code
- Update API documentation if needed

## 🚀 Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (copy `.env.example` to `.env.local`)
4. Run database migrations: `npx prisma migrate dev`
5. Seed the database: `node prisma/seed.js`
6. Start the dev server: `npm run dev`

## 🎯 Project Structure

- `src/app/` - Next.js app directory with pages and API routes
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions and configurations
- `prisma/` - Database schema and migrations
- `public/` - Static assets

## 🐛 Common Issues

### Database Issues

If you encounter database issues:
```bash
# Reset the database
npx prisma migrate reset

# Regenerate the Prisma client
npx prisma generate
```

### Dependency Issues

If you have dependency issues:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📧 Questions?

Feel free to open an issue for any questions or suggestions.

## 🌟 Recognition

Contributors will be recognized in the project's contributors list.

Thank you for contributing to ZingAnime! 🎌