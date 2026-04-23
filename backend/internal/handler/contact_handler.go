package handler

import (
	"net/http"
	"strconv"

	"portofolio-backend/internal/domain"
	"portofolio-backend/pkg/response"

	"github.com/gin-gonic/gin"
)

type ContactHandler struct{ usecase domain.ContactUsecase }

func NewContactHandler(u domain.ContactUsecase) *ContactHandler {
    return &ContactHandler{usecase: u}
}

// GetAll hanya admin
func (h *ContactHandler) GetAll(c *gin.Context) {
    data, err := h.usecase.GetAll()
    if err != nil { response.Error(c, http.StatusInternalServerError, err.Error()); return }
    response.Success(c, http.StatusOK, "Berhasil", data)
}

// Send — public, siapa saja bisa kirim pesan
func (h *ContactHandler) Send(c *gin.Context) {
    var contact domain.Contact
    if err := c.ShouldBindJSON(&contact); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error()); return
    }
    if err := h.usecase.Send(&contact); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error()); return
    }
    response.Success(c, http.StatusCreated, "Pesan berhasil dikirim!", nil)
}

func (h *ContactHandler) MarkAsRead(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    if err := h.usecase.MarkAsRead(uint(id)); err != nil {
        response.Error(c, http.StatusNotFound, err.Error()); return
    }
    response.Success(c, http.StatusOK, "Ditandai sudah dibaca", nil)
}

func (h *ContactHandler) Delete(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    if err := h.usecase.Delete(uint(id)); err != nil {
        response.Error(c, http.StatusNotFound, err.Error()); return
    }
    response.Success(c, http.StatusOK, "Berhasil dihapus", nil)
}