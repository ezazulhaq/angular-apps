import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { environment } from "../../environments/environment";

export const authGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Only rely on service authentication state, not localStorage directly
    if (authService.isAuthenticated()) {
        // Validate session is still valid
        try {
            await authService.validateSession();
            return true;
        } catch {
            // Session invalid, clear state and redirect
            authService.clearAuthState();
        }
    }

    // Redirect to login page with return URL
    return router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }
    });
};