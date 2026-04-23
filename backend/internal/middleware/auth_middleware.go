package middleware

import (
	"net/http"
	"strings"

	"portofolio-backend/pkg/jwt"
	"portofolio-backend/pkg/response"

	"github.com/gin-gonic/gin"
)

// AuthMiddleware — proteksi route, hanya user dengan token valid yang bisa akses
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        // Ambil header Authorization: Bearer <token>
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            response.Error(c, http.StatusUnauthorized, "Token tidak ditemukan")
            c.Abort()
            return
        }

        // Format harus "Bearer <token>"
        parts := strings.SplitN(authHeader, " ", 2)
        if len(parts) != 2 || parts[0] != "Bearer" {
            response.Error(c, http.StatusUnauthorized, "Format token tidak valid")
            c.Abort()
            return
        }

        // Validasi token
        claims, err := jwt.ValidateToken(parts[1])
        if err != nil {
            response.Error(c, http.StatusUnauthorized, "Token tidak valid atau sudah expired")
            c.Abort()
            return
        }

        // Simpan data user ke context agar bisa dipakai handler
        c.Set("user_id", claims.UserID)
        c.Set("email", claims.Email)
        c.Set("role", claims.Role)
        c.Next()
    }
}