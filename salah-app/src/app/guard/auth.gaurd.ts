import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { environment } from "../../environments/environment";

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const sbProjectId = environment.supabase.projectId

    const access_token = localStorage.getItem(`sb-${sbProjectId}-auth-token`);
    if (access_token || authService.isLoggedIn()) {
        return true;
    }

    // Redirect to login page with return URL
    return router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }
    });
};