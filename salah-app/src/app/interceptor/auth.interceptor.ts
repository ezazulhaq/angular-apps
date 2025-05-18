import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../service/auth.service";

// Modern functional interceptor
export const authInterceptor = (authService: AuthService): HttpInterceptorFn => {
    return (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
        // Check if the user is authenticated
        if (authService.isLoggedIn()) {
            // Clone the request and add the auth token
            const token = localStorage.getItem('auth_token');

            if (token) {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        }

        return next(req);
    };
};
