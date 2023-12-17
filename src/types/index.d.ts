// Interface for the authentication context
export interface MyAuthContext {
    signIn: (token:string) => void; // Function to sign in with a token
    signOut: () => void; // Function to sign out
    session?: string | null; // Optional session property that holds a string or null
    isLoading: boolean; // Property to indicate whether the authentication process is in progress
}

// Interface for the login form data
export interface LoginFormType {
    email?: string; // Optional email field in the login form
    password?: string; // Optional password field in the login form
}

// Interface for the application data
export interface AppType {
    title: string; // Title of the application
    type: string; // Type of the application
    price: string; // Price of the application
    start_date: date; // Start date of the application
    end_date: date; // End date of the application
}

// Interface for the genre data
export interface GenreType {
    name: string; // Name of the genre
}