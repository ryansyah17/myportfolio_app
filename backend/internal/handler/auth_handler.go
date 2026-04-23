package handler

import (
	"net/http"

	"portofolio-backend/internal/domain"
	"portofolio-backend/pkg/response"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
    usecase domain.AuthUsecase
}

func NewAuthHandler(usecase domain.AuthUsecase) *AuthHandler {
    return &AuthHandler{usecase: usecase}
}

// Login → POST /api/auth/login
func (h *AuthHandler) Login(c *gin.Context) {
    var req domain.LoginRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        response.Error(c, http.StatusBadRequest, "Data tidak valid: "+err.Error())
        return
    }

    result, err := h.usecase.Login(&req)
    if err != nil {
        response.Error(c, http.StatusUnauthorized, err.Error())
        return
    }

    response.Success(c, http.StatusOK, "Login berhasil", result)
}

// Register → POST /api/auth/register
func (h *AuthHandler) Register(c *gin.Context) {
    var req domain.RegisterRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        response.Error(c, http.StatusBadRequest, "Data tidak valid: "+err.Error())
        return
    }

    result, err := h.usecase.Register(&req)
    if err != nil {
        response.Error(c, http.StatusBadRequest, err.Error())
        return
    }

    response.Success(c, http.StatusCreated, "Akun berhasil dibuat", result)
}

// Me → GET /api/auth/me (butuh token)
func (h *AuthHandler) Me(c *gin.Context) {
    // Data user diambil dari context yang diset middleware
    userID := c.GetUint("user_id")
    email  := c.GetString("email")
    role   := c.GetString("role")

    response.Success(c, http.StatusOK, "Berhasil", gin.H{
        "user_id": userID,
        "email":   email,
        "role":    role,
    })
}