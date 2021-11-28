import decode from 'jwt-decode';
import { User } from "./interfaces";

class AuthService {
  // GET user data
  getProfile(): User {
    return decode(this.getToken());
  }

  // Check if user is logged in
  loggedIn(): boolean {
    // Check if there's a saved token and that it's still valid
    const token: string = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if token is expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken(): any {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken: string): void {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout(): void {
    // Clears user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // Reloads the page and resets the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();