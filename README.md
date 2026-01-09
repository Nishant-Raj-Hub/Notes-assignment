# Mission Notes

A clean, modern Notes Management application built with React, TypeScript, Tailwind CSS, Formik & Yup for form validation.

## Project Overview

Mission Notes is a simple yet powerful note-taking application that allows users to create, view, update, and delete notes with a clean, minimalist interface. Built with modern React best practices, it features form validation, loading states, and an intuitive user experience.

## How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

- The app will be available at `http://localhost:5173/`
- The deployed version is available at `https://notes-assignment-teal.vercel.app/`
- PS: I know their is no extra point of deployment    

## Component Breakdown

- **App.tsx**: Root component managing application state (notes array, loading state, empty state)
- **NoteForm.tsx**: Form component with Formik for state management and Yup for validation
- **NoteList.tsx**: Container component that renders all notes
- **NoteItem.tsx**: Individual note card component with delete functionality
- **Loader.tsx**: Loading indicator shown during app initialization (1.5s simulated load)
- **EmptyState.tsx**: Friendly message displayed when no notes exist

## State Explanation

The application uses **React hooks** for state management. Here's how it works:

### States in App Component:

1. **notes** - A list of all your notes. Each note has:

   - `id`: Unique identifier (created from timestamp)
   - `title`: The note's title (required)
   - `description`: The note's content (optional)

2. **isLoading** - Controls the loading screen. Set to `true` initially, then becomes `false` after 1.5 seconds

### How State Changes:

- **Add Note**: When you fill the form and click "Add Note", the new note is added to the `notes` array
- **Delete Note**: Clicking the delete button removes the note from the `notes` array
- **Edit Note**: Clicking edit and saving changes updates the existing note in the `notes` array

### Data Flow (Unidirectional):

```
App Component (holds all state)
├── NoteForm (receives addNote function to create notes)
└── NoteList (receives notes list and delete/edit functions)
    └── NoteItem (receives individual note and functions to edit/delete it)
```

**Note**: All state lives in the `App` component. Child components don't manage their own data—they only receive it from the parent and call functions to update it.

## Assumptions/Limitations

- **No Backend**: All data is stored in React state and will be lost on page refresh
- **No Database**: Notes are temporary and only persist during the current session
- **No Authentication**: This is a frontend-only application without user authentication
- **Client-Side Only**: No server-side processing or API calls
- **Simple Validation**: Uses Yup for basic form validation (required title field, optional description)
- **Features**: Focused on CRUD operations (Create, Read, Update, Delete)
